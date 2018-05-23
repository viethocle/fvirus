import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { DataTablesModule } from "angular-datatables";

import { CreateCustomerComponent } from "./components/customers/create-customer/create-customer.component";
import { EditCustomerComponent } from "./components/customers/edit-customer/edit-customer.component";
import { FormCustomerComponent } from "./components/customers/form-customer/form-customer.component";
import { CreateGroupComponent } from "./components/groups/create-group/create-group.component";
import { DeleteGroupComponent } from "./components/groups/delete-group/delete-group.component";
import { EditGroupComponent } from "./components/groups/edit-group/edit-group.component";
import { FormGroupComponent } from "./components/groups/form-group/form-group.component";
import { CustomerComponent } from "./pages/index-customers/customer.component";
import { IndexGroupsComponent } from "./pages/index-groups/index-groups.component";
import { DetailCustomerComponent } from "./components/customers/detail-customer/detail-customer.component";
import { CustomerGuard } from "@core/guard";

export const CustomerRoutes: Routes = [
  {
    path: "groups",
    component: IndexGroupsComponent
  },
  {
    path: "list",
    component: CustomerComponent,
  },
  {
    path: ":id",
    component: DetailCustomerComponent,
    canActivate: [CustomerGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CustomerRoutes),
    DataTablesModule
  ],
  declarations: [
    CustomerComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    IndexGroupsComponent,
    CreateGroupComponent,
    FormGroupComponent,
    EditGroupComponent,
    DeleteGroupComponent,
    FormCustomerComponent,
    DetailCustomerComponent
  ]
})
export class CustomerModule {}
