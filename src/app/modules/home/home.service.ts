import { Observable } from 'rxjs/Observable';
import { CustomerDebt } from './customer-debt.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Order } from '@modules/dashboard/order';


export interface ICustomersDebt {
  customers: CustomerDebt[];
  total: number;
}


@Injectable()
export class HomeService {

  readonly baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {

  }

  getCustomersDebtWithPage(page: number, per_page: number, search_text: string): Observable<ICustomersDebt> {
    const url = `${this.baseUrl}/customers_debt.json?page=${page}&search=${search_text}&per_page=${per_page}`;
    return this.http
      .get(url)
      .map(res => res as ICustomersDebt);
  }

  getOrderdebt(id: number): Observable<any> {
     const url = `${this.baseUrl}/dashboards/${id}/orders_debt.json?`;
     return this.http
        .get(url)
        .map(res => res as any);
  }

  getRevenue(): Observable<any> {
     const url = `${this.baseUrl}/revenue.json?`;
     return this.http
        .get(url)
        .map(res => res as any);
  }

  sendPaymentDebt(customer_id, payment): Observable<CustomerDebt> {
    const url = `${this.baseUrl}/customers/${customer_id}/payTotalDebt`;
    return this.http.put(url, { payment: payment})
                    .map((res: any) => res.customer as CustomerDebt);
  }
}
