import { QuotePrice } from './quote-price.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { environment } from '../../../environments/environment';

@Injectable()
export class QuoteService {
  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {

  }

  getQuotePrices(): Observable<QuotePrice[]> {
    let url = this.baseUrl + "/quote_prices.json";
    return this.http.get(url)
                    .map((res: any) => res.quote_prices.map(e => Object.assign(e, { value: JSON.parse(e.value)})));
  }

  sendEmail(param) {
    let url = this.baseUrl + "/send_quote";
    return this.http.post(url, param);
  }

  sendValueQuotePrice(value) {
    let url = this.baseUrl + "/quote_prices.json";
    return this.http.post(url, {value: value});
  }
}
