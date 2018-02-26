import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../order';
import { DashboardService } from '../../dashboard.service';
import { Subscription } from "rxjs/Subscription";
import * as _ from 'lodash';

@Component({
  selector: "app-dashboard-table-orders",
  templateUrl: "./table-orders.page.html",
  styleUrls: ["./table-orders.page.css"]
})
export class TableOrdersPage implements OnInit, OnDestroy {
  orders: Order[];
  loading: boolean;
  private subscriptionGetOrders: Subscription;
  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.subscriptionGetOrders = this.dashboardService
      .getOrdersWithPagination(page)
      .do(res => {
        this.configPagination.totalItems = res.total;
        this.configPagination.currentPage = page;
      })
      .subscribe(res => {
        this.orders = res.orders;
      });
  }

  handlerAddNewOrder(order) {
    this.orders.unshift(order);
  }

  ngOnDestroy() {
    // this.subscriptionGetOrders.unsubscribe();
  }
}
