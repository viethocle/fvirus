import { Routes } from "@angular/router";

import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { KanbanComponent } from './components/kanban/kanban.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { TableOrdersPage } from './pages/table-orders/table-orders.page';
export const DashboardRoutes: Routes = [
  {
    path: "kanban",
    component: DashboardPage
  }, 
  {
    path: "list",
    component: TableOrdersPage
  }
];
