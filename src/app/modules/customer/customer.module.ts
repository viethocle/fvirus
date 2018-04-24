import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from './pages/index-customers/customer.component';
import { SharedModule } from "@shared/shared.module";
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { IndexGroupsComponent } from './pages/index-groups/index-groups.component';
export const CustomerRoutes: Routes = [
  {
    path: "groups",
    component: IndexGroupsComponent
  },
  {
    path: "",
    component: CustomerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CustomerRoutes),
    DataTablesModule
  ],
  declarations: [CustomerComponent, EditCustomerComponent, CreateCustomerComponent, IndexGroupsComponent]
})

export class CustomerModule { }
