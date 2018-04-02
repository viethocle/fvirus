import { BsModalComponent } from 'ng2-bs3-modal';
import { User } from './../../../user.model';
import { ToastrService } from './../../../../shared/toastr.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../../user.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  // @ViewChild("modal") modal: BsModalComponent;
  form: FormGroup;
  users: User[]= [];
  role: any;
  constructor(
    private usersService: UserService,
    private fb: FormBuilder,
    private toastSvc: ToastrService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  addUser(value: any) {
    // console.log(this.role);
    // const signUpData = {
    //   email: value.email,
    //   name: value.name,
    //   password: value.password,
    //   password_confirmation: value.password_confirmation,
    //   role: this.role ? "manager" : "staff"
    // };

    // this.usersService.addUser(signUpData).subscribe(user => {
    //   this.users.push(user);
    //   this.modal.close();
    //   this.emailJustAdded = value.email;
    //   this.passwordJustAdded = value.password;
    //   this.showAlert = true;
    //   this.form.reset();
    // });
  }

  buildForm() {
    this.form = this.fb.group(
      {
        email: [
          "",
          Validators.compose([Validators.email])
        ],
        name: ["", Validators.required],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(8)])
        ],
        password_confirmation: ["", Validators.required],
        role: [false]
      },
      { validator: this.passwordConfirming }
    );
  }

  passwordConfirming(c: AbstractControl) {
    if (c.get("password").value !== c.get("password_confirmation").value) {
      return { passwordShouldBeMatched: true };
    }
    return null;
  }
}
