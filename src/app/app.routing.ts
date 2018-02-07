import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ManagementGuard,
  LoggedInGuard,
  LogoutGuard
} from './core/guard/';

import { CustomerComponent } from "./modules/customer/customer.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/kanban', pathMatch: 'full'
  },
  {
    path: "dashboard",
    loadChildren: "./modules/dashboard/dashboard.module#DashboardModule",
    canLoad: [LoggedInGuard]
  },
  {
    path: "login",
    loadChildren: "./modules/auth/auth.module#AuthModule",
    canLoad: [LogoutGuard]
  },
  {
    path: "customers",
    component: CustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
