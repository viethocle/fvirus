import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';
import { takeUntilDestroy, Destroyable } from 'take-until-destroy';
import { priceMask } from './../../../../shared/masks/price.masks';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import * as quoteDataActions from '../../quote-data';
import { Customer } from "@modules/customer/customer.model";
interface QuoteState {
  data: any;
}

@Destroyable
@Component({
  selector: 'app-form-quote-price',
  templateUrl: './form-quote-price.component.html',
  styleUrls: ['./form-quote-price.component.css']
})



export class FormQuotePriceComponent implements OnInit {

  today_formatLL: any;

  priceMask = priceMask;

  contents: FormArray;

  form: FormGroup;
  dataQuote: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<QuoteState>,
    private router: Router,
    private authTokenService: Angular2TokenService
  ) { }

  ngOnInit() {
    this.contents = this.fb.array([this.initItemRows()]);
    this.form = this.fb.group({
      contents: this.fb.array([this.initItemRows()]),
      to_customer: [''],
      spend_day: ['04 ngày'],
      user_quote: [''],
      to_email: [""],
      customer_id: [""]
    });

    this.form.patchValue({
      user_quote: this.authTokenService.currentUserData.name
    });

    this.store.pipe(
      takeUntilDestroy(this),
      select('quoteData')
    )
      .subscribe(res => {
        this.dataQuote = res;
        if (_.isObject(this.dataQuote)) {
          this.form.patchValue({
            to_customer: this.dataQuote.to_customer,
            to_email: this.dataQuote.to_email,
            contents: this.dataQuote.contents,
            spend_day: this.dataQuote.spend_day,
            user_quote: this.dataQuote.user_quote
          })
        }
      })
    this.today_formatLL = moment().locale('vi').format('LL');
  }

  initItemRows(): FormGroup {
    return this.fb.group({
      content: [''],
      quantity: [1],
      unit: [''],
      price: [0]
    })
  }

  get formContents(): FormArray {
    return <FormArray>this.form.controls.contents;
  }

  addNewRow() {
    let control = <FormArray>this.form.get('contents');
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    let control = <FormArray>this.form.get('contents');
    control.removeAt(index);
  }

  handleSelectCustomer(name: string) {
    this.form.patchValue({
      to_customer: name
    })
  }

  quotePrice() {
    this.store.dispatch(new quoteDataActions.Store(this.form.value));
    this.router.navigate(['/quote-price/template']);
  }

  handleDataCustomer(customer: Customer) {
    this.form.patchValue({
      to_email: customer.email,
      customer_id: customer.id
    })
  }

}
