import { priceMask } from './../../../../shared/masks/price.masks';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
@Component({
  selector: 'app-form-quote-price',
  templateUrl: './form-quote-price.component.html',
  styleUrls: ['./form-quote-price.component.css']
})
export class FormQuotePriceComponent implements OnInit, OnChanges {
  @Input() dataQuote: any;
  @Output() dataQuotePrice = new EventEmitter();

  today_formatLL: any;

  priceMask = priceMask;

  contents: FormArray;

  form: FormGroup; 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.contents = this.fb.array([this.initItemRows()])
    this.form = this.fb.group({
      contents: this.fb.array([this.initItemRows()]),
      to_customer: [''],
      spend_day: ['04 ngày'],
      user_quote: ['']
    });

    this.today_formatLL = moment().locale('vi').format('LL');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (_.isObject(changes.dataQuote.currentValue)) {
      this.form.patchValue({
        contents: this.dataQuote.contents,
        to_customers: this.dataQuote.to_customers,
        spend_day: this.dataQuote.spend_day,
        user_quote: this.dataQuote.user_quote
      })
    }
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
    this.dataQuotePrice.next(this.form.value);
  }

}
