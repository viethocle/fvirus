import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputFieldComponent, ErrorLabelComponent, ErrorMessagesPipe } from './components/';
import { ClickOutsideModule } from "ng-click-outside";
import { BsModalModule } from "ng2-bs3-modal";
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewPipe } from './pipes/new.pipe';
import { InprogressPipe } from './pipes/inprogress.pipe';
import { ReadyPipe } from './pipes/ready.pipe';
import { ClosedPipe } from './pipes/delivered.pipe';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { DatePipe } from "@angular/common";
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { DateTimeViPipe } from './pipes/date-time-vi.pipe';
import { MatchHeightDirective } from './directives/match-height.directive';
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";
import { ToastrService } from "./toastr.service";
import { MySearchPipe } from './pipes/my-search.pipe';
import { TooltipModule }       from 'ngx-tooltip';
import { TruncateDescriptionPipe } from './pipes/truncate-description.pipe';
import { VndPipe } from './pipes/vnd.pipe';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';
import { ColorOrderComponent } from './components/color-order/color-order.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NumericDirective } from './directives/numeric.directive';
import { TextMaskModule } from 'angular2-text-mask'
import { NgxPermissionsModule } from 'ngx-permissions';

export class CustomOption extends ToastOptions {
  animate = "flyRight"; // you can pass any options to override defaults
  newestOnTop = false;
  showCloseButton = true;
  dismiss = "auto";
  timeOut = 2000;
  positionClass = "toast-top-right";
}

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
    ClosedPipe,
    DateTimeViPipe,
    MySearchPipe,
    TruncateDescriptionPipe,
    VndPipe,
    SortableColumnComponent,
    ColorOrderComponent,
    NumericDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BsModalModule,
    TranslateModule,
    ToastModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    InputFieldComponent,
    ErrorLabelComponent,
    BsModalModule,
    TooltipModule,
    TranslateModule,
    NgxPaginationModule,
    NewPipe,
    InprogressPipe,
    ReadyPipe,
    ClosedPipe,
    MySearchPipe,
    PerfectScrollbarModule,
    DatePipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DateTimeViPipe,
    TruncateDescriptionPipe,
    VndPipe,
    MultiselectDropdownModule,
    SortableColumnComponent,
    ColorOrderComponent,
    MyDatePickerModule,
    TextMaskModule,
    NumericDirective
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomOption },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: OWL_DATE_TIME_LOCALE,
      useValue: 'vi' },
    DatePipe,
    ToastrService
  ]
})
export class SharedModule {}
