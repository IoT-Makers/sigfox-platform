import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LoopBackConfig } from './app/shared/sdk';

import { Router } from '@angular/router';

let router : Router;

/*LoopBackConfig.setBaseURL(environment.apiUrl);*/
LoopBackConfig.setBaseURL(router.url);
LoopBackConfig.setApiVersion(environment.apiVersion);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
