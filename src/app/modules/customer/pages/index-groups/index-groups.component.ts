import { Subject } from 'rxjs/Subject';
import { Group } from './../../group.model';
import { GroupsService } from './../../groups.service';
import { Component, OnInit } from '@angular/core';
import { BsmodalService } from '@core/services/bsmodal.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-index-groups',
  templateUrl: './index-groups.component.html',
  styleUrls: ['./index-groups.component.css']
})
export class IndexGroupsComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  groups: Group[] = [];

  constructor(
    private groupService: GroupsService,
    private bsModalService: BsmodalService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "simple_numbers",
      language: {
        url: '../../assets/i18n/datatables/vi.json'
      }
    };
    this.groupService.getGroups()
        .subscribe(groups => { 
          this.groups = groups;
          this.dtTrigger.next();
        });
  }

  handleAddNewGroup(group: Group) {
    this.groups.unshift(group);
  }

  handleUpdateGroup(group: Group) {
     _.assign(this.groups.find(g => g.id === group.id), group);
  }

  handleDeleteGroup(group: Group) {
    _.remove(this.groups, o => o.id === group.id);
  }

  openModalEdit(group) {
    this.bsModalService.selectGroupToEdit(group);
  }

  openModalDelete(group) {
    this.bsModalService.selectGroupToDelete(group);
  }

}
