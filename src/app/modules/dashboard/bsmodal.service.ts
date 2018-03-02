import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '@modules/dashboard/order';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class BsmodalService {

  orderDelete$ = new ReplaySubject<Order>(1);
  orderEdit$ = new ReplaySubject<Order>(1);

  constructor() { }

  selectOrderToDelete(order: Order) {
    this.orderDelete$.next(order);
  }

  selectOrderToEdit(order: Order) {
    this.orderEdit$.next(order);
  }


}
