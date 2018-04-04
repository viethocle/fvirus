import { BsmodalService } from '@core/services/bsmodal.service';
import { tap } from 'rxjs/operators';
import { User } from './../../../user.model';
import { EventEmitter } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ViewChild, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { UserService } from '../../user.service';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';
import { skip } from "rxjs/operator/skip";

@Component({
  selector: 'app-lock-user',
  templateUrl: './lock-user.component.html',
  styleUrls: ['./lock-user.component.css']
})
export class LockUserComponent implements OnInit {
  @ViewChild('modalDelete') modalDelete: BsModalComponent;
  @Output() deleteUserOutput = new EventEmitter<User>();
  user: User;

  constructor(
    private userService: UserService,
    private bsmodalService: BsmodalService
  ) { }

  ngOnInit() {
    this.bsmodalService.userDelete$
        .subscribe(user => {
          if (user) {
            this.user = user;
            this.openModalDetete();
          }
        });
    }

    openModalDetete() {
      this.modalDelete.open();
    }

    deteteUser() {
      this.userService.deleteUser(this.user.id)
        .subscribe( _  => {
          this.user.active = !this.user.active;
          this.deleteUserOutput.emit(this.user);
        });
      }
}


