import { FormGroupComponent } from './../form-group/form-group.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  @ViewChild(BsModalComponent) modal: BsModalComponent;  
  @ViewChild(FormGroupComponent) formComponent: FormGroupComponent; 

  constructor() { }

  ngOnInit() {
  }

  sendRequestCreateGroup() {
    this.modal.close();
    console.log(this.formComponent.GetValueForm())
  }

}
