import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from './pages/user/user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LockUserComponent } from './components/lock-user/lock-user.component';
import { DataTablesModule } from 'angular-datatables';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(UserRoutes),
    DataTablesModule
  ],
  declarations: [UserComponent, CreateUserComponent, LockUserComponent]
})
export class UserModule { }
