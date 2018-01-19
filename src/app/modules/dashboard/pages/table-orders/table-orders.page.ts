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
  public configPagination = {
    id: "server",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getPage(page: number) {
    
  }

  private getOrders() {
    this.dashboardService.getOrdersWithPagination(1)
        .subscribe(res => {
          this.configPagination.totalItems = res.total;
          this.orders = res.orders;
        })
  }

  handlerAddNewOrder(order) {
    console.log(order);
  }

}
