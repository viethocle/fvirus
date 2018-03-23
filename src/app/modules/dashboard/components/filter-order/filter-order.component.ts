import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { page: 1, per_page: 10 } })
  }



}
