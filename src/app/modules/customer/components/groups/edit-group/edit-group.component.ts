import { EventEmitter } from '@angular/core';
import { GroupsService } from './../../../groups.service';
import { FormGroupComponent } from './../form-group/form-group.component';
import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Group } from "@modules/customer/group.model";
import { BsmodalService } from '@core/services/bsmodal.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  @ViewChild(BsModalComponent) modal: BsModalComponent;  
  @ViewChild(FormGroupComponent) formComponent: FormGroupComponent; 

  constructor(
    private groupService: GroupsService,
    private bsModalService: BsmodalService ) { }

  ngOnInit() {

    this.bsModalService.groupEdit$
        .subscribe(group => {
          this.formComponent.SetValue(group.title);
          this.modal.open();
        })
  }

  sendRequestUpdateGroup() {
    console.log(this.formComponent.GetValueForm());
  }

}
