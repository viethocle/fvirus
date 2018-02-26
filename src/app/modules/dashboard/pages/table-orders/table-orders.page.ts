import { BsmodalService } from './../../bsmodal.service';
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

  constructor(
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService) {}

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

  truncateDescription(des: string) {
    return _.truncate(des, {'length': 24});
  }

  returnHtmlDeleteOrder() {
    return `<button class="btn btn-xs btn-danger" tooltip="{{ 'tooltip.delete' | translate }}">
                <i class="ace-icon fa fa-trash-o bigger-120"></i>
              </button>`
  }

  openModalDelete(order: Order) {
    this.bsmodalService.selectOrder(order);
  }

  ngOnDestroy() {
    this.subscriptionGetOrders.unsubscribe();
  }
}
