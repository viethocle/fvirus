import { UserService } from './../../user.service';
import { User } from './../../../user.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';

import 'rxjs/add/operator/map';
import { BsmodalService } from '@core/services/bsmodal.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})
export class UserComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: User[] = [];
  loading: boolean;
  getUsers$: any;

  constructor(
    private usersService: UserService,
    private bsmodalService: BsmodalService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers"
    };
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
      this.dtTrigger.next();
      this.loading = false;
    });
  }

  updateUsers(user: User) {
    this.users.unshift(user);
  }

  openModalDelete(user: User) {
    this.bsmodalService.selectUserToDelete(user);
  }

  openModalEdit(user: User) {
    this.bsmodalService.selectUserToEdit(user);
  }

  handleDeleteUser(user: User) {
   this.users.find(res => res.id === user.id).active = false;
  }

  handleUpdateUser(user: User) {
    _.assign(this.users.find(t => t.id === user.id), user);
  }

  unDelete(user: User) {
    this.usersService.deleteUser(user.id)
        .subscribe( _  => {
          this.users.find(res => res.id === user.id).active = true;
        });
  }
}
