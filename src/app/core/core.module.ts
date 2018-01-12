import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../modules/layout/sidebar.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [SidebarService]
})
export class CoreModule { }
