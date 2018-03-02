import { BsmodalService } from './../../bsmodal.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Order } from "@modules/dashboard/order";
import { tap } from "rxjs/operators";
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { skip } from "rxjs/operator/skip";
@Destroyable
@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {

  @ViewChild('modalDelete') modalDelete: BsModalComponent;
  @Output() deleteOrderOutput = new EventEmitter<Order>();
  order: Order;

  constructor(
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService
  ) { }

  ngOnInit(
  ) {
    this.bsmodalService.orderDelete$  
        .pipe(
          takeUntilDestroy(this),
          tap(console.log)
        )
        .subscribe(order => { 
          if (order) {
            this.order = order;
            this.openModalDelete()
          }
        });
  }

  openModalDelete() {
    this.modalDelete.open();
  }

  deleteOrder() {
    this.dashboardService.deleteOrder(this.order.id)
        .subscribe(_ => this.deleteOrderOutput.emit(this.order));
  }

}
