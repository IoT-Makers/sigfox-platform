/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { BeaconActionTypes, BeaconActions } from '../actions/Beacon';
import { LoopbackErrorActions } from '../actions/error';
import { BeaconApi } from '../services/index';

@Injectable()
export class BeaconEffects extends BaseLoopbackEffects {
  @Effect()
  public getUser$ = this.actions$
    .ofType(BeaconActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.beacon.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new BeaconActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new BeaconActions.getUserFail(error, action.meta)),
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
    @Inject(BeaconApi) public beacon: BeaconApi
  ) {
    super(actions$, beacon, 'Beacon', BeaconActionTypes, BeaconActions);
  }
}
