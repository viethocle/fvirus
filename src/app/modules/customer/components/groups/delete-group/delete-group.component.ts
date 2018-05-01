import { GroupsService } from './../../../groups.service';
import { Component, OnInit, ViewChild, Output, Input, OnChanges, EventEmitter } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Group } from "@modules/customer/group.model";
import { BsmodalService } from '@core/services/bsmodal.service';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';

@Destroyable
@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css']
})
export class DeleteGroupComponent implements OnInit {

  @Input('groupDelete') group: Group;
  @Output() deleteGroupOutput = new EventEmitter<Group>();

  @ViewChild("modalDelete") modalDelete: BsModalComponent;

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.group.id) 
        .pipe(
          takeUntilDestroy(this)
        )
        .subscribe(group => this.deleteGroupOutput.next(group));
  }

}
