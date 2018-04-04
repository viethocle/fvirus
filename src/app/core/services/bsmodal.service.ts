import { User } from './../../modules/user.model';
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
  cancelDrop$ = new Subject<Order>();
  userDelete$ = new Subject<User>();

  constructor() { }
  // order
  selectOrderToDelete(order: Order) {
    this.orderDelete$.next(order);
  }

  selectOrderToEdit(order: Order) {
    this.orderEdit$.next(order);
  }

  selectOrderToPayment(order: Order) {
    this.paymentOrder$.next(order);
  }

  cancelDrop(order) {
    this.cancelDrop$.next(order);
  }

  // user
  selectUserToDelete(user: User) {
    this.userDelete$.next(user);
  }
}
