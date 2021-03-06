import { Order } from './../../../dashboard/order';
import { BsModalComponent } from 'ng2-bs3-modal';
import { HomeService } from './../../home.service';
import { CustomerDebt } from './../../customer-debt.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FormControl } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as _ from 'lodash';
import { BsmodalService } from '@core/services/bsmodal.service';
import { Customer } from '../../../customer/customer.model';



@Component({
  selector: "app-customer-debt",
  templateUrl: "./customer-debt.component.html",
  styleUrls: ["./customer-debt.component.css"],
  providers: [HomeService]
})
export class CustomerDebtComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  keyUpSearch = new Subject<string>();

  currentCustomer: CustomerDebt;
  currentPage = 1;
  currentSearch = "";
  showCount = 10;

  customerDebt: CustomerDebt[];
  orders: Order[];
  loading: boolean;
  payment = new FormControl("");

  priceMask = Object.freeze({
    mask: createNumberMask({
      allowDecimal: false,
      integerLimit: 10,
      prefix: "",
      thousandsSeparatorSymbol: ","
    })
  });

  public configPagination = {
    id: "server1",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 10
  };
  constructor(
    private homeService: HomeService,
    private bsmodalService: BsmodalService
  ) {}

  ngOnInit() {
    this.getPage(1);

    const subscriptionSearch = this.keyUpSearch
      .do(search => (this.currentSearch = search))
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(search =>
        this.homeService.getCustomersDebtWithPage(1, this.showCount, search)
      )
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = 1;
        this.loading = false;
      })
      .map(res => res.customers)
      .subscribe(res => {
        this.customerDebt = res;
      });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.loading = true;
    this.homeService
      .getCustomersDebtWithPage(page, this.showCount, this.currentSearch)
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = page;
        this.loading = false;
      })
      .map(res => res.customers)
      .subscribe(res => {
        this.customerDebt = res;
      });
  }

  onChangeCount($event) {
    this.homeService
      .getCustomersDebtWithPage(
        this.currentPage,
        this.showCount,
        this.currentSearch
      )
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = 1;
        this.loading = false;
      })
      .map(res => res.customers)
      .subscribe(res => {
        this.customerDebt = res;
        this.configPagination.itemsPerPage = this.showCount;
      });
  }

  openCustomerDebtModal(customer: CustomerDebt) {
    this.bsmodalService.selectCustomerPayDebt(customer);
  }

  handlePayOrder(customer: CustomerDebt) {
    _.assign(this.customerDebt.find(t => t.id === customer.id), customer);
    // this.customerDebt = _.reject(this.customerDebt, ["total_debt", 0]);
  }
}
