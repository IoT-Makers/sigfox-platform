import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnalyticsComponent} from './analytics.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
    data: {
      title: 'Analytics'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule {
}
