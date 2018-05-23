import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BsmodalService } from '@core/services/bsmodal.service';
import { BsModalComponent } from 'ng2-bs3-modal';

import { DashboardService } from '../../dashboard.service';
import { AuthService } from './../../../auth/auth.service';
import { Order } from './../../order';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit, OnDestroy {
  @ViewChild("modalDetail") modalDetail: BsModalComponent;
  order: Order;
  contents: any = [];
  subscription: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private bsmodalService: BsmodalService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.subscription = this.bsmodalService.orderDetail$
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
