import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { environment } from '../../../environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { Customer } from './customer.model';
import * as _ from 'lodash';
import { CustomerDebt } from '@modules/home/customer-debt.model';

export interface ICustomersTotal {
  customers: Customer[],
  total: number
}

@Injectable()
export class CustomerService {
  // private baseUrl = `${environment.token_auth_config.apiBase}`;
  private baseUrl = `${environment.baseUrl}`;

  private url = `${this.baseUrl}/customers`;

  constructor(private http: HttpClient) {}

  getCustomersWithPage(params): Observable<ICustomersTotal> {
    const url = `${this.baseUrl}/customers-filteric.json`;
    return this.http.post(url, params).map(res => res as ICustomersTotal);
  }

  getCustomersWithObservable(): Observable<Customer[]> {
    const getUrl = `${this.url}.json`;
    return this.http.get(getUrl).map((res: any) => res.customers as Customer[]);
  }

  getCustomer(id: Number): Observable<CustomerDebt> {
    const getUrl = `${this.url}/${id}.json`;
    return this.http
      .get(getUrl)
      .map((res: any) => res.customer as CustomerDebt);
  }

  deleteCustomer(customer: Customer): Observable<any> {
    const deleteUrl = `${this.url}/${customer.id}.json`;
    return this.http.delete(deleteUrl);
  }

  updateCustomer(value, id: number): Observable<any> {
    const updateUrl = `${this.url}/${id}.json`;
    value = this.changeParam(value);
    return this.http
      .put(updateUrl, value)
      .map((res: any) => res.customer as any);
  }

  addCustomer(value: any): Observable<Customer> {
    const addUrl = `${this.url}.json`;
    value = this.changeParam(value);
    return this.http
      .post(addUrl, value)
      .map((res: any) => res.customer as Customer);
  }

  changeParam(value: any) {
    let group_ids = value.group_ids;
    value = _.omit(value, "group_ids");
    let result = {
      customer: value,
      group_ids: group_ids
    };
    return result;
  }
}
