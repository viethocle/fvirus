import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('bagTodo') bagTodo: ElementRef;
  @ViewChild('bagDone') bagDone: ElementRef;

  constructor(
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.setOrders();
    this.setDropModelDragula();
  }


  setDropModelDragula() {
    this.dragulaService.dropModel.subscribe(args => {
      let [bagName, el, target, source] = args;
      console.log('el be dragged: ' + el.dataset.id);
      console.log('Old bag: ' + source.dataset.id);
      console.log('New bag: ' + target.dataset.id);
    })
  }

  setOrders() {
    this.orders = [{ name: 'Dummy One', id: 1 }, { name: 'Dummy Two', id: 2 }, { name: 'Dummy Three', id: 3 }, { name: 'Dummy Four', id: 4 }];
    this.orders2 = [{ name: 'Dummy Five', id: 5 }, { name: 'Dummy Six', id: 6 }, { name: 'Dummy Seven', id: 7 }, { name: 'Dummy Eight', id: 8 }];
  }

}
