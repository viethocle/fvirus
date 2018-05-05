import { CustomerService } from './../../../modules/customer/customer.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { distinctUntilChanged, debounceTime, switchMap, tap, map } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject';
import { Customer } from "@modules/customer/customer.model";
import * as _ from 'lodash';
@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchCustomerComponent implements OnInit {

  @Output() selectCustomerOutput = new EventEmitter<String>();

  customers: Customer[] = [];
  customerLoading = false;
  customerTypeahead = new Subject<String>();
  typeToSearchText: string;

  constructor(
    private customerService: CustomerService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.typeToSearchText = "Gõ để tìm kiếm hoặc enter tạo mới";

    this.customerTypeahead.pipe(
      tap(() => this.customerLoading = true),
      distinctUntilChanged(),
      debounceTime(200),
      map(term => { return { 
        page: 1, 
        per_page: 30, 
        search_query: term, 
        show_unactive: false,
        sorted_by: "name_asc" 
      } }),
      switchMap(param => this.customerService.getCustomersWithPage(param))
    ).subscribe(res => {
      this.customers = res.customers;
      this.customerLoading = false;
      this.cd.markForCheck();
    })
  }

  onChange(event) {
    if (_.isNil(event)) {
      this.selectCustomerOutput.next("");
    }
    if (_.isString(event)) {
      this.selectCustomerOutput.next(event);
    }
    if (_.isObject(event)) {
      this.selectCustomerOutput.next(event.name);
    }
  }

}
