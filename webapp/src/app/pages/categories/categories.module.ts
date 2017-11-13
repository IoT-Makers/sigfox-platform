import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import { MomentModule } from 'angular2-moment';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';


@NgModule({
  imports: [
    CategoriesRoutingModule,
    CommonModule,
    MomentModule
  ],
  declarations: [ CategoriesComponent ]
})
export class CategoriesModule { }
