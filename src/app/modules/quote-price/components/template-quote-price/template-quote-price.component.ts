import { QuoteService } from './../../quote.service';
import { BsModalComponent } from 'ng2-bs3-modal';
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
  @ViewChild("modalEmail") modalEmail: BsModalComponent;
  @Output() outputGetBack = new EventEmitter();
  @Input() dataQuote: any;
  today_formatLL: any;
  email_to_send: string;

  constructor(
    private quoteService: QuoteService
  ) { }

  ngOnInit() {
    this.today_formatLL = moment().locale('vi').format('LL');
  }

  // get showAmount() {
  //   return _.sumBy(this.dataQuote.contents, (e) => e.quantity * e.price);
  // }

  getBackEdit() {
    this.outputGetBack.next();
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
