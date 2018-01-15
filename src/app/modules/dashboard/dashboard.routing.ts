import { Routes } from "@angular/router";

import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { KanbanComponent } from './components/kanban/kanban.component';
import { DashboardPage } from './pages/dashboard/dashboard.page';
export const DashboardRoutes: Routes = [
  {
    path: "",
    component: DashboardPage
  }
];
