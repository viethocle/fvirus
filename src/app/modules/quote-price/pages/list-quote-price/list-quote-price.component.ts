import { TemplateQuotePriceComponent } from './../../components/template-quote-price/template-quote-price.component';
import { Store, select } from '@ngrx/store';
import { AdDirective } from './../../directives/ad.directive';
import { BsModalComponent } from 'ng2-bs3-modal';
import { QuoteService } from './../../quote.service';
import { QuotePrice } from './../../quote-price.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Destroyable, takeUntilDestroy } from "take-until-destroy";
import * as quoteDataActions from '../../quote-data';


interface QuoteState {
  data: any;
}

@Destroyable
@Component({
  selector: 'app-list-quote-price',
  templateUrl: './list-quote-price.component.html',
  styleUrls: ['./list-quote-price.component.css']
})
export class ListQuotePriceComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild(AdDirective) adHost: AdDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  quote_prices: QuotePrice[] = [];
  
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
      language: {
        url: '../../assets/i18n/datatables/vi.json'
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

  openPreview(quote: QuotePrice) {
    this.store.dispatch(new quoteDataActions.Store(quote.value));
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TemplateQuotePriceComponent);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<TemplateQuotePriceComponent>componentRef.instance).isPreview = true;
    this.modal.open();
  }


}
