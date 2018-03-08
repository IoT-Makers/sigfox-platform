/* tslint:disable */
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {concat} from 'rxjs/observable/concat';
import {Inject, Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';

import {LoopbackAction} from '../models/BaseModels';
import {BaseLoopbackEffects} from './base';
import {MessageActions, MessageActionTypes} from '../actions/Message';
import {LoopbackErrorActions} from '../actions/error';
import {MessageApi} from '../services/index';

@Injectable()
export class MessageEffects extends BaseLoopbackEffects {
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

  @Effect()
  public createSigfox$ = this.actions$
    .ofType(MessageActionTypes.CREATE_SIGFOX).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createSigfox(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.createSigfoxSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.createSigfoxFail(error, action.meta)),
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
