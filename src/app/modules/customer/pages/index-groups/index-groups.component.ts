import { Subject } from 'rxjs/Subject';
import { Group } from './../../group.model';
import { GroupsService } from './../../groups.service';
import { Component, OnInit } from '@angular/core';

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
    private groupService: GroupsService
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

}
