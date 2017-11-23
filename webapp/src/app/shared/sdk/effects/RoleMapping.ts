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
import { RoleMappingActionTypes, RoleMappingActions } from '../actions/RoleMapping';
import { LoopbackErrorActions } from '../actions/error';
import { RoleMappingApi } from '../services/index';

@Injectable()
export class RoleMappingEffects extends BaseLoopbackEffects {
  @Effect()
  public getRole$ = this.actions$
    .ofType(RoleMappingActionTypes.GET_ROLE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.rolemapping.getRole(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
            of(new RoleMappingActions.getRoleSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleMappingActions.getRoleFail(error, action.meta)),
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
    @Inject(RoleMappingApi) public rolemapping: RoleMappingApi
  ) {
    super(actions$, rolemapping, 'RoleMapping', RoleMappingActionTypes, RoleMappingActions);
  }
}
