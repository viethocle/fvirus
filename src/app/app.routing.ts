import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AdminRouteGuard,
  LoggedInGuard,
  LogoutGuard
} from './core/guard/';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard/kanban",
    pathMatch: "full"
  },
  {
    path: "homepage",
    loadChildren: "./modules/home/home.module#HomeModule",
    canLoad: [LoggedInGuard, AdminRouteGuard]
  },
  {
    path: "users",
    loadChildren: "./modules/user/user.module#UserModule",
    canLoad: [LoggedInGuard]
  },
  {
    path: "dashboard",
    loadChildren: "./modules/dashboard/dashboard.module#DashboardModule",
    canLoad: [LoggedInGuard]
  },
  {
    path: "login",
    loadChildren: "./modules/auth/auth.module#AuthModule"
  },
  {
    path: "customers",
    loadChildren: "./modules/customer/customer.module#CustomerModule",
    canLoad: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
