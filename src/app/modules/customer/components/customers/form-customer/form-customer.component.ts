import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@modules/customer/customer.model';

@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      phone: [""],
      email: [""],
      address: [""],
      group_ids: [""]
    });
  }

  setValueForm(customer: Customer) {
    this.resetForm();
    this.form.patchValue({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      group_ids: customer.groups.map(g => g.id)
    })
  }

  resetForm() {
    this.form.reset();
  }

  getValueForm() { 
    return this.form.value;
  }

  

}
