import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-quote-price',
  templateUrl: './form-quote-price.component.html',
  styleUrls: ['./form-quote-price.component.css']
})
export class FormQuotePriceComponent implements OnInit {


  form: FormGroup; 

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      contents: this.fb.array([this.initItemRows()]),
      to_customer: [''],
      spend_day: [''],
      user_quote: ['']
    }) 
  }

  initItemRows() {
    return this.fb.group({
      content: [''],
      quantity: [''],
      unit: ['']
    })
  }

}
