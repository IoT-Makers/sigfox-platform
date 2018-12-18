import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview/overview.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {AgmCoreModule} from "@agm/core";
import {MomentModule} from "angular2-moment";
import {NgxGaugeModule} from "ngx-gauge";

const routes: Routes = [
    {path: '', component: OverviewComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule,
        MomentModule,
        NgxGaugeModule
    ],
    declarations: [
        OverviewComponent
    ],
    exports: [
        RouterModule
    ]
})

export class OverviewModule {
}