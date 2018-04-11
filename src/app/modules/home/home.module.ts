import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';
import { CustomerDebtComponent } from './components/customer-debt/customer-debt.component';
import { OrderDueDateComponent } from './components/order-due-date/order-due-date.component';
import { StatisticalComponent } from './components/statistical/statistical.component';
import { ChartsModule } from 'ng2-charts';
import { NumericDirective } from '@shared/directives/numeric.directive';

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
    ChartsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeComponent, CustomerDebtComponent, OrderDueDateComponent, StatisticalComponent]
})
export class HomeModule { }
