import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../order';
@Component({
  selector: 'kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {

  @Input() order: Order;

  constructor() { }

  ngOnInit() {
  
  }

}
