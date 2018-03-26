import { DashboardService } from './../../dashboard.service';
import { StatusOrder } from './../../order';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { map, switchMap, tap } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
  styleUrls: ['./filter-order.component.css']
})
export class FilterOrderComponent implements OnInit {

  sortedBy = [
    { key: 'Created at (newest first)',  value: 'created_at_desc'},
    { key: 'Created at (oldest first)',  value: 'created_at_asc'},
    { key: 'Due Date (newest first)',    value: 'due_date_desc'},
    { key: 'Due Date (oldest first)',    value: 'due_date_asc'},
    { key: 'Customer name (a - z)',      value: 'customer_asc'},
    { key: 'Customer name (z - a)',      value: 'customer_desc'},
  ]

  mySettings: IMultiSelectSettings = {
    displayAllSelectedText: true,
    checkedStyle: 'checkboxes',
    containerClasses: 'multiselect-container dropdown-menu'
  };

  myOptions: IMultiSelectOption[];
  optionsModel: number[];

  status = [ StatusOrder.new, StatusOrder.inprogress, StatusOrder.inprogress, StatusOrder.delivered]

  formStatus: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.myOptions = [
      { id: StatusOrder.new, name: StatusOrder.new },
      { id: StatusOrder.inprogress, name: StatusOrder.inprogress },
      { id: StatusOrder.ready, name: StatusOrder.ready },
      { id: StatusOrder.delivered, name: StatusOrder.delivered },
    ];
    this.formStatus = this.formBuilder.group({
      status: this.formBuilder.array([])
    });

    this.setChangeRoute();

    this.formStatus.valueChanges 
        .pipe(
          map(selectOptions => '(' + selectOptions.joins(',') + ')')
        )
        .subscribe((selectOptions) => {
          console.log(selectOptions);
        })
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: 1, per_page: 10 } })
  }

  setChangeRoute() {
    this.route.queryParams
        .pipe(
          map(params => { 
            let pagination = {
              pagination:
              { page: params.page, per_page: params.per_page }
            }
            return _.assign(pagination, params); 
          }),
          switchMap(params => this.dashboardService.getOrderFilter(params))
        )
        .subscribe(param => {
          console.log(param);
        })
  }

  changeSortedBy(value) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['sorted_by'] = value;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams})
  }

  onChangeStatus(status, isChecked) {
    console.log(status, isChecked);
  }

  onChange(selectOptions) {
    selectOptions = _.map(selectOptions, e => '"' + e + '"');
    let statusParam = '(' + _.join(selectOptions, ',') + ')';
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['status'] = statusParam;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })
  }





}
