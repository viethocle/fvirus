import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { environment } from '../../../environments/environment';

@Injectable()
export class QuoteService {

  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }


  sendEmail(param) {
    let url = this.baseUrl + '/send_quote';
    return this.http.post(url, param);
  }
}
