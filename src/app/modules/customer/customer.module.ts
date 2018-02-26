import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./customer.component";
export const CustomerRoutes: Routes = [
  {
    path: "",
    component: CustomerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CustomerRoutes)
  ],
  declarations: [CustomerComponent]
})

export class CustomerModule { }
