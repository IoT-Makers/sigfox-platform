import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomDashboardComponent} from './custom-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CustomDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomDashboardRoutingModule {
}
