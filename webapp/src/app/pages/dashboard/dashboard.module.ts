import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {SelectModule} from 'ng2-select';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxGaugeModule,
    SelectModule,
    ToasterModule
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
