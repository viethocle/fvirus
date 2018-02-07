import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from "@core/core.module";

import { AppComponent } from './app.component';
import { SidebarComponent } from './modules/layout/sidebar/sidebar.component';
import { NavbarComponent } from './modules/layout/navbar/navbar.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { CustomerComponent } from './modules/customer/customer.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [HttpClientModule, Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule {}
