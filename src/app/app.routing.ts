import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ManagementGuard,
  LoggedInGuard,
  LogoutGuard
} from './core/guard/';


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
    loadChildren: "./modules/auth/auth.module#AuthModule"
    canNotLoad: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
