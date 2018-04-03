import { StatusOrder } from './../../../modules/dashboard/order';
import { Order } from '@modules/dashboard/order';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: '[color-order]',
  templateUrl: './color-order.component.html',
  styleUrls: ['./color-order.component.css']
})
export class ColorOrderComponent implements OnInit {
  @HostBinding('class') classes = "card ";
  @Input('color-order')
    dueDate: string;

  @Input('status-order') status = "";

  constructor() { }

  ngOnInit() {
    let due_date = moment(this.dueDate);
    let tomorrow = moment(new Date()).add(1, 'days');
    if (tomorrow.isSame(due_date, 'day') && this.status != StatusOrder.delivered) {
      this.classes = 'order-recent-expire card';
    }
    if ( moment().isAfter(due_date) && this.status != StatusOrder.delivered) {
      this.classes = 'order-expired card';
    }
  }

}
