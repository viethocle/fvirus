import { takeUntilDestroy, Destroyable } from 'take-until-destroy';
import { SortTableService } from './../../../../core/services/sort-table.service';
import { EventEmitter } from '@angular/core';
import { DashboardService, IOrdersPaginate } from './../../dashboard.service';
import { StatusOrder } from './../../order';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { map, switchMap, tap, debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
import * as moment from 'moment';
import { fromEvent } from "rxjs/observable/fromEvent";

@Destroyable
@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
  styleUrls: ['./filter-order.component.css']
})
export class FilterOrderComponent implements OnInit {
  @Output() listOrderOuput = new EventEmitter<IOrdersPaginate>();

  due_date_begin: Date;
  due_date_end: Date;

  settingsDateTimePicker = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false,
    closeOnSelect: true
  }

  datePickerConfig = {
    locale: 'vi',
    format: "DD-MM-YYYY"
  }

  myOptions: IMultiSelectOption[];
  optionsModel: number[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  status = [ StatusOrder.new, StatusOrder.inprogress, StatusOrder.inprogress, StatusOrder.delivered]

  formStatus: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private sortService: SortTableService
  ) { }

  ngOnInit() {
    this.initDropDownStatus();
    this.setChangeRoute();
    this.onSearchChange();
    this.setChangeSortedBy();
  }

  setChangeSortedBy() {
    this.sortService.columnSorted$
        .pipe(
          takeUntilDestroy(this),
          map(event => event.sortColumn + "_" + event.sortDirection))
        .subscribe(direction => {
          const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
          queryParams['sorted_by'] = direction;
          this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })
        })
  }

  initDropDownStatus() {
    this.dropdownList = [
      { id: StatusOrder.new, itemName: "Mới" },
      { id: StatusOrder.inprogress, itemName: "Trong tiến trình" },
      { id: StatusOrder.ready, itemName: "Sẵn sàng" },
      { id: StatusOrder.delivered, itemName: "Đã giao hàng" },
    ]

    this.dropdownSettings = {
      singleSelection: false,
      text: "Lựa chọn trạng thái",
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      classes: "my-select"
    };

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
        .subscribe(res => {
          this.listOrderOuput.emit(res);
        })
  }


  onDateSelectBegin(e) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    // let date = new Date(this.due_date_begin);
    queryParams['due_date_gte'] = moment(e).toISOString();
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })
  }

  onDateSelectEnd(e) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    // let date = new Date(this.due_date_end);
    queryParams['due_date_lte'] = moment(e).toISOString();
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })
  }

  selectStatus(e) {
    let selectOptions = _.map(this.selectedItems, "id");
    let statusParam = null;
    if (_.size(selectOptions) !== 0) {
      selectOptions = _.map(selectOptions, e => "'" + e + "'");
      statusParam = '(' + _.join(selectOptions, ',') + ')';

    }
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['status'] = statusParam;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })  }

  onSearchChange() {
    const input = document.getElementById('search-order');
    const example = fromEvent(input, 'keyup')
                    .pipe(
                      map((i: any) => i.currentTarget.value),
                      debounceTime(350)
                    )
                    .subscribe(query => {
                      let paramSearch = null;
                      if (query != "") paramSearch = query;
                      const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
                      queryParams['search_query'] = paramSearch;
                      this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams })
                    })
  }

  changeNew(event) {
    console.log(this.due_date_begin);
  }


}
