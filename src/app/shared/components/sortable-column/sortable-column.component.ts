import { SortTableService } from './../../../core/services/sort-table.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as classNames from 'classnames';

@Component({
  selector: '[sortable-column]',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.css']
})
export class SortableColumnComponent implements OnInit {
  @HostBinding('class') classes = 'sorting';

  
  constructor(private sortService: SortTableService) { }

  @Input('sortable-column')
  columnName: string;

  @Input('sort-direction')
  sortDirection: string = '';

  private columnSortedSubscription: Subscription;

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.classes = classNames('sorting_' + this.sortDirection);
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  ngOnInit() {
    if (this.sortDirection != '') {
      this.classes = classNames('sorting_' + this.sortDirection);
    }
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName != event.sortColumn) {
        this.classes = 'sorting'
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
