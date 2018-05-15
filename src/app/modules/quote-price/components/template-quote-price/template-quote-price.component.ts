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
import * as $ from 'jquery';
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
        this.email_to_send = this.dataQuote.to_email;
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

  exportToPDF() {
    let printContents = (this.template.nativeElement as HTMLElement).innerHTML;
    let popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Bao gia san pham</title>
          <style>
           div#main-product {
              font-size: 16px;
            }

            .info-company {
              font-size: 14px;
            }

            table {
              width: 100%;
            }

            th {
              font-weight: normal;
            }

            .id-user {
              float: right;
              width: 50%;
            }

            .table-row {
              table-layout: fixed;
              background-color: #ffffff;
            }
          </style>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        </head>
        <body onload="window.print();window.close()">
            ${printContents}
        </body>
      </html>`);
    popupWin.document.close();
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
