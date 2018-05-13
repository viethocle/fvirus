import {CustomerDebt} from '../../customer-debt.model';
import { Component, OnInit, ViewChild, Output, EventEmitter } from "@angular/core";
import { BsmodalService } from "@core/services/bsmodal.service";
import { BsModalComponent } from "ng2-bs3-modal";

import { AuthService } from "./../../../auth/auth.service";
import { Destroyable, takeUntilDestroy } from "take-until-destroy";
import { Customer } from "@modules/customer/customer.model";
import { Order } from "../../../dashboard/order";
import { FormControl } from "@angular/forms";
import { HomeService } from '@modules/home/home.service';

@Destroyable
@Component({
  selector: "app-pay-debt",
  templateUrl: "./pay-debt.component.html",
  styleUrls: ["./pay-debt.component.css"],
  providers: [HomeService]
})
export class PayDebtComponent implements OnInit {
  @ViewChild("modalPayDebt") modalPayDebt: BsModalComponent;
  @Output() payOrderOutput = new EventEmitter<CustomerDebt>();
  customer: CustomerDebt;
  orders: Order[];
  payment = new FormControl("");
  constructor(
    private bsmodalService: BsmodalService,
    public authService: AuthService,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    this.bsmodalService.customerDebt$
      .pipe(takeUntilDestroy(this))
      .subscribe(customer => {
        if (customer) {
          this.customer = customer;
          this.modalPayDebt.open();
          this.getOrdersDebt(this.customer);
        }
      });
  }

  getOrdersDebt(customer: any) {
    this.payment.reset();
    this.homeService
      .getOrderdebt(this.customer.id)
      .map(res => res.orders)
      .subscribe(res => {
        this.orders = res;
        console.log(this.orders);
      });
  }

  payCustomerDebt(payment) {
    this.homeService
      .sendPaymentDebt(this.customer.id, payment)
      .subscribe(customer => {
        this.payOrderOutput.emit(customer);
        // _.assign(this.customerDebt.find(t => t.id === customer.id), customer);
        this.modalPayDebt.close();
      });
  }
}
