import { Order } from './../../order';
import { BsmodalService } from './../../bsmodal.service';
import { DashboardService } from './../../dashboard.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  order: Order;
  formEditOrder: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formEditOrder = this.formBuilder.group({
      description: [""],
      due_date: ["", Validators.required],
      customer_id: [""]
    });

  }

}
