import { EventEmitter } from '@angular/core';
import { GroupsService } from './../../../groups.service';
import { FormGroupComponent } from './../form-group/form-group.component';
import { Component, OnInit, ViewChild, Output, Input, OnChanges } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Group } from "@modules/customer/group.model";
import { BsmodalService } from '@core/services/bsmodal.service';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy'

@Destroyable
@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  @Input() groupEdit: Group;

  @ViewChild("modalEdit") modalEdit: BsModalComponent;  
  @ViewChild(FormGroupComponent) formComponent: FormGroupComponent; 
  @Output('updateGroup') updateGroup = new EventEmitter<Group>();

  groupSelected: Group;

  constructor(
    private groupService: GroupsService,
    private bsModalService: BsmodalService ) { }

  ngOnInit() {
    this.modalEdit.onOpen
        .pipe(
          takeUntilDestroy(this)
        )
        .subscribe(_ => {
          this.formComponent.SetValue(this.groupEdit.title);
        })
  }

  sendRequestUpdateGroup() {
    this.modalEdit.close();
    this.groupService.updateGroup(this.groupSelected.id, this.formComponent.GetValueForm())
        .pipe(
          takeUntilDestroy(this)
        )
        .subscribe(group => {
          this.updateGroup.next(group);
          this.formComponent.ResetForm();
        })
  }

}
