import { EventEmitter } from '@angular/core';
import { GroupsService } from './../../../groups.service';
import { Component, OnInit, ViewChild, Output, Input, OnChanges } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { Group } from "@modules/customer/group.model";
import { BsmodalService } from '@core/services/bsmodal.service';
import { Destroyable, takeUntilDestroy } from 'take-until-destroy';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css']
})
export class DeleteGroupComponent implements OnInit {

  @Input('groupDelete') group: Group;

  @ViewChild("modalDelete") modalDelete: BsModalComponent;

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {
  }

  deleteGroup() {

  }

}
