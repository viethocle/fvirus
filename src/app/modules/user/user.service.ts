import { User } from './../user.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Params } from '@angular/router';

@Injectable()
export class UserService {
  readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    const getUrl = `${this.baseUrl}/users.json`;
    return this.http
            .get(getUrl)
            .map((res: any) => res.users as User[]);
  }

  addUser(value: any): Observable<User> {
    const postUrl = `${this.baseUrl}/auth.json`;
    return this.http
      .post(postUrl, value)
      .map((res: any) => res.data as User);
    }


  updateUser(id, value: any): Observable<User> {
    const putUrl = `${this.baseUrl}/users/${id}.json`;
    return this.http
               .put(putUrl, value)
               .map((res: any) => res.data as User);
  }

  deleteUser(id: any) {
    const deleteUrl = `${this.baseUrl}/users/${id}.json`;
    return this.http.delete(deleteUrl);
  }
}
