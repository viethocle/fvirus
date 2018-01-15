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

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.formNewOrder = this.formBuilder.group({
      description: [""]
    });
  }

  createOrder() {
    this.modalCreate.close();
    this.dashboardService.createOrder(this.formNewOrder.value)
        .subscribe((newOrder: Order) => this.newOrder.emit(newOrder));
  }

}
