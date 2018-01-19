import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputFieldComponent, ErrorLabelComponent, ErrorMessagesPipe } from './components/';
import { ClickOutsideModule } from "ng-click-outside";
import { DragulaModule } from "ng2-dragula";
import { BsModalModule }       from "ng2-bs3-modal";
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    InputFieldComponent,
    ErrorLabelComponent,
    ErrorMessagesPipe,
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
    DragulaModule,
    InputFieldComponent,
    ErrorLabelComponent,
    BsModalModule,
    TranslateModule,
    NgxPaginationModule
  ],
})
export class SharedModule {}
