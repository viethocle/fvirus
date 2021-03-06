import { VndPipe } from './../shared/pipes/vnd.pipe';
import { NgxPermissionsService } from 'ngx-permissions';
import { SortTableService } from './services/sort-table.service';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { CustomerService } from './../modules/customer/customer.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../modules/layout/sidebar.service';
import { DashboardService } from '@modules/dashboard/dashboard.service';
import { DragulaService } from 'ng2-dragula';
import { AuthService } from '@modules/auth/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  AdminRouteGuard,
  LoggedInGuard,
  LogoutGuard,
  CustomerGuard
} from "./guard/";
import { BsmodalService } from './services/bsmodal.service';
import { GroupsService } from '../modules/customer/groups.service';
import { QuoteService } from '../modules/quote-price/quote.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SidebarService,
    DashboardService,
    AuthService,
    LoggedInGuard,
    AdminRouteGuard,
    LogoutGuard,
    CustomerGuard,
    CustomerService,
    Ng2SearchPipe,
    BsmodalService,
    SortTableService,
    VndPipe,
    GroupsService,
    QuoteService
    // NgxPermissionsService
  ]
})
export class CoreModule { }
