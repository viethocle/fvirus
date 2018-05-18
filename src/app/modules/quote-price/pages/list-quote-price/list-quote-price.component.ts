import { CreateOrderComponent } from '@modules/dashboard/components/create-order/create-order.component';
import { FormArray } from "@angular/forms";
import { TemplateQuotePriceComponent } from './../../components/template-quote-price/template-quote-price.component';
import { Store, select } from '@ngrx/store';
import { AdDirective } from './../../directives/ad.directive';
import { BsModalComponent } from 'ng2-bs3-modal';
import { QuoteService } from './../../quote.service';
import { QuotePrice } from './../../quote-price.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { Destroyable, takeUntilDestroy } from "take-until-destroy";
import * as quoteDataActions from '../../quote-data';
import * as _ from 'lodash';

interface QuoteState {
  data: any;
}

@Destroyable
@Component({
  selector: "app-list-quote-price",
  templateUrl: "./list-quote-price.component.html",
  styleUrls: ["./list-quote-price.component.css"]
})
export class ListQuotePriceComponent implements OnInit {
  @ViewChild(CreateOrderComponent) createOrderComp: CreateOrderComponent;
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild("modalDelete") modalDelete: BsModalComponent;
  @ViewChild(AdDirective) adHost: AdDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  quote_prices: QuotePrice[] = [];

  contentsShowConfirm: string;
  quoteDeleteId: number;

  
  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private store: Store<QuoteState>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 25,
      order: [],
      language: {
        url: "../../assets/i18n/datatables/vi.json"
      }
    };

    this.quoteService.getQuotePrices()
      .pipe(
        takeUntilDestroy(this)
      )
      .subscribe(res => { 
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
  openPreview(quote: QuotePrice) {
    this.store.dispatch(new quoteDataActions.Store(quote.value));
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TemplateQuotePriceComponent);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<TemplateQuotePriceComponent>componentRef.instance).isPreview = true;
    this.modal.open();
  }

  openModalDelete(quote: QuotePrice) {
    this.quoteDeleteId = quote.id;
    this.contentsShowConfirm = quote.value.contents.map(e => e.content).join("<br>");
    this.modalDelete.open();
  }

  sendRequestDelete() {
    this.quoteService.deleteQuote(this.quoteDeleteId)
        .pipe(
          takeUntilDestroy(this)
        )
        .subscribe(_ => {
           this.quote_prices = this.quote_prices.filter(e => e.id !== this.quoteDeleteId);
        })
  }


}
