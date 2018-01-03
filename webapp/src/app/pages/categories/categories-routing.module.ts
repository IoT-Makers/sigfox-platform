import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CategoriesComponent} from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: {
      title: 'Categories'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
