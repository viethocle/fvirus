import { Component, OnInit, ViewChild, Output, EventEmitter, ViewChildren, ElementRef, Renderer2 } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { BsModalComponent } from 'ng2-bs3-modal';
import { DashboardService } from '../../dashboard.service';

import { Order } from '../../order';
import { Customer } from "@modules/customer/customer.model";
import { CustomerService } from "@modules/customer/customer.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  @ViewChild("modalCreate") modalCreate: BsModalComponent;
  @ViewChildren("listCustomers") listCustomers;
  formNewOrder: FormGroup;
  @Output() newOrder = new EventEmitter<Order>();
  minDueDate: any;
  customers: Customer[] = [];
  termCustomer = "";

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private customerService: CustomerService,
    private renderer2: Renderer2) { }

  ngOnInit() {
    this.buildForm();
    this.initDatetime();
    this.customerService.getCustomersWithObservable()
        .subscribe(customers => this.customers = customers);
  }


  buildForm() {
    this.formNewOrder = this.formBuilder.group({
      description: [""],
      due_date: ["", Validators.required]
    });
  }

  initDatetime(): any {
    let d = new Date();
    this.minDueDate = new Date(new Date().setDate(new Date().getDate() - 1)); // mean yesterday
  }

  createOrder() {
    this.modalCreate.close();
    this.dashboardService.createOrder(this.formNewOrder.value)
        .subscribe((newOrder: Order) => this.newOrder.emit(newOrder));
  }

  shiftFocusDown() {
    let listsButton = this.listCustomers.toArray();
    listsButton[1].nativeElement.focus();
    console.log(listsButton);
  }

}
