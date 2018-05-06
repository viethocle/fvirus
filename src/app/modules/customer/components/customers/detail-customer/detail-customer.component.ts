import { FormCustomerComponent } from './../form-customer/form-customer.component';
import { Subject } from 'rxjs/Subject';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange, EventEmitter, Output } from '@angular/core';
import { Customer } from '@modules/customer/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { CustomerService } from "@modules/customer/customer.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Order } from '@modules/dashboard/order';
@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit, OnChanges {
  @ViewChild("modalDetail") modalDetail: BsModalComponent;
  customer_id: number;
  orders: Order[];
  customer: Customer;
  loading: boolean;

  param = {
    pagination: {
      page: 1,
      per_page: 1000,
    },
    show_all: true,
    sorted_by: "due_date_asc",
    customer_id: 0
    };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.customer_id = params['id'];
        this.param.customer_id = this.customer_id;
      });
    this.getCustomer(this.customer_id);
    this.getPage();
  }
  ngOnChanges(changes: SimpleChanges) {
  }
  getCustomer(id: number) {
    this.customerService.getCustomer(id)
        .map((res: any) => res.customer)
        .subscribe(res => {
          this.customer = res;
        });
  }
  getPage() {
    Object.assign(this.param);
    this.dashboardService
      .getOrderFilter(this.param)
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
      });
  }
}
