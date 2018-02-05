import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../order';
import { DashboardService } from '../../dashboard.service';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: "app-dashboard-table-orders",
  templateUrl: "./table-orders.page.html",
  styleUrls: ["./table-orders.page.css"]
})
export class TableOrdersPage implements OnInit, OnDestroy {
  orders: Order[];
  loading: boolean;
  private subscriptionGetOrders: ISubscription;
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

  getOrdersMock() {
    this.dashboardService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  handlerAddNewOrder(order) {
    this.orders.unshift(order);
  }

  ngOnDestroy() {
    // this.subscriptionGetOrders.unsubscribe();
  }
}
