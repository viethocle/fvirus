import { QuoteService } from "./../../quote.service";
import { QuotePrice } from "./../../quote-price.model";
import { Subject } from "rxjs/Subject";
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import * as _ from "lodash";
import { CreateOrderComponent } from '@modules/dashboard/components/create-order/create-order.component';
import { FormArray } from "@angular/forms";

@Component({
  selector: "app-list-quote-price",
  templateUrl: "./list-quote-price.component.html",
  styleUrls: ["./list-quote-price.component.css"]
})
export class ListQuotePriceComponent implements OnInit {
  @ViewChild(CreateOrderComponent) createOrderComp: CreateOrderComponent;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  quote_prices: QuotePrice[] = [];

  constructor(private quoteService: QuoteService, private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 25,
      language: {
        url: "../../assets/i18n/datatables/vi.json"
      }
    };

    this.quoteService.getQuotePrices().subscribe(res => {
      this.quote_prices = res;
      this.dtTrigger.next();
    });
  }

  navigateToCustomer(customer_id) {
    if (_.isNumber(customer_id)) {
      this.router.navigate(["/customers", customer_id]);
    }
  }
  createOrderFormQuote(quote: QuotePrice) {
    let control = <FormArray>this.createOrderComp.formNewOrder.controls.contents;
    quote.value.contents.forEach(cont => {
      control.removeAt(cont);
    });
    quote.value.contents.forEach(cont => {
      control.push(this.createOrderComp.formBuilder.group({
          content: cont.content,
          unit: cont.unit,
          quantity: cont.quantity,
          price: cont.price
        }));
    });

    this.createOrderComp.modalCreate.open();
  }
}
