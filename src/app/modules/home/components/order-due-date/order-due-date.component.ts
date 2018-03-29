import { DueDate } from './../../order-due-date.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HomeService } from '@modules/home/home.service';


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

  orders: DueDate[];
  loading: boolean;

  public configPagination = {
    id: "server",
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
      .switchMap(search => this.homeService.getOrderDueDateWithPage(1, this.showCount, search))
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
    this.loading = true;
    this.homeService
      .getOrderDueDateWithPage(page, this.showCount, this.currentSearch)
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = page;
        this.loading = false;
      })
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
        console.log(this.orders);
      });
  }

    onChangeCount($event) {
    this.homeService
      .getOrderDueDateWithPage(this.currentPage, this.showCount, this.currentSearch)
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
