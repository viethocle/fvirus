import { BsmodalService } from './../../bsmodal.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Order } from "@modules/dashboard/order";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {

  @ViewChild('modalDelete') modalDelete: BsModalComponent;
  order: Order;

  constructor(
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService
  ) { }

  ngOnInit(
  ) {
    this.bsmodalService.order$  
        .pipe(
          tap(order => this.order = order)
        )
        .subscribe(_ => this.openModalDelete());
  }

  openModalDelete() {
    this.modalDelete.open();
  }

  deleteOrder() {
    console.log(this.order);
  }

}
