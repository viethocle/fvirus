import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  form: FormGroup;


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ["", Validators.required]
    })
  }

  GetValueForm() {
    return this.form.value;
  }

  ResetForm() {
    this.form.reset();
  }

  SetValue(title: string) {
    this.form.patchValue({
      title: title
    });
  }

}
