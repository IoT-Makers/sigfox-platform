import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminGuard } from './_guards/admin.guard';
import { DashboardGuard } from './_guards/dashboard.guard';
import { OrganizationGuard } from './_guards/organization.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/user/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'reset-password',
    loadChildren:
      () => import('./pages/user/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule)
      },

      {
        path: 'dashboard/:id',
        canActivate: [DashboardGuard],
        loadChildren:
          () => import('./pages/dashboard/custom-dashboard.module').then(m => m.CustomDashboardModule)
      },

      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('./pages/devices/devices.module').then(m => m.DevicesModule)
      },
      {
        path: 'devices/:id/tracking',
        loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingModule)
      },
      {
        path: 'alerts',
        loadChildren: () => import('./pages/alerts/alerts.module').then(m => m.AlertsModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'messages/:id',
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule)
      },

      {
        path: 'profile',
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
      },

      { path: 'api', loadChildren: () => import('./pages/api/api.module').then(m => m.ApiModule) },
      {
        path: 'parsers',
        loadChildren: () => import('./pages/parsers/parsers.module').then(m => m.ParsersModule)
      },
      {
        path: 'connectors',
        loadChildren: () => import('./pages/connectors/connectors.module').then(m => m.ConnectorsModule)
      },
      {
        path: 'beacons',
        loadChildren: () => import('./pages/beacons/beacons.module').then(m => m.BeaconsModule)
      },

      {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      }
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
      {
        path: '',
        loadChildren: () => import('./pages/overview/overview.module').then(m => m.OverviewModule)
      },

      {
        path: 'dashboard/:id',
        loadChildren:
          () => import('./pages/dashboard/custom-dashboard.module').then(m => m.CustomDashboardModule)
      },

      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('./pages/devices/devices.module').then(m => m.DevicesModule)
      },
      {
        path: 'devices/:id/tracking',
        loadChildren: () => import('./pages/tracking/tracking.module').then(m => m.TrackingModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule)
      },
      {
        path: 'messages/:id',
        loadChildren: () => import('./pages/messages/messages.module').then(m => m.MessagesModule)
      }
    ]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      /*, { enableTracing: true }*/
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
