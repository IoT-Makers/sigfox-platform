import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {SDKBrowserModule} from './shared/sdk';
import {RealtimeModule} from './shared/realtime/realtime.module';
import {Angulartics2Module} from 'angulartics2';
import {environment} from '../../environments/environment';
import {AuthGuard} from './_guards/auth.guard';
import {AdminGuard} from './_guards/admin.guard';
import {DashboardGuard} from './_guards/dashboard.guard';
import {OrganizationGuard} from './_guards/organization.guard';
import {AgmCoreModule} from "@agm/core";

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        RealtimeModule.forRoot({
            primusURL: environment.primusUrl || 'http://localhost:2333'
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE',
            libraries: ['places']
        }),
        SDKBrowserModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        Angulartics2Module.forRoot()
    ],
    providers: [
        AuthGuard,
        AdminGuard,
        DashboardGuard,
        OrganizationGuard,/*
        OrganizationGuard,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }*/
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
