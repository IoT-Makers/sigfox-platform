import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'devices',
        loadChildren: './devices/devices.module#DevicesModule'
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
    ]
  },
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
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
