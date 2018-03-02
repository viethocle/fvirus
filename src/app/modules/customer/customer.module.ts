import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from './pages/index-customers/customer.component';
import { SharedModule } from "@shared/shared.module";
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
