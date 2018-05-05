import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotePriceComponent } from '@modules/quote-price/pages/quote-price/quote-price.component';
import { FormQuotePriceComponent } from './components/form-quote-price/form-quote-price.component';

export const routes: Routes = [
  {
    path: "",
    component: QuotePriceComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuotePriceComponent, FormQuotePriceComponent]
})
export class QuotePriceModule { }
