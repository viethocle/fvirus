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
  @Output() newCustomerOutput = new EventEmitter<Customer>();
  formAdd: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formAdd = this.formBuilder.group({
      name: ["", Validators.required],
      phone: [""],
      email: [""],
      address: [""]
    });
  }

  addCustomer(value: any) {
    this.customerService
      .addCustomer(value)
      .subscribe((customer: Customer) => {
        this.newCustomerOutput.next(customer);
        this.formAdd.reset();
        // this.toastrService.SetMessageSuccess("Success");
      });
  }



}
