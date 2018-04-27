import { Group } from './group.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupsService {

  private baseUrl = environment.baseUrl;
  private url     = `${this.baseUrl}/groups`;

  constructor(
    private http: HttpClient
  ) { }

  getGroups(): Observable<Group[]> {
    const getUrl = this.url + '.json';
    return this.http
                .get(getUrl)
                .map((res: any) => res.groups as Group[]);
  }

  addGroup(value): Observable<Group> {
    const addUrl = this.url + '.json';
    return this.http.post(addUrl, value)
                    .map((res: any) => res.group as Group);
  }

}
