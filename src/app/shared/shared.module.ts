import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputFieldComponent } from './components/';
import { ClickOutsideModule } from "ng-click-outside";
import { DragulaModule } from "ng2-dragula";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    DragulaModule
  ],
  exports: [ClickOutsideModule],
  declarations: [InputFieldComponent]
})
export class SharedModule {}
