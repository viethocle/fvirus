import { EventEmitter } from '@angular/core';
import { GroupsService } from './../../../groups.service';
import { FormGroupComponent } from './../form-group/form-group.component';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Group } from "@modules/customer/group.model";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  @ViewChild(BsModalComponent) modal: BsModalComponent;  
  @ViewChild(FormGroupComponent) formComponent: FormGroupComponent; 

  @Output('newGroup') newGroup = new EventEmitter<Group>();

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {
  }

  sendRequestCreateGroup() {
    this.modal.close();
    this.groupService.addGroup(this.formComponent.GetValueForm())
        .subscribe(group => { 
          this.newGroup.next(group); 
          this.formComponent.ResetForm();
        });
  }

}
