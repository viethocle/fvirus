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
import { PerfectScrollbarComponent } from "ngx-perfect-scrollbar";
import * as _ from 'lodash';
import { QueryList } from '@angular/core/src/render3';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  @ViewChild("modalCreate") modalCreate: BsModalComponent;
  @ViewChild(PerfectScrollbarComponent) componentScroll: PerfectScrollbarComponent;
  @ViewChildren("listCustomers") listCustomers;
  formNewOrder: FormGroup;
  @Output() newOrder = new EventEmitter<Order>();
  minDueDate: any;
  customers: Customer[] = [];
  termCustomer = "";
  currentFocusIndex: number = -1;
  customerSelected: Customer;

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
      due_date: ["", Validators.required],
      customer_id: [""]
    });
  }

  initDatetime(): any {
    let d = new Date();
    this.minDueDate = new Date(new Date().setDate(new Date().getDate() - 1)); // mean yesterday
  }

  createOrder() {
    this.modalCreate.close();
    this.formNewOrder.patchValue({
      customer_id: this.customerSelected.id
    })
    this.dashboardService.createOrder(this.formNewOrder.value)
        .subscribe((newOrder: Order) => this.newOrder.emit(newOrder));
  }

  chooseCustomer() {
    if (this.currentFocusIndex === -1) return;
    let listsButton = this.listCustomers.toArray().map(res => res.nativeElement);
    let selectedCustomerId = listsButton[this.currentFocusIndex].dataset.idcustomer;
    let selectedCustomer = this.customers.find(cus => cus.id === _.toNumber(selectedCustomerId));
    this.selectCustomer(selectedCustomer);
  }


  // * handle event keyup enter andn click customer
  selectCustomer(cus: Customer) {
    this.customerSelected = cus;
    this.termCustomer = "";
  }

  shiftFocusDown(e) {
    e.preventDefault();
    let lengthResults = this.listCustomers.toArray().length;
    if (this.currentFocusIndex === lengthResults - 1) return;
    this.currentFocusIndex++;
    this.focusElement(this.currentFocusIndex);
  }

  shiftFocusUp(e) {
    e.preventDefault();
    if (this.currentFocusIndex == 0) return;
    this.currentFocusIndex--;
    this.focusElement(this.currentFocusIndex);
  }

  escapeSearch(e) {
    this.termCustomer = "";
  }

  onChangeTermCustomer() {
    this.currentFocusIndex = -1;
  }

  focusElement(id) {
    let listsButton = this.listCustomers.toArray().map(res => res.nativeElement);
    if (id > listsButton.count || id < 0) {
      return;
    }
    listsButton.forEach(e => {
      this.renderer2.removeClass(e, 'focus-customer');
    });
    this.renderer2.addClass(listsButton[id], 'focus-customer');
    this.componentScroll.directiveRef.scrollToY(40 * id);
  }

}
