import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TextMaskModule } from 'angular2-text-mask';
import { MyDatePickerModule } from 'mydatepicker';
import { ClickOutsideModule } from 'ng-click-outside';
import { OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BsModalModule } from 'ng2-bs3-modal';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TooltipModule } from 'ngx-tooltip';

import { ErrorLabelComponent, ErrorMessagesPipe, InputFieldComponent } from './components/';
import { ColorOrderComponent } from './components/color-order/color-order.component';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';
import { NumericDirective } from './directives/numeric.directive';
import { DateHumanizePipe } from './pipes/date-humanize.pipe';
import { DateTimeViPipe } from './pipes/date-time-vi.pipe';
import { ClosedPipe } from './pipes/delivered.pipe';
import { InprogressPipe } from './pipes/inprogress.pipe';
import { MySearchPipe } from './pipes/my-search.pipe';
import { NewPipe } from './pipes/new.pipe';
import { ReadyPipe } from './pipes/ready.pipe';
import { TruncateDescriptionPipe } from './pipes/truncate-description.pipe';
import { VndPipe } from './pipes/vnd.pipe';
import { ToastrService } from "./toastr.service";
import { ParseContentOrderPipe } from './pipes/parse-content-order.pipe';

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
    NumericDirective,
    DateHumanizePipe,
    ParseContentOrderPipe
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
    DateHumanizePipe,
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
    NumericDirective,
    ParseContentOrderPipe
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
