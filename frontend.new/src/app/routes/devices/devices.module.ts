import {NgModule} from '@angular/core';
import {DevicesComponent} from './devices/devices.component';
import {DataFilterPipe} from './devices/datafilterpipe';
import {ClickCopyDirective} from './devices/click-copy.directive';
import {SharedModule} from "../../shared/shared.module";
import {AgmCoreModule} from "@agm/core";
import {MomentModule} from "angular2-moment";
import {DataTableModule} from "angular2-datatable";
import {RouterModule, Routes} from "@angular/router";
import {TrackingComponent} from "./tracking/tracking.component";
import {DeviceComponent} from "./device/device.component";
import {LaddaModule} from "angular2-ladda";

const routes: Routes = [
    {path: '', component: DevicesComponent},
    {path: ':id', component: DeviceComponent},
    {path: ':id/tracking', component: TrackingComponent}
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule,
        MomentModule,
        DataTableModule,
        LaddaModule
    ],
    declarations: [
        DevicesComponent,
        DeviceComponent,
        TrackingComponent,
        DataFilterPipe,
        ClickCopyDirective
    ],
    exports: [
        RouterModule
    ]
})
export class DevicesModule {
}
