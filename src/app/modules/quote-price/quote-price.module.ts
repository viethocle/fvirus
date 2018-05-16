import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { QuotePriceComponent } from '@modules/quote-price/pages/quote-price/quote-price.component';
import { FormQuotePriceComponent } from './components/form-quote-price/form-quote-price.component';
import { TemplateQuotePriceComponent } from './components/template-quote-price/template-quote-price.component';
import { quoteDataReducer } from "@modules/quote-price/quote-data";
import { ListQuotePriceComponent } from './pages/list-quote-price/list-quote-price.component';

export const routes: Routes = [
  {
    path: "",
    component: QuotePriceComponent,
    children: [
      {
        path: "template",
        component: TemplateQuotePriceComponent,
      },
      {
        path: "list",
        component: ListQuotePriceComponent
      },
      {
        path: "",
        component: FormQuotePriceComponent
      }

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({ quoteData: quoteDataReducer})
  ],
  declarations: [QuotePriceComponent, FormQuotePriceComponent, TemplateQuotePriceComponent, ListQuotePriceComponent]
})
export class QuotePriceModule { }
