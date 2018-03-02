import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { environment } from '../../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { Customer } from './customer.model';
import * as _ from 'lodash';

export interface ICustomersTotal {
  customers: Customer[],
  total: number
}

@Injectable()
export class CustomerService {
  // private baseUrl = `${environment.token_auth_config.apiBase}`;
  private baseUrl = `${environment.baseUrl}`;

  private url = `${this.baseUrl}/customers`;


  constructor(private http: HttpClient) {
    // this.options.headers = this.authService.currentAuthHeaders;
  }


  getCustomersWithPage(
    page: number,
    per_page: number,
    search_text: string
  ): Observable<ICustomersTotal> {
    const url = `${this.url}.json?page=${page}&search_text=${search_text}&per_page=${per_page}`;
    return this.http
      .get(url)
      .map(res => res as ICustomersTotal);
  }

  getCustomersWithObservable(): Observable<Customer[]> {
    const getUrl = `${this.url}.json`;
    return this.http
      .get(getUrl)
      .map((res: any) => res.customers as Customer[]);
  }

  deleteCustomer(customer: Customer): Observable<any> {
    const deleteUrl = `${this.url}/${customer.id}.json`;
    return this.http
      .delete(deleteUrl)
  }

  updateCustomer(customer: Customer, id: number): Observable<any> {
    const updateUrl = `${this.url}/${id}.json`;
    return this.http
      .put(updateUrl, customer)
      .map((res: any) => res.customer as any);
  }

  addCustomer(value: any, selectedValue: number): Observable<Customer> {
    const addUrl = `${this.url}.json`;
    return this.http
      .post(addUrl, value)
      .map((res: any) => res.customer as Customer);
  }

}
