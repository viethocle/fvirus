import { Router } from '@angular/router';
import { takeUntilDestroy, Destroyable } from 'take-until-destroy';
import { QuoteService } from './../../quote.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import * as quoteDataActions from '../../quote-data';
import * as jsPDF from 'jspdf';
interface QuoteState {
  data: any;
}

@Destroyable
@Component({
  selector: 'app-template-quote-price',
  templateUrl: './template-quote-price.component.html',
  styleUrls: ['./template-quote-price.component.css']
})
export class TemplateQuotePriceComponent implements OnInit {
  @ViewChild("template_print") template: ElementRef;
  @ViewChild("modalEmail") modalEmail: BsModalComponent;
  dataQuote: any;
  today_formatLL: any;
  email_to_send: string;

  constructor(
    private quoteService: QuoteService,
    private store: Store<QuoteState>,
    private router: Router
  ) { 
    store.pipe(
      takeUntilDestroy(this),
      select('quoteData')
    )
      .subscribe(res => {
        if (_.isNil(res)) {
          this.router.navigate(["/quote-price"]);
          return;
        }
        this.dataQuote = res;
      })
  }

  ngOnInit() {
    this.today_formatLL = moment().locale('vi').format('LL');
    
  }

  get showAmount() {
    return _.sumBy(this.dataQuote.contents, (e: any) => e.quantity * e.price);
  }

  getBackEdit() {
    this.router.navigate(["/quote-price"]);
  }

  sendEmail() {
    this.modalEmail.close();
    let params = {
      email: this.email_to_send,
      html: (this.template.nativeElement as HTMLElement).innerHTML
    }

    this.quoteService.sendEmail(params)
        .subscribe(_ => {});
  }

}
