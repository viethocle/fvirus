import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './pages/home/home.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
