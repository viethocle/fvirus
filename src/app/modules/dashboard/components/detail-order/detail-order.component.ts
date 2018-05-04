import { RoleUser, AuthService } from './../../../auth/auth.service';
import { BsModalComponent } from 'ng2-bs3-modal';
import { DashboardService } from '../../dashboard.service';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { tap } from 'rxjs/operators';
import { CustomerService } from './../../../customer/customer.service';
import { Order } from './../../order';
import {
  Component,
  OnInit, OnDestroy,
  ViewChild, Output, EventEmitter, ViewChildren, ElementRef, Renderer2,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray
} from '@angular/forms';
import { Customer } from "@modules/customer/customer.model";
import { FlyInOut } from '../../flyInOut.animate';
import * as _ from 'lodash';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'
import { BsmodalService } from '@core/services/bsmodal.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  @ViewChild("modalDetail") modalDetail: BsModalComponent;
  order: Order;
  contents: any;
  constructor(
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.bsmodalService.orderDetail$
        .subscribe(order => {
          if (order) {
            this.order = order;
            this.contents = JSON.parse(order.contents);
            this.modalDetail.open();
            console.log(order);
          }
        });
  }
  exitView() {
    this.modalDetail.close();
  }
}
