import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { AuthService } from '../../auth/auth.service';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: "[navbar]",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  username: string;
  @ViewChild("button_sidebar") btnSidebar: ElementRef;
  status = false; // true mean open sidebar

  constructor(
    public authService: Angular2TokenService,
    private authSvc: AuthService,
    private sideSvc: SidebarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sideSvc.clickOutSide.subscribe(res => {
      if (this.btnSidebar.nativeElement.classList.contains("display")) {
        let el: HTMLElement = this.btnSidebar.nativeElement as HTMLElement;
        el.click();
      }
    });
  }

  ngAfterViewInit() {
    this.getUsername();
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (this.btnSidebar.nativeElement.classList.contains("display")) {
          let el: HTMLElement = this.btnSidebar.nativeElement as HTMLElement;
          el.click();
        }
      }
    });
  }

  toogleBtnSidebar() {
    this.status = !this.status;
  }

  getUsername(): string {
    if (this.authService.currentUserData) {
      return this.authService.currentUserData.name;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.userSignedIn();
  }

  isLoggedOut(): boolean {
    return !this.authService.userSignedIn();
  }

  logOut() {
    this.authSvc.logOut();
  }
}
