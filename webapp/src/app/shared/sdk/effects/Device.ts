/* tslint:disable */
import { map, catchError, mergeMap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver } from './resolver';

import * as actions from '../actions';
import { DeviceActionTypes, DeviceActions } from '../actions/Device';
import { LoopbackErrorActions } from '../actions/error';
import { DeviceApi } from '../services/index';

@Injectable()
export class DeviceEffects extends BaseLoopbackEffects {
  @Effect()
  public download$ = this.actions$
    .ofType(DeviceActionTypes.DOWNLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.download(action.payload.id, action.payload.type, action.payload.req, action.payload.res).pipe(
          map((response: any) => new DeviceActions.downloadSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.downloadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public timeSeries$ = this.actions$
    .ofType(DeviceActionTypes.TIME_SERIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.timeSeries(action.payload.deviceId, action.payload.dateBegin, action.payload.dateEnd, action.payload.req).pipe(
          map((response: any) => new DeviceActions.timeSeriesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.timeSeriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDeviceMessagesAlertsGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_DEVICE_MESSAGES_ALERTS_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.deleteDeviceMessagesAlertsGeolocs(action.payload.deviceId, action.payload.req).pipe(
          map((response: any) => new DeviceActions.deleteDeviceMessagesAlertsGeolocsSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.deleteDeviceMessagesAlertsGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessagesFromSigfoxBackend$ = this.actions$
    .ofType(DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getMessagesFromSigfoxBackend(action.payload.id, action.payload.limit, action.payload.before, action.payload.req).pipe(
          map((response: any) => new DeviceActions.getMessagesFromSigfoxBackendSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.getMessagesFromSigfoxBackendFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * Decorate base effects metadata
   */
  @Effect() public create$;
  @Effect() public createMany$;
  @Effect() public findById$;
  @Effect() public find$;
  @Effect() public findOne$;
  @Effect() public updateAll$;
  @Effect() public deleteById$;
  @Effect() public updateAttributes$;
  @Effect() public upsert$;
  @Effect() public upsertWithWhere$;
  @Effect() public replaceOrCreate$;
  @Effect() public replaceById$;
  @Effect() public patchOrCreate$;
  @Effect() public patchAttributes$;

  constructor(
    @Inject(Actions) public actions$: Actions,
    @Inject(DeviceApi) public device: DeviceApi
  ) {
    super(actions$, device, 'Device', DeviceActionTypes, DeviceActions);
  }
}
