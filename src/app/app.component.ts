import { Component, ViewContainerRef } from '@angular/core';
import { SidebarService } from "@modules/layout/sidebar.service";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './modules/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import '../assets/js/jquery.dataTables.js';
import '../assets/js/jquery.dataTables.bootstrap.js';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "roll";
  outSidebar = false;
  colorLoading = '#8bc34a'
  public userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(
    private translate: TranslateService,
    private sidebarSvc: SidebarService,
    private authToken: Angular2TokenService,
    private authSvc: AuthService,
    private toastr: ToastsManager,
    vRef: ViewContainerRef
  ) {
    this.authSvc.userSignedIn$.subscribe(data => this.userSignedIn$.next(data));
    this.toastr.setRootViewContainerRef(vRef);
    // const lang = localStorage.getItem("lang");
    translate.setDefaultLang("vi");
  }

  private onClickOutSideBar(e) {
    this.sidebarSvc.emitClickOutSide();
  }

  isLoggedIn(): boolean {
    return this.authToken.userSignedIn();
  }
}
