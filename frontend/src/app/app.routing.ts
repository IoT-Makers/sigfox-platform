import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {AuthGuard} from './_guards/auth.guard';
import {AdminGuard} from './_guards/admin.guard';
import {DashboardGuard} from './_guards/dashboard.guard';
import {OrganizationGuard} from './_guards/organization.guard';

export const routes: Routes = [
  {path: 'login', loadChildren: './pages/user/login/login.module#LoginModule'},
  {path: 'register', loadChildren: './pages/user/register/register.module#RegisterModule'},
  {
    path: '',
    canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {path: '', loadChildren: './pages/overview/overview.module#OverviewModule'},

      {path: 'demo', loadChildren: './pages/demo/demo.module#DemoModule'},

      {path: 'dashboard/:id', canActivate: [DashboardGuard], loadChildren: './pages/dashboard/custom-dashboard.module#CustomDashboardModule'},

      {path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule'},
      {path: 'devices', loadChildren: './pages/devices/devices.module#DevicesModule'},
      {path: 'alerts', loadChildren: './pages/alerts/alerts.module#AlertsModule'},
      {path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule'},
      {path: 'messages/:id', loadChildren: './pages/messages/messages.module#MessagesModule'},

      {path: 'profile', loadChildren: './pages/user/profile/profile.module#ProfileModule'},

      {path: 'api', loadChildren: './pages/api/api.module#ApiModule'},
      {path: 'parsers', loadChildren: './pages/parsers/parsers.module#ParsersModule'},
      {path: 'connectors', loadChildren: './pages/connectors/connectors.module#ConnectorsModule'},
      {path: 'beacons', loadChildren: './pages/beacons/beacons.module#BeaconsModule'},

      {path: 'admin', canActivate: [AdminGuard], loadChildren: './pages/admin/admin.module#AdminModule'}
    ]
  },
  {
    path: 'organization/:id',
    canActivate: [AuthGuard, OrganizationGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Organization'
    },
    children: [
      {path: '', loadChildren: './pages/overview/overview.module#OverviewModule'},

      {path: 'dashboard/:id', loadChildren: './pages/dashboard/custom-dashboard.module#CustomDashboardModule'},

      {path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule'},
      {path: 'devices', loadChildren: './pages/devices/devices.module#DevicesModule'},
      {path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule'},
      {path: 'messages/:id', loadChildren: './pages/messages/messages.module#MessagesModule'}
    ]
  },
  {path: 'not-found', loadChildren: './pages/not-found/not-found.module#NotFoundModule'},
  {path: '**', redirectTo: 'not-found'}/*,
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes
      /*, { enableTracing: true }*/
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
