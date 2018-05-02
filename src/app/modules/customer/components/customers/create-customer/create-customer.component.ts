import { FormCustomerComponent } from './../form-customer/form-customer.component';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@modules/customer/customer.model';
import { CustomerService } from "@modules/customer/customer.service";

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  @ViewChild("modal") modal: BsModalComponent;
  @ViewChild(FormCustomerComponent) formCustomer: FormCustomerComponent;
  @Output() newCustomerOutput = new EventEmitter<Customer>();

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
  }


  addCustomer() {
    this.customerService
      .addCustomer(this.formCustomer.getValueForm())
      .subscribe((customer: Customer) => {
        this.newCustomerOutput.next(customer);
        this.formCustomer.resetForm();
      });
  }



}
