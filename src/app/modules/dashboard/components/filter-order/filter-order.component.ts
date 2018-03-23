import { StatusOrder } from './../../order';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

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

  myOptions: IMultiSelectOption[];
  optionsModel: number[];

  status = [ StatusOrder.new, StatusOrder.inprogress, StatusOrder.inprogress, StatusOrder.delivered]

  formStatus: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.myOptions = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ];
    this.formStatus = this.formBuilder.group({
      status: this.formBuilder.array([])
    });
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: 1, per_page: 10 } })
  }

  changeSortedBy(value) {
    const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
    queryParams['sortedBy'] = value;
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: queryParams})
  }

  onChangeStatus(status, isChecked) {
    console.log(status, isChecked);
  }

  onChange(e) {
    console.log(e);
  }





}
