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
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { DatePipe } from "@angular/common";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    ClosedPipe,
    PerfectScrollbarModule,
    DatePipe
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    DatePipe
  ]
})
export class SharedModule {}
