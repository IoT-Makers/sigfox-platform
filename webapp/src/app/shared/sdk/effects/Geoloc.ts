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
import { GeolocActionTypes, GeolocActions } from '../actions/Geoloc';
import { LoopbackErrorActions } from '../actions/error';
import { GeolocApi } from '../services/index';

@Injectable()
export class GeolocEffects extends BaseLoopbackEffects {
  @Effect()
  public createSigfox$ = this.actions$
    .ofType(GeolocActionTypes.CREATE_SIGFOX).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.createSigfox(action.payload.req, action.payload.data).pipe(
          map((response: any) => new GeolocActions.createSigfoxSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new GeolocActions.createSigfoxFail(error, action.meta)),
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
    @Inject(GeolocApi) public geoloc: GeolocApi
  ) {
    super(actions$, geoloc, 'Geoloc', GeolocActionTypes, GeolocActions);
  }
}
