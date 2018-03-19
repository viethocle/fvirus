
import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishReplay";
import * as _ from 'lodash';

export enum RoleUser {
  admin = 'admin',
  accountant = 'accountant',
  technician = 'technician'
}



@Injectable()
export class AuthService {
  redirectUrl: string;
  public userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(
    public authService: Angular2TokenService,
    private router: Router
  ) {
    this.authService.init({ apiBase: environment.baseUrl});
    this.authService.validateToken().subscribe(
      res => this.userSignedIn$.next(true),
      err => {
        this.router.navigate(["/login"]);
        this.userSignedIn$.next(false);
        console.log("error when validatoken on init");
      }
    );
  }

  logIn(
    email: string,
    password: string,
    remember: boolean
  ): Observable<Response> {
    return this.authService
      .signIn({ email: email, password: password })
      .map(res => {
        this.router.navigate([""])
        this.userSignedIn$.next(true);
        return res;
      });
  }

  ValidateToken(): Observable<Response> {
    console.log("call validate in auth svc");
    const obs$ = this.authService
      .validateToken()
      .publishReplay(1)
      .refCount();
    return obs$;
  }

  get isCurrentUserAccount() {
    return _.get(this.authService.currentUserData, 'role') === RoleUser.accountant;
  }

  get isCurrentUserAdmin() {
    return _.get(this.authService.currentUserData, 'role') === RoleUser.admin;
  }

  get isCurrentUserTechnician() {
    return _.get(this.authService.currentUserData, 'role') === RoleUser.technician;
  }

  logOut(): void {
    this.authService.signOut().subscribe(
      res => {
        this.userSignedIn$.next(false);
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(["/login"]);
      },
      err => {
        this.userSignedIn$.next(false);
        this.router.navigate(["/login"]);
      }
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("accessToken") !== null;
  }

  private get_auth_token() {
    return sessionStorage.getItem("auth_token");
  }
}
