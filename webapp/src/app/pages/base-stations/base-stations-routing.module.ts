import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BaseStationsComponent} from './base-stations.component';

const routes: Routes = [
  {
    path: '',
    component: BaseStationsComponent,
    data: {
      title: 'BaseStations'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseStationsRoutingModule {
}
