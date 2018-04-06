import { Order } from './../../../dashboard/order';
import { BsModalComponent } from 'ng2-bs3-modal';
import { HomeService } from './../../home.service';
import { CustomerDebt } from './../../customer-debt.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Component({
  selector: 'app-customer-debt',
  templateUrl: './customer-debt.component.html',
  styleUrls: ['./customer-debt.component.css'],
  providers: [HomeService]
})
export class CustomerDebtComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  keyUpSearch = new Subject<string>();

  currentPage = 1;
  currentSearch = "";
  showCount = 10;

  customerDebt: CustomerDebt[];
  orders: Order[];
  loading: boolean;

  public configPagination = {
    id: "server1",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 10
  };
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getPage(1);

     const subscriptionSearch = this.keyUpSearch
      .do(search => (this.currentSearch = search))
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(search => this.homeService.getCustomersDebtWithPage(1,this.showCount, search))
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
      .getCustomersDebtWithPage(this.currentPage, this.showCount, this.currentSearch)
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

  openCustomerDebt(customer: any) {
    this.modal.open();
    this.homeService.getOrderdebt(customer.id)
        .map(res => res.orders)
        .subscribe(res => {
          this.orders = res;
          console.log(this.orders);
        } );
  }
}
