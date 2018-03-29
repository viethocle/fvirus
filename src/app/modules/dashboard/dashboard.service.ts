import { IOrdersPaginate } from './dashboard.service';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Order } from './order';
import { DataOrder } from './data-order';
import * as ActionCable from 'actioncable';


export interface IOrdersPaginate {
  total: number,
  orders: Order[],
  page?: number,
  per_page?: number
}

@Injectable()
export class DashboardService {

  private cable: ActionCable.Cable;
  private subscription: ActionCable.Channel;

  orderChange = new Subject<DataOrder>();

  readonly baseUrl = environment.baseUrl + '/orders.json';

  constructor(
    private http: HttpClient
  ) {
    this.setConnect();
  }


  /** GET all orders */

  getOrders(): Observable<Order[]> {
    return this.http.get(this.baseUrl)
      .map((res: any) => res.orders as Order[]);
  }

  /** GET orders with pagination */

  getOrdersWithPagination(page: number): Observable<IOrdersPaginate> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<IOrdersPaginate>(this.baseUrl, { params: params });
  }

  /** POST new order */
  createOrder(value): Observable<Order> {
    // let params = new HttpParams().set('description', value.description
    return this.http.post(this.baseUrl, value)
      .map((res: any) => res.order as Order);
  }

  /** UPDATE status order */
  updateStatusOrder(order_id: string, status_to_change: string): Observable<Order> {
    let url = `${environment.baseUrl}/orders/${order_id}/${status_to_change}.json`;

    return this.http.put(url, {})
      .map((res: any) => res.order as Order);
  }

  /** UPDATE order */
  updateOrder(order_id: string, value): Observable<Order> {
    let url = `${environment.baseUrl}/orders/${order_id}.json`;
    return this.http.put(url, value)
      .map((res: any) => res.order as Order)
  }

  /** DELETE order */
  deleteOrder(order_id) {
    let url = `${environment.baseUrl}/orders/${order_id}.json`;
    return this.http.delete(url);
  }


  getOrderFilter(param: any): Observable<IOrdersPaginate> {
    let url = `${environment.baseUrl}/orders-filteric.json`;
    return this.http.post<IOrdersPaginate>(url, param);
  }


  /** Set Connection */
  setConnect() {
    this.cable = ActionCable.createConsumer(environment.baseUrlSocket);
    this.subscription = this.cable.subscriptions.create("OrdersChannel", {
      connected: this.connected,
      disconnected: this.disconnected,
      received: data => this.received(data)
    });
  }

  private connected() {
    console.log("connected to order channel!");
  }

  private disconnected() {
    console.log("disconnected!");
  }


  private received(data) {
    this.orderChange.next(data as DataOrder);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  }
}
