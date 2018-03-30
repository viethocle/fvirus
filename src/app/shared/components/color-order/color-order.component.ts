import { Order } from '@modules/dashboard/order';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: '[color-order]',
  templateUrl: './color-order.component.html',
  styleUrls: ['./color-order.component.css']
})
export class ColorOrderComponent implements OnInit {
  @HostBinding('class') classes = "";
  @Input('color-order')
    dueDate: string;

  constructor() { }

  ngOnInit() {
    let due_date = new Date(this.dueDate);
    // if ( tomorrow === dateOrder) {
    //   this.classes = 'order-recent-expire';
    // }
    if ( moment().isAfter(due_date) ) {
      this.classes = 'order-expired';
    }
  }

}
