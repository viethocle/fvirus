import { Group } from './../../group.model';
import { GroupsService } from './../../groups.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-groups',
  templateUrl: './index-groups.component.html',
  styleUrls: ['./index-groups.component.css']
})
export class IndexGroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(
    private groupService: GroupsService
  ) { }

  ngOnInit() {
    this.groupService.getGroups()
        .subscribe(groups => this.groups = groups);
  }

}
