import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomDashboardRoutingModule} from './custom-dashboard-routing.module';
import {CustomDashboardComponent} from './custom-dashboard.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {SelectModule} from 'ng2-select';
import {ToasterModule} from 'angular2-toaster';
import {AgmCoreModule} from '@agm/core';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import {DataTableModule} from 'angular2-datatable';
import {TooltipModule} from 'ng2-bootstrap';
import {DirectionsDirective} from './directions.directive';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {AngularDateTimePickerModule} from 'vk-custom-angular2-datetimepicker';

@NgModule({
  imports: [
    CommonModule,
    CustomDashboardRoutingModule,
    NgxGaugeModule,
    SelectModule,
    FormsModule,
    ToasterModule,
    DataTableModule,
    MomentModule,
    TooltipModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE'
    }),
    AngularMultiSelectModule,
    AngularDateTimePickerModule
  ],
  declarations: [CustomDashboardComponent, DirectionsDirective]
})
export class CustomDashboardModule {
}
