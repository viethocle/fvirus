import { Order } from '@modules/dashboard/order';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: '[color-order]',
  templateUrl: './color-order.component.html',
  styleUrls: ['./color-order.component.css']
})
export class ColorOrderComponent implements OnInit {
  @HostBinding('class') classes = "";
  @Input('color-order')
    colorOrder: Order ;

  constructor() { }

  ngOnInit() {
    // let ONE_DAY = 24 * 60 * 60 * 1000; // ms /
    let dateOrder = new Date(this.colorOrder.due_date);
    // let today  = new Date().getTime();
    let today = _.now();
    // if ( today - dateOrder < ONE_DAY) {
    //   this.classes = 'order-recent-expire';
    // }
    console.log(today);
    if ( today > dateOrder ) {
      this.classes = 'order-expired';
    }
  }

}
