import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DashboardService } from '../../dashboard.service';
import { Order } from '../../order';

@Component({
  selector: "app-kanban",
  templateUrl: "./kanban.component.html",
  styleUrls: ["./kanban.component.css"]
})
export class KanbanComponent implements OnInit {
  orders: Order[];

  @ViewChild("bagNew") bagNew: ElementRef;
  @ViewChild("bagInprogress") bagInprogress: ElementRef;
  @ViewChild("bagReady") bagReady: ElementRef;
  @ViewChild("bagClosed") bagClosed: ElementRef;

  constructor(
    private dragulaService: DragulaService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.getOrders();
    this.setDropModelDragula();
    this.dashboardService.orderChange.subscribe(dataOrder => {
      if (dataOrder != undefined) {
        this.orders.push(dataOrder.data);
        console.log(dataOrder);
      }
    });
  }

  setDropModelDragula() {
    this.dragulaService.drop.subscribe(value => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
  }

  private onDrop(args) {
    let [e, el] = args;
    console.log(e.dataset.id);
    console.log(el.dataset.id);
  }

  getOrders() {
    this.dashboardService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
