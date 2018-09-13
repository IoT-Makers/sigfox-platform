/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { AppSettingActionTypes, AppSettingActions } from '../actions/AppSetting';
import { LoopbackErrorActions } from '../actions/error';
import { AppSettingApi } from '../services/index';

@Injectable()
export class AppSettingEffects extends BaseLoopbackEffects {
  @Effect()
  public getVersion$ = this.actions$
    .ofType(AppSettingActionTypes.GET_VERSION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.appsetting.getVersion().pipe(
          map((response: any) => new AppSettingActions.getVersionSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new AppSettingActions.getVersionFail(error, action.meta)),
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
    @Inject(AppSettingApi) public appsetting: AppSettingApi
  ) {
    super(actions$, appsetting, 'AppSetting', AppSettingActionTypes, AppSettingActions);
  }
}
