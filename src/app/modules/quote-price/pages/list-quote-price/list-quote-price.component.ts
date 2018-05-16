import { QuoteService } from './../../quote.service';
import { QuotePrice } from './../../quote-price.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-quote-price',
  templateUrl: './list-quote-price.component.html',
  styleUrls: ['./list-quote-price.component.css']
})
export class ListQuotePriceComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  quote_prices: QuotePrice[] = [];
  
  constructor(
    private quoteService: QuoteService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      language: {
        url: '../../assets/i18n/datatables/vi.json'
      }
    };

    this.quoteService.getQuotePrices().subscribe(res => { 
      this.quote_prices = res; 
      console.log(this.quote_prices);
    });
  }


}
