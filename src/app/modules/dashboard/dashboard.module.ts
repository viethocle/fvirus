import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { SharedModule } from '@shared/shared.module';

import { DashboardRoutes } from './dashboard.routing';
import { KanbanComponent } from './components/kanban/kanban.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [
    CreateOrderComponent, 
    KanbanComponent, 
    DashboardPage]
})
export class DashboardModule { }
