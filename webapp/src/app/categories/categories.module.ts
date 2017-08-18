import { NgModule } from '@angular/core';

import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  imports: [
    CategoriesRoutingModule
  ],
  declarations: [ CategoriesComponent ]
})
export class CategoriesModule { }
