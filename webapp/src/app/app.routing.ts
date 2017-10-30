import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import {AuthGuard} from "./_guards/auth.guard";

export const routes: Routes = [
  { path: 'login', loadChildren: './pages/user/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './pages/user/register/register.module#RegisterModule' },
  /*{ path: 'not-found', loadChildren: './pages/not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' },*/
  {
    path: '',
    canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesModule' },
      { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },
      { path: 'parsers', loadChildren: './pages/parsers/parsers.module#ParsersModule' },
      { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule' },
      { path: 'base-stations', loadChildren: './pages/base-stations/base-stations.module#BaseStationsModule' },
      { path: 'profile', loadChildren: './pages/user/profile/profile.module#ProfileModule' },
      { path: 'tracking', loadChildren: './pages/tracking/tracking.module#TrackingModule' }
    ]
  }/*,
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
