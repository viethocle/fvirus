import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputFieldComponent } from './components/';
import { ClickOutsideModule } from "ng-click-outside";
import { BsModalModule }       from "ng2-bs3-modal";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BsModalModule,
    TranslateModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    InputFieldComponent,
    BsModalModule,
    TranslateModule
  ],
})
export class SharedModule { }
