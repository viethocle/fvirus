import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsmodalService } from '@core/services/bsmodal.service';
import { Customer } from '@modules/customer/customer.model';
import { CustomerService } from '@modules/customer/customer.service';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Order } from '@modules/dashboard/order';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Subject } from 'rxjs/Subject';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';
import { Observable } from 'rxjs/Observable';
import { Group } from '@modules/customer/group.model';
import { AuthService } from '@modules/auth/auth.service';
import { CustomerDebt } from '@modules/home/customer-debt.model';

@Destroyable
@Component({
  selector: "app-detail-customer",
  templateUrl: "./detail-customer.component.html",
  styleUrls: ["./detail-customer.component.css"]
})
export class DetailCustomerComponent implements OnInit, OnChanges {
  customer_id: number;
  orders: Order[];
  customer: CustomerDebt;
  loading: boolean;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  customer$: Observable<CustomerDebt>;
  isCustomerDebt = false;
  totalDebt = 0;
  param = {
    pagination: {
      page: 1,
      per_page: 1000
    },
    show_all: true,
    sorted_by: "due_date_asc",
    customer_id: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private customerService: CustomerService,
    private bsmodalService: BsmodalService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.customer_id = params["id"];
      this.param.customer_id = this.customer_id;
      this.getCustomer(this.customer_id);
      this.getPage();
    });
  }
  ngOnChanges(changes: SimpleChanges) {}

  getCustomer(id: number) {
    this.customer$ = this.customerService.getCustomer(id);
    this.customerService
      .getCustomer(id)
      .pipe(takeUntilDestroy(this))
      .map(res => res)
      .subscribe(res => {
        this.customer = res;
      });
  }
  getPage() {
    Object.assign(this.param);
    this.dashboardService
      .getOrderFilter(this.param)
      .pipe(takeUntilDestroy(this))
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
        this.orders.map(order => {
          if ((order.price > order.paid_amount) && ( order.status === "delivered")) {
            this.isCustomerDebt = true;
            this.totalDebt += order.price - order.paid_amount;
          }
        });
        this.dtTrigger.next();
      });
  }

  openDetailModal(order: Order) {
    this.bsmodalService.selectOrderToView(order);
  }

  openCustomerDebtModal(customer: CustomerDebt) {
    customer.total_debt = this.totalDebt;
    this.bsmodalService.selectCustomerPayDebt(customer);
  }

  handlePayOrder(customer: CustomerDebt) {
    this.totalDebt = customer.total_debt;
    this.dashboardService
      .getOrderFilter(this.param)
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
      });
  }

  showGroups(customer: Customer) {
    return customer.groups.length > 0
      ? customer.groups.map(g => g.title).join(", ")
      : "";
  }
}
