/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { ReceptionActionTypes, ReceptionActions } from '../actions/Reception';
import { LoopbackErrorActions } from '../actions/error';
import { ReceptionApi } from '../services/index';

@Injectable()
export class ReceptionEffects extends BaseLoopbackEffects {
  @Effect()
  public getBaseStationsByDeviceId$ = this.actions$
    .ofType(ReceptionActionTypes.GET_BASE_STATIONS_BY_DEVICE_ID).pipe(
      mergeMap((action: LoopbackAction) =>
        this.reception.getBaseStationsByDeviceId(action.payload.deviceId, action.payload.time, action.payload.req).pipe(
          map((response: any) => new ReceptionActions.getBaseStationsByDeviceIdSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new ReceptionActions.getBaseStationsByDeviceIdFail(error, action.meta)),
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
    @Inject(ReceptionApi) public reception: ReceptionApi
  ) {
    super(actions$, reception, 'Reception', ReceptionActionTypes, ReceptionActions);
  }
}
