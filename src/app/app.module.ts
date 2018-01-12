import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AppRoutingModule } from './app.routing';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { NavbarComponent } from './modules/layout/navbar/navbar.component';
import { FooterComponent } from './modules/layout/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
