import { BsModalComponent } from 'ng2-bs3-modal';
import { User } from './../../../user.model';
import { ToastrService } from './../../../../shared/toastr.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../user.service';
import { BsmodalService } from '@core/services/bsmodal.service';
import * as _ from 'lodash';
import { RoleUser } from '@modules/auth/auth.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild('modalEdit') modalEdit: BsModalComponent;
  @Output() UpdateUserOutput = new EventEmitter<User>(); 
  user: User;
  formEdit: FormGroup;

  constructor(
    private bsmodalService: BsmodalService,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.bsmodalService.userEdit$
        .subscribe(user => {
          this.modalEdit.open(); 
          this.user = user;
          this.setValueForm(user);
        });

    this.formEdit = this.fb.group({
      email:                  ["", Validators.email],
      name:                   ["", Validators.required], 
      password:               ["", Validators.compose([Validators.minLength(8)])],
      password_confirmation:  [""],
      role:                   ["", Validators.required]
    }, 
    { validator: this.passwordConfirming })
  }

  setValueForm(user: User): any {
    this.formEdit.patchValue({
      name: user.name,
      email: user.email, 
      role: user.role
    });
  }

  updateUser(value) {
   
    value = _.pickBy(value);
    this.userService.updateUser(this.user.id, value)
        .subscribe(user => {
          this.modalEdit.close();
          this.UpdateUserOutput.emit(user);
        })
  }


  passwordConfirming(c: AbstractControl) {
    if (c.get("password").value !== c.get("password_confirmation").value) {
      return { passwordShouldBeMatched: true };
    }
    return null;
  }

}
