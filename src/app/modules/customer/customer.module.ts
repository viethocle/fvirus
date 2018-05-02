import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from './pages/index-customers/customer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from "@shared/shared.module";
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { IndexGroupsComponent } from './pages/index-groups/index-groups.component';
import { CreateGroupComponent } from './components/groups/create-group/create-group.component';
import { FormGroupComponent } from './components/groups/form-group/form-group.component';
import { EditGroupComponent } from './components/groups/edit-group/edit-group.component';
import { DeleteGroupComponent } from './components/groups/delete-group/delete-group.component';
export const CustomerRoutes: Routes = [
  {
    path: "groups",
    component: IndexGroupsComponent
  },
  {
    path: "list",
    component: CustomerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CustomerRoutes),
    DataTablesModule,
    NgSelectModule
  ],
  declarations: [CustomerComponent, EditCustomerComponent, CreateCustomerComponent, IndexGroupsComponent, CreateGroupComponent, FormGroupComponent, EditGroupComponent, DeleteGroupComponent]
})

export class CustomerModule { }
