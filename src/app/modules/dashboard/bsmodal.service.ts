import { Order } from '@modules/dashboard/order';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class BsmodalService {

  order$: Subject<Order>;

  constructor() { }

  selectOrder(order: Order) {
    this.order$.next(order);
  }

}
