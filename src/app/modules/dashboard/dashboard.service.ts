import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

}
