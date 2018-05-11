import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { QuotePriceComponent } from '@modules/quote-price/pages/quote-price/quote-price.component';
import { FormQuotePriceComponent } from './components/form-quote-price/form-quote-price.component';
import { TemplateQuotePriceComponent } from './components/template-quote-price/template-quote-price.component';
import { quoteDataReducer } from "@modules/quote-price/quote-data";

export const routes: Routes = [
  {
    path: "",
    component: QuotePriceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot(quoteDataReducer)
  ],
  declarations: [QuotePriceComponent, FormQuotePriceComponent, TemplateQuotePriceComponent]
})
export class QuotePriceModule { }
