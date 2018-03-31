import { User } from './../user.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {
  readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
      const getUrl = `${this.baseUrl}/users.json`;
    return this.http
            .get(getUrl)
            .map(res => res as User[]);
    }
}
