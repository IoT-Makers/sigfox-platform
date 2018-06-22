/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { AlertHistoryActionTypes, AlertHistoryActions } from '../actions/AlertHistory';
import { LoopbackErrorActions } from '../actions/error';
import { AlertHistoryApi } from '../services/index';

@Injectable()
export class AlertHistoryEffects extends BaseLoopbackEffects {
  @Effect()
  public getDevice$ = this.actions$
    .ofType(AlertHistoryActionTypes.GET_DEVICE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alerthistory.getDevice(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new AlertHistoryActions.getDeviceSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertHistoryActions.getDeviceFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(AlertHistoryActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alerthistory.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new AlertHistoryActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertHistoryActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganization$ = this.actions$
    .ofType(AlertHistoryActionTypes.GET_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alerthistory.getOrganization(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new AlertHistoryActions.getOrganizationSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertHistoryActions.getOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getConnector$ = this.actions$
    .ofType(AlertHistoryActionTypes.GET_CONNECTOR).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alerthistory.getConnector(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Connector', 'findSuccess'),
            of(new AlertHistoryActions.getConnectorSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new AlertHistoryActions.getConnectorFail(error, action.meta)),
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
    @Inject(AlertHistoryApi) public alerthistory: AlertHistoryApi
  ) {
    super(actions$, alerthistory, 'AlertHistory', AlertHistoryActionTypes, AlertHistoryActions);
  }
}
