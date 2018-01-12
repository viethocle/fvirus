import { Component } from '@angular/core';
import { SidebarService } from "@modules/layout/sidebar.service";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  public userSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(
    private translate: TranslateService,
    private sidebarSvc: SidebarService
  ) {
    // this.authSvc.userSignedIn$.subscribe(data => this.userSignedIn$.next(data));
    // // const lang = localStorage.getItem("lang");
    translate.setDefaultLang("vi");
  }

  private onClickOutSideBar(e) {
    this.sidebarSvc.emitClickOutSide();
  }

  isLoggedIn(): boolean {
    return true;
    // return this.authToken.userSignedIn();
  }
}
