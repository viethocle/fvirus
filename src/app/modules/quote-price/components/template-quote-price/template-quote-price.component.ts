import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-template-quote-price',
  templateUrl: './template-quote-price.component.html',
  styleUrls: ['./template-quote-price.component.css']
})
export class TemplateQuotePriceComponent implements OnInit {
  @ViewChild("template_print") template: ElementRef;

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

  sendEmail() {
    console.log((this.template.nativeElement as HTMLElement).innerHTML);
  }

}
