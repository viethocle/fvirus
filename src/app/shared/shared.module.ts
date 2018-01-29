import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputFieldComponent, ErrorLabelComponent, ErrorMessagesPipe } from './components/';
import { ClickOutsideModule } from "ng-click-outside";
import { DragulaModule } from "ng2-dragula";
import { BsModalModule } from "ng2-bs3-modal";
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewPipe } from './pipes/new.pipe';
import { InprogressPipe } from './pipes/inprogress.pipe';
import { ReadyPipe } from './pipes/ready.pipe';
import { ClosedPipe } from './pipes/closed.pipe';

@NgModule({
  declarations: [
    InputFieldComponent,
    ErrorLabelComponent,
    ErrorMessagesPipe,
    NewPipe,
    InprogressPipe,
    ReadyPipe,
    ClosedPipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BsModalModule,
    TranslateModule
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
    NgxPaginationModule,
    NewPipe,
    InprogressPipe,
    ReadyPipe,
    ClosedPipe
  ]
})
export class SharedModule {}
