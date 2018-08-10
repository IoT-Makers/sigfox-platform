/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { AlexaActionTypes, AlexaActions } from '../actions/Alexa';
import { LoopbackErrorActions } from '../actions/error';
import { AlexaApi } from '../services/index';

@Injectable()
export class AlexaEffects extends BaseLoopbackEffects {
  @Effect()
  public postIntents$ = this.actions$
    .ofType(AlexaActionTypes.POST_INTENTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.alexa.postIntents(action.payload.req, action.payload.body).pipe(
          map((response: any) => new AlexaActions.postIntentsSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AlexaActions.postIntentsFail(error, action.meta)),
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
    @Inject(AlexaApi) public alexa: AlexaApi
  ) {
    super(actions$, alexa, 'Alexa', AlexaActionTypes, AlexaActions);
  }
}
