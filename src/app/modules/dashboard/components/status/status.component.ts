import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Destroyable, takeUntilDestroy } from "take-until-destroy";
import { Order, StatusOrder } from "../../order";
import { DashboardService } from "../../dashboard.service";
import { AuthService } from "./../../../auth/auth.service";

@Destroyable
@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.css"]
})
export class StatusComponent implements OnInit {
  @Input() order: Order;
  @Output() statusOrderOutput = new EventEmitter<Order>();
  statusOrder = StatusOrder;

  constructor(
    private dashboardService: DashboardService,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  updateStatus(order: Order, status_to_change) {
    const order_id = order.id;
    // call api to change status order
    this.dashboardService
      .updateStatusOrder(order_id, status_to_change)
      .pipe(takeUntilDestroy(this))
      .subscribe(ord => this.statusOrderOutput.emit(ord));
    //   .subscribe((or: Order) => {
    //     _.assign(this.orders.find(t => t.id === order.id), order);
    //   });
  }
}
