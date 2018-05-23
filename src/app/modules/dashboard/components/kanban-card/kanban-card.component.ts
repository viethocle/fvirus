import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../order';
import { BsmodalService } from '@core/services/bsmodal.service';
@Component({
  selector: 'kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {

  @Input() order: Order;

  constructor(
    private bsmodalService: BsmodalService
  ) { }

  ngOnInit() {

  }
  openDetailModal(order: Order) {
    this.bsmodalService.selectOrderToView(order);
  }
}
