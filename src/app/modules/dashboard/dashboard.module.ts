import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { SharedModule } from '@shared/shared.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { DpDatePickerModule } from 'ng2-date-picker';

import { DashboardRoutes } from './dashboard.routing';
import { KanbanComponent } from './components/kanban/kanban.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { TableOrdersPage } from './pages/table-orders/table-orders.page';
import { KanbanCardComponent } from './components/kanban-card/kanban-card.component';
import { MatchHeightDirective } from '@shared/directives/match-height.directive';
import { DeleteOrderComponent } from './components/delete-order/delete-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { StatusComponent } from './components/status/status.component';
import { FilterOrderComponent } from './components/filter-order/filter-order.component';

import { PaymentOrderComponent } from './components/payment-order/payment-order.component';
import { NumericDirective } from '@shared/directives/numeric.directive';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DashboardRoutes),
    AngularMultiSelectModule,
    DpDatePickerModule
  ],
  declarations: [
    MatchHeightDirective,
    NumericDirective,
    CreateOrderComponent,
    KanbanComponent,
    DashboardPage,
    TableOrdersPage,
    KanbanCardComponent,
    DeleteOrderComponent,
    EditOrderComponent,
    StatusComponent,
    FilterOrderComponent,
    PaymentOrderComponent,
  ]
})
export class DashboardModule { }
