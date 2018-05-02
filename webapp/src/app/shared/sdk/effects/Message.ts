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
  public putSigfox_OldToRemove$ = this.actions$
    .ofType(MessageActionTypes.PUT_SIGFOX__OLD_TO_REMOVE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.putSigfox_OldToRemove(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.putSigfox_OldToRemoveSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.putSigfox_OldToRemoveFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public putSigfox$ = this.actions$
    .ofType(MessageActionTypes.PUT_SIGFOX).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.putSigfox(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.putSigfoxSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.putSigfoxFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public putSigfoxAcknowledge$ = this.actions$
    .ofType(MessageActionTypes.PUT_SIGFOX_ACKNOWLEDGE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.putSigfoxAcknowledge(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.putSigfoxAcknowledgeSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.putSigfoxAcknowledgeFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public postSigfoxStatus$ = this.actions$
    .ofType(MessageActionTypes.POST_SIGFOX_STATUS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.postSigfoxStatus(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.postSigfoxStatusSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.postSigfoxStatusFail(error, action.meta)),
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
