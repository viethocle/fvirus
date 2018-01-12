import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../modules/layout/sidebar.service';
import { DashboardService } from '@modules/dashboard/dashboard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SidebarService,
    DashboardService
  ]
})
export class CoreModule { }
