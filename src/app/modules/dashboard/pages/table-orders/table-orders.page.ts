import { Component, OnInit } from '@angular/core';
import { Order } from '../../order';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard-table-orders',
  templateUrl: './table-orders.page.html',
  styleUrls: ['./table-orders.page.css']
})
export class TableOrdersPage implements OnInit {

  orders: Order[];

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders() {
    this.dashboardService.getOrders()
        .subscribe(orders => this.orders = orders);
  }

  handlerAddNewOrder(order) {
    console.log(order);
  }

}
