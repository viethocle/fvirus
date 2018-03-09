import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DashboardService } from '../../dashboard.service';
import { Order, StatusOrder } from '../../order';
import { DatePipe } from "@angular/common";
import * as _ from 'lodash';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { takeWhile } from "rxjs/operators";
@Destroyable
@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"]
})
export class KanbanComponent implements OnInit {
  orders: Order[] = [];
  statusOrder = StatusOrder;

  constructor(
    private dragulaService: DragulaService,
    private dashboardService: DashboardService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getOrders();
    this.setDropModelDragula();
    this.dashboardService.orderChange
      .subscribe(dataOrder => {
        console.log("SUB");
        if (dataOrder.method == 'CREATE') {
          this.orders.push(dataOrder.data);
        }
      
        if (dataOrder.method == "UPDATE") {
          
          let index = this.orders.findIndex(order => order.id === dataOrder.data.id);
          _.assign(this.orders[index], dataOrder.data);
          console.log(this.orders);
          this.cdRef.detectChanges();
        }
          
        if (dataOrder.method == 'DELETE') {
          this.orders.filter(order => order.id === dataOrder.data.id);
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
    
    // call api to change status order 
    this.dashboardService.updateStatusOrder(order_id, status_to_change)
        .subscribe((order: Order) => {
          _.assign(this.orders.find(t => t.id === order.id), order);
        });
  }

  getOrders() {
    this.dashboardService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  innerHtml(order: Order) {
    let content = `
    <div>
        <div>
          <h5>
            ${order.description}
          </h5>
          <h6>
            Deadline: ${this.datePipe.transform(order.due_date, "dd-MM-yyyy")}
          </h6>
        </div>
    </div>`;
    return content;
  }
}
