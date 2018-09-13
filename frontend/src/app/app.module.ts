import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';
import {AppComponent} from './app.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';
import {AppRoutingModule} from './app.routing';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {SDKBrowserModule} from './shared/sdk/index';
import {AuthGuard} from './_guards/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ToasterModule} from 'angular2-toaster';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {AdminGuard} from './_guards/admin.guard';
import {DashboardGuard} from './_guards/dashboard.guard';
import {OrganizationGuard} from './_guards/organization.guard';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    SDKBrowserModule.forRoot(),
    ToasterModule.forRoot(),
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE',
      libraries: ['places']
    }),
    AngularMultiSelectModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
    //AssetsComponent
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    DashboardGuard,
    OrganizationGuard,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class AppModule {
}
