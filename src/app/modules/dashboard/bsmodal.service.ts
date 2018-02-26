import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '@modules/dashboard/order';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class BsmodalService {

  order$ = new ReplaySubject<Order>(1);

  constructor() { }

  selectOrder(order: Order) {
    this.order$.next(order);
  }

}
