import 'rxjs/add/operator/map';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer } from '@modules/customer/customer.model';
import { CustomerService } from '@modules/customer/customer.service';
import { Group } from '@modules/customer/group.model';
import { ToastrService } from '@shared/toastr.service';
import * as _ from 'lodash';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';

import { FlyOut } from './../../../dashboard/flyInOut.animate';
import { GroupsService } from './../../groups.service';
import { AuthService } from '@modules/auth/auth.service';

@Destroyable
@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
  animations: [FlyOut]
})
export class CustomerComponent implements OnInit {
  @ViewChild("modalConfirm") modalConfirm: BsModalComponent;

  customers: Customer[];
  groups$: Observable<Group[]>;
  cus: Customer = new Customer();
  customerSelected: Customer;
  keyUpSearch = new Subject<string>();
  customerToEdit: Customer;

  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private groupService: GroupsService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getPage(1);
    this.initEvent();
    this.groups$ = this.groupService.getGroups();
  }

  initEvent() {
    this.route.queryParams
      .pipe(
        takeUntilDestroy(this),
        tap(params => {
          this.configPagination.currentPage = params.page;
          this.configPagination.itemsPerPage = params.per_page;
        }),
        switchMap(params => this.customerService.getCustomersWithPage(params))
      )
      .subscribe((res: any) => {
        this.customers = res.customers;
        this.configPagination.totalItems = res.total;
      });

    const inputSearch = document.getElementById("search-customer");
    const inputSearch$ = fromEvent(inputSearch, "keyup")
      .pipe(map((i: any) => i.currentTarget.value), debounceTime(500))
      .subscribe(value =>
        this.changeQueryParam([
          { name_query: "page", value: 1 },
          { name_query: "search_query", value: value }
        ])
      );
  }

  navigateUrl(page, per_page, search_text) {
    this.router.navigate(["/customers/list"], {
      queryParams: { page: page, per_page: per_page, search: search_text }
    });
  }

  showGroups(customer: Customer, truncate: boolean) {
    let content = customer.groups.map(g => g.title).join(", ");
    if (truncate) return _.truncate(content);
    return content;
  }

  onChangeFilter(selected_groups) {
    selected_groups = selected_groups.map(s => s.id);
    this.changeQueryParam([
      { name_query: "with_any_group_ids", value: selected_groups },
      { name_query: "page", value: 1 }
    ]);
  }

  changeQueryParam(query_params: [{ name_query: string; value: any }]) {
    const queryParams: Params = Object.assign(
      {},
      this.route.snapshot.queryParams
    );
    query_params.forEach(query => {
      queryParams[query.name_query] = query.value;
    });
    this.router.navigate(["."], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }

  onChangeCount($event) {
    this.changeQueryParam([
      { name_query: "page", value: 1 },
      { name_query: "per_page", value: $event.target.value }
    ]);
  }

  getPage(page: number) {
    this.changeQueryParam([{ name_query: "page", value: page }]);
  }

  openModalDetail(customer: Customer) {
    if (!this.authService.isCurrentUserTechnician) {
      this.router.navigate([`/customers/${customer.id}`]);
    }
  }

  openModalEdit(customer: Customer) {
    this.customerToEdit = customer;
  }

  openModalDelete(customer: Customer) {
    this.customerSelected = customer;
    this.modalConfirm.open();
  }

  deleteCustomer() {
    this.modalConfirm.close();
    this.sendRequestDeleteCustomer(this.customerSelected);
  }

  sendRequestDeleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer).subscribe(res => {
      this.customers = _.reject(this.customers, ["id", customer.id]);
    });
  }

  handleUpdateCustomer(customer) {
    _.assign(this.customers.find(cus => cus.id === customer.id), customer);
    this.customerToEdit = null;
  }

  handleAddNewCustomer(customer: Customer) {
    this.customers.unshift(customer);
  }
}
