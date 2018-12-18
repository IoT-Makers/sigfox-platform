import './vendor.ts';
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app';
import {environment} from '../environments/environment';
import {LoopBackConfig} from './app/shared/sdk';

LoopBackConfig.setBaseURL(environment.apiUrl);
LoopBackConfig.setApiVersion(environment.apiVersion);

if (environment.production) {
    enableProdMode();
    window.console.log = function() { }; // Remove all console logs
}

let p = platformBrowserDynamic().bootstrapModule(AppModule);
p.then(() => { (<any>window).appBootstrap && (<any>window).appBootstrap(); });
// .catch(err => console.error(err));
