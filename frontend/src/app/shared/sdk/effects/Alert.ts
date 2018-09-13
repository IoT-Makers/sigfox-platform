/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { AlertActionTypes, AlertActions } from '../actions/Alert';
import { LoopbackErrorActions } from '../actions/error';
import { AlertApi } from '../services/index';

@Injectable()
export class AlertEffects extends BaseLoopbackEffects {
  @Effect()
  public getDevice$ = this.actions$
    .ofType(AlertActionTypes.GET_DEVICE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.getDevice(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new AlertActions.getDeviceSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertActions.getDeviceFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(AlertActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new AlertActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganization$ = this.actions$
    .ofType(AlertActionTypes.GET_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.getOrganization(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new AlertActions.getOrganizationSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertActions.getOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getConnector$ = this.actions$
    .ofType(AlertActionTypes.GET_CONNECTOR).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.getConnector(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Connector', 'findSuccess'),
            of(new AlertActions.getConnectorSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertActions.getConnectorFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public triggerByDevice$ = this.actions$
    .ofType(AlertActionTypes.TRIGGER_BY_DEVICE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.triggerByDevice(action.payload.data_parsed, action.payload.device, action.payload.req).pipe(
          map((response: any) => new AlertActions.triggerByDeviceSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AlertActions.triggerByDeviceFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public triggerBySigfoxGeoloc$ = this.actions$
    .ofType(AlertActionTypes.TRIGGER_BY_SIGFOX_GEOLOC).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.triggerBySigfoxGeoloc(action.payload.lat, action.payload.lng, action.payload.deviceId, action.payload.req).pipe(
          map((response: any) => new AlertActions.triggerBySigfoxGeolocSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AlertActions.triggerBySigfoxGeolocFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public test$ = this.actions$
    .ofType(AlertActionTypes.TEST).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alert.test(action.payload.alertId, action.payload.req).pipe(
          map((response: any) => new AlertActions.testSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AlertActions.testFail(error, action.meta)),
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
    @Inject(AlertApi) public alert: AlertApi
  ) {
    super(actions$, alert, 'Alert', AlertActionTypes, AlertActions);
  }
}
