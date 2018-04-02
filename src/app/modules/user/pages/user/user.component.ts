import { UserService } from './../../user.service';
import { User } from './../../../user.model';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';

import 'rxjs/add/operator/map';

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
    private usersService: UserService
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

}
