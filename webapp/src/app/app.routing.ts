import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import {AuthGuard} from './_guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadChildren: './pages/user/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/user/register/register.module#RegisterModule' },
  {
    path: '',
    canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: '', loadChildren: './pages/overview/overview.module#OverviewModule' },

      { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'dashboard/:id', loadChildren: './pages/dashboard/custom-dashboard.module#CustomDashboardModule' },

      { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },
      { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesModule' },
      { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule' },


      { path: 'base-stations', loadChildren: './pages/base-stations/base-stations.module#BaseStationsModule' },
      { path: 'profile', loadChildren: './pages/user/profile/profile.module#ProfileModule' },

      { path: 'demo', loadChildren: './pages/demo/demo.module#DemoModule' },
      { path: 'tracking', loadChildren: './widgets/tracking/tracking.module#TrackingModule' },
      { path: 'analytics', loadChildren: './widgets/analytics/analytics.module#AnalyticsModule' },

      { path: 'parsers', loadChildren: './pages/parsers/parsers.module#ParsersModule' },
      { path: 'connectors', loadChildren: './pages/connectors/connectors.module#ConnectorsModule' }

    ]
  },
  { path: 'not-found', loadChildren: './pages/not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }/*,
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
  imports: [ RouterModule.forRoot(routes
    /*, { enableTracing: true }*/
  ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
