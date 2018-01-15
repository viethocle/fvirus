import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Order } from './order';

@Injectable()
export class DashboardService {

  readonly baseUrl = environment.baseUrl + '/orders.json';

  constructor(
    private http: HttpClient
  ) { }


  /** GET all orders */

  getOrders(): Observable<Order[]> {
    return this.http.get(this.baseUrl)
               .map((res: any) => res.orders as Order[]);
  }

  /** POST new order */
  createOrder(value): Observable<Order> {
    // let params = new HttpParams().set('description', value.description
    return this.http.post(this.baseUrl, value)
               .map((res: any) => res.order as Order);
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
