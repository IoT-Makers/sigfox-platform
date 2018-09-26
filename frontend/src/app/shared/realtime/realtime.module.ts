import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RealtimeService, RealtimeServiceConfig} from "./realtime.service";


@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [ RealtimeService ]
})
export class RealtimeModule {
  constructor (@Optional() @SkipSelf() parentModule: RealtimeModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: RealtimeServiceConfig): ModuleWithProviders {
    return {
      ngModule: RealtimeModule,
      providers: [
        {provide: RealtimeServiceConfig, useValue: config }
      ]
    };
  }
}
