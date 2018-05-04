import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-quote-price',
  templateUrl: './quote-price.component.html',
  styleUrls: ['./quote-price.component.css']
})
export class QuotePriceComponent implements OnInit {

  today_formatLL: any;

  constructor() { }

  ngOnInit() {
    this.today_formatLL = moment().locale('vi').format('LL');
  }

}
