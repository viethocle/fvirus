import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { CustomerDebtComponent } from './components/customer-debt/customer-debt.component';
import { OrderDueDateComponent } from './components/order-due-date/order-due-date.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent, CustomerDebtComponent, OrderDueDateComponent]
})
export class HomeModule { }
