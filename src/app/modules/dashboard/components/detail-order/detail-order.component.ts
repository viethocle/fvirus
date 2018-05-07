import { Component, OnInit, ViewChild } from '@angular/core';
import { BsmodalService } from '@core/services/bsmodal.service';
import { BsModalComponent } from 'ng2-bs3-modal';

import { DashboardService } from '../../dashboard.service';
import { AuthService } from './../../../auth/auth.service';
import { Order } from './../../order';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'

@Destroyable
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
        .pipe(
          takeUntilDestroy(this)
        )
        .subscribe(order => {
          if (order) {
            this.order = order;
            this.contents = JSON.parse(order.contents);
            this.modalDetail.open();
          }
        });
  }
  exitView() {
    this.modalDetail.close();
  }
}
