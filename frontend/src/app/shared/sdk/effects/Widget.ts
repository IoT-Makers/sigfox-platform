/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { WidgetActionTypes, WidgetActions } from '../actions/Widget';
import { LoopbackErrorActions } from '../actions/error';
import { WidgetApi } from '../services/index';

@Injectable()
export class WidgetEffects extends BaseLoopbackEffects {
  @Effect()
  public getUser$ = this.actions$
    .ofType(WidgetActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.widget.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new WidgetActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new WidgetActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDashboard$ = this.actions$
    .ofType(WidgetActionTypes.GET_DASHBOARD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.widget.getDashboard(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new WidgetActions.getDashboardSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new WidgetActions.getDashboardFail(error, action.meta)),
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
    @Inject(WidgetApi) public widget: WidgetApi
  ) {
    super(actions$, widget, 'Widget', WidgetActionTypes, WidgetActions);
  }
}
