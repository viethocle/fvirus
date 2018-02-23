import { CustomerService } from './../../../customer/customer.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  @ViewChild("modalCreate") modalCreate: BsModalComponent;
  formNewOrder: FormGroup;
  @Output() newOrder = new EventEmitter<Order>();
  minDueDate: any;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.buildForm();
    this.initDatetime();
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

}
