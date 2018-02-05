import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Order } from './order';
import { DataOrder } from './data-order';
import * as ActionCable from 'actioncable';


export interface IOrdersPaginate {
  total: number,
  orders: Order[]
}

@Injectable()
export class DashboardService  {

  private cable: ActionCable.Cable;
  private subscription: ActionCable.Channel;

  orderChange = new BehaviorSubject<DataOrder>(null);

  readonly baseUrl = environment.baseUrl + '/orders.json';

  constructor(
    private http: HttpClient
  ) {
    this.setConnect();
  }


  /** GET all orders */

  getOrders(): Observable<Order[]> {
    // return this.http.get(this.baseUrl)
    //            .map((res: any) => res.orders as Order[]);
    let date = new Date().toString();
    const ordersMock: Order[] = [
      { id: 1, description: "Order 1", customer: "Binh", status: "closed", dueDate: date },
      { id: 2, description: "Order 2", customer: "Thuan", status: "new", dueDate: date },
      { id: 3, description: "Order 3", customer: "Hoc", status: "new", dueDate: date },
      { id: 4, description: "Order 4", customer: "Minh", status: "new", dueDate: date },
      { id: 5, description: "Order 5", customer: "Thuan", status: "inprogress", dueDate: date },
      { id: 6, description: "Order 6", customer: "Hoc", status: "inprogress", dueDate: date },
      { id: 7, description: "Order 7", customer: "Binh", status: "ready", dueDate: date },
      { id: 8, description: "Order 8", customer: "Thanh", status: "ready", dueDate: date },
      { id: 9, description: "Order 9", customer: "Hoc", status: "ready", dueDate: date },
      { id: 10, description: "Order 10", customer: "Binh", status: "inprogress", dueDate: date },
      { id: 11, description: "Order 11", customer: "Hoc", status: "closed", dueDate: date }
    ];
    return Observable.of(ordersMock);
  }

  /** GET orders with pagination */

  getOrdersWithPagination(page: number): Observable<IOrdersPaginate> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get<IOrdersPaginate>(this.baseUrl, { params: params } );
  }
  getOrdersWithPaginationMock(page: number): Observable<Order[]> {
    return this.getOrders();
  }

  /** POST new order */
  createOrder(value): Observable<Order> {
    // let params = new HttpParams().set('description', value.description
    console.log(value);
    return this.http.post(this.baseUrl, value)
               .map((res: any) => res.order as Order);
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
  private handleError<T> (operation = 'operation', result?: T) {
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
