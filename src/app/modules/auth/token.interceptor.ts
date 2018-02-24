import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public auth: Angular2TokenService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = this.auth.currentAuthHeaders;
    request = request.clone({
      setHeaders: {
        'access-token': headers.get('access-token'),
        client: headers.get('client'),
        uid: headers.get('uid')
      }
    });
    console.log(request);
    return next.handle(request);
  }
}