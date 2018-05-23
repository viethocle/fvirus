import { User } from './../../modules/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '@modules/dashboard/order';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { Group } from "@modules/customer/group.model";
import { Customer } from '@modules/customer/customer.model';
import { CustomerDebt } from '@modules/home/customer-debt.model';

@Injectable()
export class BsmodalService {
  orderDetail$ = new Subject<Order>();
  orderDelete$ = new Subject<Order>();
  orderEdit$ = new Subject<Order>();
  paymentOrder$ = new Subject<Order>();
  cancelDrop$ = new Subject<Order>();

  userDelete$ = new Subject<User>();
  userEdit$ = new Subject<User>();

  groupEdit$ = new Subject<Group>();
  groupDelete$ = new Subject<Group>();

  customerDebt$ = new Subject<CustomerDebt>();

  constructor() {}
  // order
  selectOrderToView(order: Order) {
    this.orderDetail$.next(order);
  }

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

  selectUserToEdit(user: User) {
    this.userEdit$.next(user);
  }

  selectGroupToEdit(group: Group) {
    this.groupEdit$.next(group);
  }

  selectGroupToDelete(group: Group) {
    this.groupDelete$.next(group);
  }

  selectCustomerPayDebt(customer: CustomerDebt) {
    this.customerDebt$.next(customer);
  }
}
