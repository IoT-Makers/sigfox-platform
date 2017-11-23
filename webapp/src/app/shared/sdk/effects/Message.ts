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
import { MessageActionTypes, MessageActions } from '../actions/Message';
import { LoopbackErrorActions } from '../actions/error';
import { MessageApi } from '../services/index';

@Injectable()
export class MessageEffects extends BaseLoopbackEffects {
  @Effect()
  public getDevice$ = this.actions$
    .ofType(MessageActionTypes.GET_DEVICE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getDevice(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new MessageActions.getDeviceSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getDeviceFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(MessageActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new MessageActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganization$ = this.actions$
    .ofType(MessageActionTypes.GET_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getOrganization(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new MessageActions.getOrganizationSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public putMessage$ = this.actions$
    .ofType(MessageActionTypes.PUT_MESSAGE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.putMessage(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.putMessageSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.putMessageFail(error, action.meta)),
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
    @Inject(MessageApi) public message: MessageApi
  ) {
    super(actions$, message, 'Message', MessageActionTypes, MessageActions);
  }
}
