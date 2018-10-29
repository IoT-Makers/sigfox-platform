import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from '../environments/environment';
import {LoopBackConfig} from './app/shared/sdk';

LoopBackConfig.setBaseURL(environment.apiUrl);
LoopBackConfig.setApiVersion(environment.apiVersion);

if (environment.production) {
  enableProdMode();
  window.console.log = function() { }; // Remove all console logs
}

platformBrowserDynamic().bootstrapModule(AppModule);
