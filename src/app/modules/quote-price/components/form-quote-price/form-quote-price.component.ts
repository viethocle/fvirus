import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-form-quote-price',
  templateUrl: './form-quote-price.component.html',
  styleUrls: ['./form-quote-price.component.css']
})
export class FormQuotePriceComponent implements OnInit {

  today_formatLL: any;

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
      spend_day: [''],
      user_quote: ['']
    });

    this.today_formatLL = moment().locale('vi').format('LL');
  }

  initItemRows(): FormGroup {
    return this.fb.group({
      content: [''],
      quantity: [''],
      unit: [''],
      price: ['']
    })
  }

  addNewRow() {
    let control = <FormArray>this.form.get('contents');
    control.push(this.initItemRows());
  }

  deleteRow(index: number) {
    let control = <FormArray>this.form.get('contents');
    control.removeAt(index);
  }

}
