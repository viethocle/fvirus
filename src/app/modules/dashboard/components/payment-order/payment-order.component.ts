import { Order } from '@modules/dashboard/order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsmodalService } from '@core/services/bsmodal.service';
import { tap } from 'rxjs/operators';
import { takeUntilDestroy } from 'take-until-destroy';
import { BsModalComponent } from 'ng2-bs3-modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: ['./payment-order.component.css']
})
export class PaymentOrderComponent implements OnInit {
  @ViewChild("modalPayment") modalPayment: BsModalComponent;
  order: Order;
  formPaymentOrder: FormGroup;
  constructor(
    private bsmodalService: BsmodalService,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
  ) {
   }

  ngOnInit() {
    this.buildForm();
    this.bsmodalService.paymentOrder$
        .pipe(
          tap(console.log),
        )
        .subscribe(order => {
          if (order) {
            this.order = order;
            tap(console.log),
            this.modalPayment.open();
            this.setFormValue();
          }
        });
  }
  payOrder() {
    this.dashboardService.PaymentOrder(this.order.id, this.formPaymentOrder.value)
      .pipe(
        tap(console.log)
      )
      .subscribe(order =>
        this.dashboardService.updateStatusOrder(this.order.id, "delivered")
            .subscribe((order1: Order) => {
        })
    );
    this.modalPayment.close();
  }
  private buildForm() {
    this.formPaymentOrder = this.formBuilder.group({
      payAmount: [""]
    });
  }

  private setFormValue() {
    this.formPaymentOrder.patchValue({
      payAmount: this.order.price,
    });
  }
}
