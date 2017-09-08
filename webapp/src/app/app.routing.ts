import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import {LoginComponent} from "./user/login/login.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {AuthGuard} from "./_guards/auth.guard";
import {DevicesComponent} from "./devices/devices.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    /***
     * TODO: CHECK if loadChildren can be replaced by component for routing simplicity
     */
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'devices',
        loadChildren: './devices/devices.module#DevicesModule',
      },
      {
        path: 'categories',
        loadChildren: './categories/categories.module#CategoriesModule'
      },
      {
        path: 'parsers',
        loadChildren: './parsers/parsers.module#ParsersModule'
      },
      {
        path: 'messages',
        loadChildren: './messages/messages.module#MessagesModule'
      },
      {
        path: 'base-stations',
        loadChildren: './base-stations/base-stations.module#BaseStationsModule'
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
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
