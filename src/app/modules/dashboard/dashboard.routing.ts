import { Routes } from "@angular/router";

import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { KanbanComponent } from './components/kanban/kanban.component';
export const DashboardRoutes: Routes = [
  {
    path: "",
    component: KanbanComponent
  }
];
