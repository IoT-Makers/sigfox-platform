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
import { RoleActionTypes, RoleActions } from '../actions/Role';
import { LoopbackErrorActions } from '../actions/error';
import { RoleApi } from '../services/index';

@Injectable()
export class RoleEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdPrincipals$ = this.actions$
    .ofType(RoleActionTypes.FIND_BY_ID_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.findByIdPrincipals(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'RoleMapping', 'findByIdSuccess'),
            of(new RoleActions.findByIdPrincipalsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleActions.findByIdPrincipalsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdPrincipals$ = this.actions$
    .ofType(RoleActionTypes.DESTROY_BY_ID_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.destroyByIdPrincipals(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'RoleMapping', 'deleteByIdSuccess'),
            of(new RoleActions.destroyByIdPrincipalsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleActions.destroyByIdPrincipalsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdPrincipals$ = this.actions$
    .ofType(RoleActionTypes.UPDATE_BY_ID_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.updateByIdPrincipals(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'RoleMapping', 'findByIdSuccess'),
            of(new RoleActions.updateByIdPrincipalsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleActions.updateByIdPrincipalsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getPrincipals$ = this.actions$
    .ofType(RoleActionTypes.GET_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.getPrincipals(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'RoleMapping', 'findSuccess'),
            of(new RoleActions.getPrincipalsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleActions.getPrincipalsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createPrincipals$ = this.actions$
    .ofType(RoleActionTypes.CREATE_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.createPrincipals(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'RoleMapping', 'findSuccess'),
            of(new RoleActions.createPrincipalsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleActions.createPrincipalsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deletePrincipals$ = this.actions$
    .ofType(RoleActionTypes.DELETE_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.deletePrincipals(action.payload.id).pipe(
          map((response: any) => new RoleActions.deletePrincipalsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new RoleActions.deletePrincipalsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyPrincipals$ = this.actions$
    .ofType(RoleActionTypes.CREATE_MANY_PRINCIPALS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.role.createManyPrincipals(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'RoleMapping', 'findSuccess'),
            of(new RoleActions.createManyPrincipalsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new RoleActions.createManyPrincipalsFail(error, action.meta)),
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
    @Inject(RoleApi) public role: RoleApi
  ) {
    super(actions$, role, 'Role', RoleActionTypes, RoleActions);
  }
}
