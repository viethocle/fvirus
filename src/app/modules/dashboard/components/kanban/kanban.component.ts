import { AuthService } from './../../../auth/auth.service';
import { Angular2TokenService } from 'angular2-token';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DashboardService } from '../../dashboard.service';
import { Order, StatusOrder } from '../../order';
import { DatePipe } from "@angular/common";
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';
import { takeWhile, tap } from "rxjs/operators";
import { BsmodalService } from "@core/services/bsmodal.service";
import { Observable } from "rxjs/Observable";
import { switchMap } from 'rxjs/operators/switchMap';

@Destroyable
@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"]
})
export class KanbanComponent implements OnInit {
  orders: Order[] = [];
  statusOrder = StatusOrder;
  bagNew = "bag";
  bagInprogres = "bag";
  bagReady = "bag";
  bagDelivered = "bag";

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
    this.setCancelPayment();
    this.setRoleToDrag();
    this.setDropModelDragula();
    this.setLiveUpdate();
  }

  setLiveUpdate() {
    this.dashboardService.orderChange.subscribe(dataOrder => {
      console.log("SUB");
      if (dataOrder.method == "CREATE") {
        this.orders.push(dataOrder.data);
      }
      if (dataOrder.method == "UPDATE") {
        let index = this.orders.findIndex(
          order => order.id === dataOrder.data.id
        );
        _.assign(this.orders[index], dataOrder.data);
        console.log(this.orders);
        this.cdRef.detectChanges();
      }
      if (dataOrder.method == "DELETE") {
        this.orders.filter(order => order.id === dataOrder.data.id);
      }
    });
  }

  setCancelPayment() {
    this.bsmodalService.cancelDrop$
      .pipe(
        takeUntilDestroy(this)
      )
      .subscribe(order => {
        this.orders.push(order);
        $(".card-kanban").filter(function () {
          return $(this).data("id") == order.id;
        }).remove();
      })
  }

  private setRoleToDrag() {
    this.authService.userSignedIn$.subscribe(_ => {
      if (this.authService.isCurrentUserAccountant) {
        this.dragulaService.setOptions("first-bag", {
          accepts: function(el, target, source, sibling) {
            let id_target = target.dataset.id;
            let id_source = source.dataset.id;
            if (
              id_source === StatusOrder.new ||
              id_source == StatusOrder.inprogress
            )
              return false;
            if (
              id_target == StatusOrder.inprogress ||
              id_target == StatusOrder.new
            )
              return false;
            return true;
          }
        });
      }
      if (this.authService.isCurrentUserTechnician) {
        this.dragulaService.setOptions("first-bag", {
          accepts: function(el, target, source, sibling) {
            let id_target = target.dataset.id;
            let id_source = source.dataset.id;
            if (id_source == StatusOrder.delivered) return false;
            if (id_source == StatusOrder.new && id_target == StatusOrder.ready)
              return false;
            if (id_target == StatusOrder.new && id_source == StatusOrder.ready)
              return false;
            if (id_target == StatusOrder.delivered) return false;
            return true;
          }
        });
      }
    });
  }

  setDropModelDragula() {
    this.dragulaService.drop.subscribe(value => {
      this.onDrop(value.slice(1));
    });
  }

  private onDrop(args) {
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
      this.bsmodalService.selectOrderToPayment(order);
    }
  }

  getOrders() {
    this.dashboardService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

}
