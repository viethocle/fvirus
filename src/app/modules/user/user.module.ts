import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user/user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { LockUserComponent } from './components/lock-user/lock-user.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent, CreateUserComponent, LockUserComponent]
})
export class UserModule { }
