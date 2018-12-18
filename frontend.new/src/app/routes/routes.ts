import {LayoutComponent} from '../layout/layout.component';
import {AuthGuard} from '../_guards/auth.guard';
import {DashboardGuard} from '../_guards/dashboard.guard';
import {AdminGuard} from '../_guards/admin.guard';
import {OrganizationGuard} from '../_guards/organization.guard';
import {NotFoundComponent} from "./not-found/not-found/not-found.component";
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./register/register/register.component";
import {RecoverComponent} from "./recover/recover/recover.component";

export const routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: LayoutComponent,
        children: [
            {path: '', redirectTo: 'overview', pathMatch: 'full'},
            {path: 'overview', loadChildren: './overview/overview.module#OverviewModule'},

            {path: 'demo', loadChildren: './demo/demo.module#DemoModule'},
            {
                path: 'dashboard/:id',
                canActivate: [DashboardGuard],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'},
            {path: 'devices', loadChildren: './devices/devices.module#DevicesModule'},
            {path: 'devices/:id/tracking', loadChildren: './tracking/tracking.module#TrackingModule'},
            {path: 'alerts', loadChildren: './alerts/alerts.module#AlertsModule'},
            {path: 'messages', loadChildren: './messages/messages.module#MessagesModule'},
            {path: 'messages/:id', loadChildren: './messages/messages.module#MessagesModule'},

            {path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},

            {path: 'api', loadChildren: './api/api.module#ApiModule'},
            {path: 'parsers', loadChildren: './parsers/parsers.module#ParsersModule'},
            {path: 'connectors', loadChildren: './connectors/connectors.module#ConnectorsModule'},
            {path: 'beacons', loadChildren: './beacons/beacons.module#BeaconsModule'},

            {path: 'admin', canActivate: [AdminGuard], loadChildren: './admin/admin.module#AdminModule'}
        ]
    },
    {
        path: 'organization/:id',
        canActivate: [AuthGuard, OrganizationGuard],
        component: LayoutComponent,
        data: {
            title: 'Organization'
        },
        children: [
            {path: '', loadChildren: './overview/overview.module#OverviewModule'},

            {path: 'dashboard/:id', loadChildren: './dashboard/custom-dashboard.module#CustomDashboardModule'},

            {path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'},
            {path: 'devices', loadChildren: './devices/devices.module#DevicesModule'},
            {path: 'devices/:id/tracking', loadChildren: './tracking/tracking.module#TrackingModule'},
            {path: 'messages', loadChildren: './messages/messages.module#MessagesModule'},
            {path: 'messages/:id', loadChildren: './messages/messages.module#MessagesModule'}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'recover', component: RecoverComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found'}
];
