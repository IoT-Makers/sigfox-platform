/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { ConnectorActionTypes, ConnectorActions } from '../actions/Connector';
import { LoopbackErrorActions } from '../actions/error';
import { ConnectorApi } from '../services/index';

@Injectable()
export class ConnectorEffects extends BaseLoopbackEffects {
  @Effect()
  public getUser$ = this.actions$
    .ofType(ConnectorActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.connector.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new ConnectorActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ConnectorActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createSigfoxBackendCallbacks$ = this.actions$
    .ofType(ConnectorActionTypes.CREATE_SIGFOX_BACKEND_CALLBACKS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.connector.createSigfoxBackendCallbacks(action.payload.req, action.payload.devicetypeId).pipe(
          map((response: any) => new ConnectorActions.createSigfoxBackendCallbacksSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new ConnectorActions.createSigfoxBackendCallbacksFail(error, action.meta)),
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
    @Inject(ConnectorApi) public connector: ConnectorApi
  ) {
    super(actions$, connector, 'Connector', ConnectorActionTypes, ConnectorActions);
  }
}
