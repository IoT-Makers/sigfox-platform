/* tslint:disable */
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {concat} from 'rxjs/observable/concat';
import {Inject, Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {LoopbackAction} from '../models/BaseModels';
import {BaseLoopbackEffects} from './base';
import {DeviceActions, DeviceActionTypes} from '../actions/Device';
import {LoopbackErrorActions} from '../actions/error';
import {DeviceApi} from '../services/index';

@Injectable()
export class DeviceEffects extends BaseLoopbackEffects {
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
  public deleteDeviceMessagesAlerts$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_DEVICE_MESSAGES_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.deleteDeviceMessagesAlerts(action.payload.deviceId, action.payload.req).pipe(
          map((response: any) => new DeviceActions.deleteDeviceMessagesAlertsSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.deleteDeviceMessagesAlertsFail(error, action.meta)),
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

  @Effect()
  public parseAllMessages$ = this.actions$
    .ofType(DeviceActionTypes.PARSE_ALL_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.parseAllMessages(action.payload.id, action.payload.req).pipe(
          map((response: any) => new DeviceActions.parseAllMessagesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.parseAllMessagesFail(error, action.meta)),
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
