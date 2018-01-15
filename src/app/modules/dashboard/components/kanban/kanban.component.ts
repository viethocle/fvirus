import { Component, OnInit, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Order } from '../../order';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  orders: Order[];
  orders2: Order[];


  constructor(
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.setOrders();
  }

  setOrders() {
    this.orders = [{ name: 'Dummy One', id: 0 }, { name: 'Dummy Two', id: 1 }, { name: 'Dummy Three', id: 3 }, { name: 'Dummy Four', id: 4 }];
    this.orders2 = [{ name: 'Dummy Five', id: 5 }, { name: 'Dummy Six', id: 6 }, { name: 'Dummy Seven', id: 7 }, { name: 'Dummy Eight', id: 8 }];
  }

}
