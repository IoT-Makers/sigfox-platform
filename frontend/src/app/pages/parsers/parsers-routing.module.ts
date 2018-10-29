import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ParsersComponent} from './parsers.component';

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
export class ParsersRoutingModule {
}
