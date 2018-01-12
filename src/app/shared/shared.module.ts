import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputFieldComponent } from './components/';
import { ClickOutsideModule } from "ng-click-outside";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  exports: [
    ClickOutsideModule
  ],
  declarations: [InputFieldComponent]
})
export class SharedModule { }
