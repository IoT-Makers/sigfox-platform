import { NgModule } from '@angular/core';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CategoriesRoutingModule,
    CommonModule
  ],
  declarations: [ CategoriesComponent ]
})
export class CategoriesModule { }
