import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Angular2TokenService } from 'angular2-token';
import * as _ from 'lodash';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class AdminRouteGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isCurrentUserAdmin) {
      return true;
    }
    this.router.navigate(['dashboard/kanban']);
    return false;
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }
}
