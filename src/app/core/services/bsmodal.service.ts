import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '@modules/dashboard/order';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class BsmodalService {

  orderDelete$ = new Subject<Order>();
  orderEdit$ = new Subject<Order>();
  paymentOrder$ = new Subject<Order>();

  constructor() { }

  selectOrderToDelete(order: Order) {
    this.orderDelete$.next(order);
  }

  selectOrderToEdit(order: Order) {
    this.orderEdit$.next(order);
  }

  selectOrderToPayment(order: Order) {
    this.paymentOrder$.next(order);
  }

}
