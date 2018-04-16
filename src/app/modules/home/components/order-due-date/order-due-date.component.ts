import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Order } from '@modules/dashboard/order';
import { HomeService } from '@modules/home/home.service';
import * as moment from 'moment';
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-order-due-date',
  templateUrl: './order-due-date.component.html',
  styleUrls: ['./order-due-date.component.css']
})
export class OrderDueDateComponent implements OnInit {
    keyUpSearch = new Subject<string>();

  currentPage = 1;
  currentSearch = "";
  showCount = 10;

  orders: Order[];
  loading: boolean;

  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 10
  };

  params = {
    pagination: {
      page: 1,
      per_page: 10, 
    },
    show_all: false, 
    status: "('new','ready','inprogress')",
    due_date_lte: moment(),
    search_query: "",
    sorted_by: "due_date_asc"
  }

  constructor(
    private homeService: HomeService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getPage(1);

     const subscriptionSearch = this.keyUpSearch
      .do(search => {
        this.currentSearch = search;
        Object.assign(this.params, { pagination: { page: 1, per_page: this.showCount }, search_query: this.currentSearch });
      })
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(search => this.dashboardService.getOrderFilter(this.params))
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = 1;
        this.loading = false;
      })
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
      });
  }


  getPage(page: number) {
    this.currentPage = page;
    Object.assign(this.params, { pagination: { page: this.currentPage, per_page: this.showCount }});
    this.dashboardService
      .getOrderFilter(this.params)
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = page;
        this.loading = false;
      })
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
      });
  }

    onChangeCount($event) {
      Object.assign(this.params, { pagination: { page: this.currentPage, per_page: this.showCount } });
      this.dashboardService
        .getOrderFilter(this.params)
        .do(res => {
          this.configPagination.totalItems = res.total;
          this.configPagination.currentPage = 1;
          this.loading = false;
        })
        .map(res => res.orders)
        .subscribe(res => {
          this.orders = res;
          this.configPagination.itemsPerPage = this.showCount;
        });
    }


}
