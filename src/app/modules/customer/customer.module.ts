import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from './pages/index-customers/customer.component';
import { SharedModule } from "@shared/shared.module";
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
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
  declarations: [CustomerComponent, EditCustomerComponent, CreateCustomerComponent]
})

export class CustomerModule { }
