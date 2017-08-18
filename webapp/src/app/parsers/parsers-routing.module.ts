import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParsersComponent } from './parsers.component';

const routes: Routes = [
  {
    path: '',
    component: ParsersComponent,
    data: {
      title: 'Parsers'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParsersRoutingModule {}
