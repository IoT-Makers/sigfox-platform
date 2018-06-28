import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BeaconsComponent} from './beacons.component';

const routes: Routes = [
  {
    path: '',
    component: BeaconsComponent,
    data: {
      title: 'Beacons'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeaconsRoutingModule {
}
