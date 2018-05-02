import { ActivatedRoute, Params, Router } from '@angular/router';
import { IOrdersPaginate } from './../../dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../../order';
import { DashboardService } from '../../dashboard.service';
import { Subscription } from "rxjs/Subscription";
import * as _ from 'lodash';
import { FlyOut } from '../../flyInOut.animate';
import { BsmodalService } from '@core/services/bsmodal.service';
import { AuthService } from "./../../../auth/auth.service";
import { JsonPipe } from '@angular/common';
@Component({
  selector: "app-dashboard-table-orders",
  templateUrl: "./table-orders.page.html",
  styleUrls: ["./table-orders.page.css"],
  animations: [FlyOut]
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
    private bsmodalService: BsmodalService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  }

  getPage(page: number) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['page'] = page;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })
  }

  handlerAddNewOrder(order) {
    this.orders.unshift(order);
    this.configPagination.totalItems += 1;
  }

  showListOrder(res: IOrdersPaginate) {
    this.orders = res.orders;
    this.configPagination.totalItems = res.total;
    this.configPagination.currentPage = res.page;
    this.configPagination.itemsPerPage = res.per_page;
  }

  truncateDescription(des: string) {
    return _.truncate(des, { length: 24 });
  }

  returnHtmlDeleteOrder() {
    return `<button class="btn btn-xs btn-danger" tooltip="{{ 'tooltip.delete' | translate }}">
                <i class="ace-icon fa fa-trash-o bigger-120"></i>
              </button>`;
  }

  openEditModal(order: Order) {
    this.bsmodalService.selectOrderToEdit(order);
  }

  openModalDelete(order: Order) {
    this.bsmodalService.selectOrderToDelete(order);
  }

  handleDeleteOrder(order: Order) {
    _.remove(this.orders, o => o.id === order.id);
    this.configPagination.totalItems -= 1;
  }

  handleUpdateOrder(order) {
    console.log("UPDATE " + order);
    _.assign(this.orders.find(t => t.id === order.id), order);
  }

  ngOnDestroy() {
  }
}
