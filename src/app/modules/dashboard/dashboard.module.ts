import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { SharedModule } from '@shared/shared.module';
import { DragulaModule } from 'ng2-dragula';

import { DashboardRoutes } from './dashboard.routing';
import { KanbanComponent } from './components/kanban/kanban.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DragulaModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [CreateOrderComponent, KanbanComponent]
})
export class DashboardModule { }
