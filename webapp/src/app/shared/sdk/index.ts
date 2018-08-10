/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { AccessTokenApi } from './services/custom/AccessToken';
import { RoleApi } from './services/custom/Role';
import { DeviceApi } from './services/custom/Device';
import { ParserApi } from './services/custom/Parser';
import { CategoryApi } from './services/custom/Category';
import { MessageApi } from './services/custom/Message';
import { GeolocApi } from './services/custom/Geoloc';
import { AppSettingApi } from './services/custom/AppSetting';
import { DashboardApi } from './services/custom/Dashboard';
import { UserApi } from './services/custom/User';
import { OrganizationApi } from './services/custom/Organization';
import { AlertApi } from './services/custom/Alert';
import { AlertValueApi } from './services/custom/AlertValue';
import { AlertGeofenceApi } from './services/custom/AlertGeofence';
import { AlertHistoryApi } from './services/custom/AlertHistory';
import { ReceptionApi } from './services/custom/Reception';
import { ConnectorApi } from './services/custom/Connector';
import { WidgetApi } from './services/custom/Widget';
import { PropertyApi } from './services/custom/Property';
import { BeaconApi } from './services/custom/Beacon';
import { AlexaApi } from './services/custom/Alexa';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RealTime,
        AccessTokenApi,
        RoleApi,
        DeviceApi,
        ParserApi,
        CategoryApi,
        MessageApi,
        GeolocApi,
        AppSettingApi,
        DashboardApi,
        UserApi,
        OrganizationApi,
        AlertApi,
        AlertValueApi,
        AlertGeofenceApi,
        AlertHistoryApi,
        ReceptionApi,
        ConnectorApi,
        WidgetApi,
        PropertyApi,
        BeaconApi,
        AlexaApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

export * from './actions/index';
export * from './reducers/index';
export * from './state';
export * from './guards/index';
export * from './resolvers/index';
