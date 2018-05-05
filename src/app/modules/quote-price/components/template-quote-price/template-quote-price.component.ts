import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-template-quote-price',
  templateUrl: './template-quote-price.component.html',
  styleUrls: ['./template-quote-price.component.css']
})
export class TemplateQuotePriceComponent implements OnInit {
  @Output() outputGetBack = new EventEmitter();
  @Input() dataQuote: any;
  today_formatLL: any;

  constructor() { }

  ngOnInit() {
    this.today_formatLL = moment().locale('vi').format('LL');
  }

  get showAmount() {
    return _.sumBy(this.dataQuote.contents, (e) => e.quantity * e.price);
  }

  getBackEdit() {
    this.outputGetBack.next();
  }

}
