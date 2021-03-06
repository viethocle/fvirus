import { DatePipe } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BsmodalService } from "@core/services/bsmodal.service";
import { Angular2TokenService } from 'angular2-token';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { DragulaService } from 'ng2-dragula';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';
import { DashboardService } from '../../dashboard.service';
import { Order, StatusOrder } from '../../order';
import { AuthService } from './../../../auth/auth.service';

@Destroyable
@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"],
  providers: [
    DragulaService
  ]
})
export class KanbanComponent implements OnInit, OnDestroy {
  orders: Order[]    = [];
  statusOrder        = StatusOrder;
  notDragNew         = false;
  notDragInprogress  = false;
  notDragReady       = false;
  notDragDelivered   = false;

  constructor(
    private dragulaService: DragulaService,
    private dashboardService: DashboardService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    private bsmodalService: BsmodalService,
    private authService: AuthService,
    private angular2Token: Angular2TokenService
  ) {
  }

  ngOnInit() {
    this.getOrders();
    this.setOnDragDragula();
    this.setCancelPayment();
    this.setRoleToDrag();
    this.setDropModelDragula();
    this.setLiveUpdate();
  }

  setOnDragDragula() {
    this.dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    this.dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });

    this.dragulaService.dragend.subscribe((value) => {
      this.resetNotDragValue();
    });
  }

  setLiveUpdate() {
    this.dashboardService.orderChange.pipe(
        takeUntilDestroy(this)
      ).subscribe(dataOrder => {
      if (dataOrder.method == "CREATE") {
        this.orders.push(dataOrder.data);
      }
      if (dataOrder.method == "UPDATE") {
        let index = this.orders.findIndex(
          order => order.id === dataOrder.data.id
        );
        _.assign(this.orders[index], dataOrder.data);
      }
      if (dataOrder.method == "DELETE") {
        this.orders.filter(order => order.id === dataOrder.data.id);
        $(".card-kanban").filter(function () {
          return $(this).data("id") == dataOrder.data.id;
        }).remove();
      }
    });
  }

  setCancelPayment() {
    this.bsmodalService.cancelDrop$
      .pipe(
        takeUntilDestroy(this)
      )
      .subscribe(order => {
        this.orders.filter(o => o.id === order.id);
        this.orders.push(order);
        $(".card-kanban").filter(function () {
          return $(this).data("id") == order.id;
        }).remove();
      })
  }

  private setRoleToDrag() {
    if (this.authService.isCurrentUserAccountant) {
      this.dragulaService.setOptions('first-bag', {
        accepts: function(el, target, source, sibling) {
          let id_target = target.dataset.id;
          let id_source = source.dataset.id;
          if (id_source === StatusOrder.new || id_source == StatusOrder.inprogress) return false;
          if (id_target == StatusOrder.inprogress || id_target == StatusOrder.new) return false;
          return true;
        }
      })
    }
    if (this.authService.isCurrentUserTechnician) {
      this.dragulaService.setOptions('first-bag', {
        accepts: function (el, target, source, sibling) {
          let id_target = target.dataset.id;
          let id_source = source.dataset.id;
          if (id_source == StatusOrder.delivered) return false;
          if (id_source == StatusOrder.new && id_target == StatusOrder.ready) return false;
          if (id_target == StatusOrder.new && id_source == StatusOrder.ready) return false;
          if (id_target == StatusOrder.delivered) return false;
          return true;
        }
      })
    }
  }

  setDropModelDragula() {
    this.dragulaService.drop.subscribe(value => {
      this.onDrop(value.slice(1));
    });
  }

  private onDrop(args) {
    this.resetNotDragValue();
    let [e, el] = args;
    let order_id = e.dataset.id;
    let status_to_change = el.dataset.id;
    let order = this.orders.find(t => t.id === order_id);
    if (status_to_change != this.statusOrder.delivered) {
      // call api to change status order
      this.dashboardService
        .updateStatusOrder(order_id, status_to_change)
        .subscribe((order: Order) => {
          _.assign(this.orders.find(t => t.id === order.id), order);
        });
    } else {
      if (order.status != this.statusOrder.delivered) {
        this.bsmodalService.selectOrderToPayment(order);
      }
    }
  }

  private onDrag(args) {
    let [el, source] = args;
    let current_status = source.dataset.id;
    if (this.authService.isCurrentUserTechnician) {
      this.notDragDelivered = true;
    }
    if (this.authService.isCurrentUserAccountant) {
      if (current_status === StatusOrder.new) {
        this.notDragDelivered = true;
        this.notDragInprogress = true;
        this.notDragReady = true;
      }
      if (current_status === StatusOrder.ready || current_status === StatusOrder.delivered) {
        this.notDragNew = true;
        this.notDragInprogress = true;
      }
      if (current_status === StatusOrder.inprogress) {
        this.notDragNew = true;
        this.notDragReady = true;
        this.notDragDelivered = true;
      }
    }
  }

  private onOut(args) {
    // this.resetNotDragValue();
  }

  resetNotDragValue() {
    this.notDragNew         = false;
    this.notDragInprogress  = false;
    this.notDragReady       = false;
    this.notDragDelivered   = false;
  }

  getOrders() {
    let params = {
      show_all: "false", 
      pagination: {
        page: 1, 
        per_page: 10000
      }
    }
    this.dashboardService.getOrderFilter(params).subscribe(ordersPaginate => {
      this.orders = ordersPaginate.orders;
    });
  }

  ngOnDestroy() {
    if (this.dragulaService.find('first-bag') !== undefined)
      this.dragulaService.destroy('first-bag');
  }
}
