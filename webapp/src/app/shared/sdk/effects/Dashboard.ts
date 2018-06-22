/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { DashboardActionTypes, DashboardActions } from '../actions/Dashboard';
import { LoopbackErrorActions } from '../actions/error';
import { DashboardApi } from '../services/index';

@Injectable()
export class DashboardEffects extends BaseLoopbackEffects {
  @Effect()
  public getUser$ = this.actions$
    .ofType(DashboardActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new DashboardActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.FIND_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.findByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDashboard', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new DashboardActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.findByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.DESTROY_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.destroyByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'deleteByIdSuccess'),
            of(new DashboardActions.destroyByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.destroyByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.UPDATE_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDashboard', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new DashboardActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.updateByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.LINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.linkOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDashboardActions'].createSuccess(response, action.meta)),
                    of(new DashboardActions.linkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new DashboardActions.linkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.UNLINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.unlinkOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDashboardActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new DashboardActions.unlinkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new DashboardActions.unlinkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdWidgets$ = this.actions$
    .ofType(DashboardActionTypes.FIND_BY_ID_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.findByIdWidgets(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Widget', 'findByIdSuccess'),
            of(new DashboardActions.findByIdWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.findByIdWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdWidgets$ = this.actions$
    .ofType(DashboardActionTypes.DESTROY_BY_ID_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.destroyByIdWidgets(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'deleteByIdSuccess'),
            of(new DashboardActions.destroyByIdWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.destroyByIdWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdWidgets$ = this.actions$
    .ofType(DashboardActionTypes.UPDATE_BY_ID_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.updateByIdWidgets(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Widget', 'findByIdSuccess'),
            of(new DashboardActions.updateByIdWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.updateByIdWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.GET_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.getOrganizations(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDashboard', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DashboardActions.getOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.getOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.CREATE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.createOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDashboard', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DashboardActions.createOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.createOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.DELETE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.deleteOrganizations(action.payload.id).pipe(
          map((response: any) => new DashboardActions.deleteOrganizationsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new DashboardActions.deleteOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getWidgets$ = this.actions$
    .ofType(DashboardActionTypes.GET_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.getWidgets(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'findSuccess'),
            of(new DashboardActions.getWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.getWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createWidgets$ = this.actions$
    .ofType(DashboardActionTypes.CREATE_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.createWidgets(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'findSuccess'),
            of(new DashboardActions.createWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.createWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteWidgets$ = this.actions$
    .ofType(DashboardActionTypes.DELETE_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.deleteWidgets(action.payload.id).pipe(
          map((response: any) => new DashboardActions.deleteWidgetsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new DashboardActions.deleteWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyOrganizations$ = this.actions$
    .ofType(DashboardActionTypes.CREATE_MANY_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.createManyOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDashboard', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DashboardActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.createManyOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyWidgets$ = this.actions$
    .ofType(DashboardActionTypes.CREATE_MANY_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.dashboard.createManyWidgets(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'findSuccess'),
            of(new DashboardActions.createManyWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DashboardActions.createManyWidgetsFail(error, action.meta)),
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
    @Inject(DashboardApi) public dashboard: DashboardApi
  ) {
    super(actions$, dashboard, 'Dashboard', DashboardActionTypes, DashboardActions);
  }
}
