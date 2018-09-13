/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { UserActionTypes, UserActions } from '../actions/User';
import { LoopbackErrorActions } from '../actions/error';
import { UserApi } from '../services/index';

@Injectable()
export class UserEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdAccessTokens$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdAccessTokens(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'AccessToken', 'findByIdSuccess'),
            of(new UserActions.findByIdAccessTokensSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAccessTokens$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdAccessTokens(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'AccessToken', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdAccessTokensSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAccessTokens$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdAccessTokens(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'AccessToken', 'findByIdSuccess'),
            of(new UserActions.updateByIdAccessTokensSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdRoles$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdRoles(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Role', 'RoleMapping', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Role', 'findByIdSuccess'),
            of(new UserActions.findByIdRolesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdRoles$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdRoles(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Role', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdRolesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdRoles$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdRoles(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Role', 'RoleMapping', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Role', 'findByIdSuccess'),
            of(new UserActions.updateByIdRolesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkRoles$ = this.actions$
    .ofType(UserActionTypes.LINK_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.linkRoles(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['RoleMappingActions'].createSuccess(response, action.meta)),
                    of(new UserActions.linkRolesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new UserActions.linkRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkRoles$ = this.actions$
    .ofType(UserActionTypes.UNLINK_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.unlinkRoles(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['RoleMappingActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new UserActions.unlinkRolesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new UserActions.unlinkRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdDashboards$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdDashboards(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Dashboard', 'findByIdSuccess'),
            of(new UserActions.findByIdDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdDashboards$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdDashboards(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Dashboard', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdDashboards$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdDashboards(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Dashboard', 'findByIdSuccess'),
            of(new UserActions.updateByIdDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdCategories$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
            of(new UserActions.findByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdCategories$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdCategories$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdCategories(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
            of(new UserActions.updateByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdDevices$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new UserActions.findByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdDevices$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdDevices$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdDevices(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new UserActions.updateByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdMessages$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new UserActions.findByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdMessages$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdMessages$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdMessages(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new UserActions.updateByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdGeolocs$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdGeolocs(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Geoloc', 'findByIdSuccess'),
            of(new UserActions.findByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdGeolocs$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdGeolocs(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdGeolocs$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdGeolocs(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Geoloc', 'findByIdSuccess'),
            of(new UserActions.updateByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdParsers$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdParsers(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Parser', 'findByIdSuccess'),
            of(new UserActions.findByIdParsersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdParsers$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdParsers(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Parser', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdParsersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdParsers$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdParsers(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Parser', 'findByIdSuccess'),
            of(new UserActions.updateByIdParsersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdOrganizations$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'Organizationuser', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new UserActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdOrganizations$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdOrganizations$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'Organizationuser', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new UserActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkOrganizations$ = this.actions$
    .ofType(UserActionTypes.LINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.linkOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationuserActions'].createSuccess(response, action.meta)),
                    of(new UserActions.linkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new UserActions.linkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkOrganizations$ = this.actions$
    .ofType(UserActionTypes.UNLINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.unlinkOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationuserActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new UserActions.unlinkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new UserActions.unlinkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdAlerts$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdAlerts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Alert', 'findByIdSuccess'),
            of(new UserActions.findByIdAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAlerts$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdAlerts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAlerts$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdAlerts(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Alert', 'findByIdSuccess'),
            of(new UserActions.updateByIdAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdConnectors$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdConnectors(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Connector', 'findByIdSuccess'),
            of(new UserActions.findByIdConnectorsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdConnectors$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdConnectors(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Connector', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdConnectorsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdConnectors$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdConnectors(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Connector', 'findByIdSuccess'),
            of(new UserActions.updateByIdConnectorsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdWidgets$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdWidgets(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Widget', 'findByIdSuccess'),
            of(new UserActions.findByIdWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdWidgets$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdWidgets(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdWidgets$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdWidgets(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Widget', 'findByIdSuccess'),
            of(new UserActions.updateByIdWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdBeacons$ = this.actions$
    .ofType(UserActionTypes.FIND_BY_ID_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.findByIdBeacons(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Beacon', 'findByIdSuccess'),
            of(new UserActions.findByIdBeaconsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.findByIdBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdBeacons$ = this.actions$
    .ofType(UserActionTypes.DESTROY_BY_ID_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.destroyByIdBeacons(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Beacon', 'deleteByIdSuccess'),
            of(new UserActions.destroyByIdBeaconsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.destroyByIdBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdBeacons$ = this.actions$
    .ofType(UserActionTypes.UPDATE_BY_ID_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.updateByIdBeacons(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Beacon', 'findByIdSuccess'),
            of(new UserActions.updateByIdBeaconsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.updateByIdBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAccessTokens$ = this.actions$
    .ofType(UserActionTypes.GET_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getAccessTokens(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'AccessToken', 'findSuccess'),
            of(new UserActions.getAccessTokensSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAccessTokens$ = this.actions$
    .ofType(UserActionTypes.CREATE_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createAccessTokens(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'AccessToken', 'findSuccess'),
            of(new UserActions.createAccessTokensSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAccessTokens$ = this.actions$
    .ofType(UserActionTypes.DELETE_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteAccessTokens(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteAccessTokensSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getRoles$ = this.actions$
    .ofType(UserActionTypes.GET_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getRoles(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Role', 'RoleMapping', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
            of(new UserActions.getRolesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createRoles$ = this.actions$
    .ofType(UserActionTypes.CREATE_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createRoles(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Role', 'RoleMapping', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
            of(new UserActions.createRolesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteRoles$ = this.actions$
    .ofType(UserActionTypes.DELETE_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteRoles(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteRolesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDashboards$ = this.actions$
    .ofType(UserActionTypes.GET_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getDashboards(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new UserActions.getDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createDashboards$ = this.actions$
    .ofType(UserActionTypes.CREATE_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createDashboards(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new UserActions.createDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDashboards$ = this.actions$
    .ofType(UserActionTypes.DELETE_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteDashboards(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteDashboardsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getCategories$ = this.actions$
    .ofType(UserActionTypes.GET_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getCategories(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new UserActions.getCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createCategories$ = this.actions$
    .ofType(UserActionTypes.CREATE_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createCategories(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new UserActions.createCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteCategories$ = this.actions$
    .ofType(UserActionTypes.DELETE_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteCategories(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteCategoriesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDevices$ = this.actions$
    .ofType(UserActionTypes.GET_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getDevices(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new UserActions.getDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createDevices$ = this.actions$
    .ofType(UserActionTypes.CREATE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new UserActions.createDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDevices$ = this.actions$
    .ofType(UserActionTypes.DELETE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteDevices(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteDevicesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessages$ = this.actions$
    .ofType(UserActionTypes.GET_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getMessages(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new UserActions.getMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createMessages$ = this.actions$
    .ofType(UserActionTypes.CREATE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new UserActions.createMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteMessages$ = this.actions$
    .ofType(UserActionTypes.DELETE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteMessages(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteMessagesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getGeolocs$ = this.actions$
    .ofType(UserActionTypes.GET_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getGeolocs(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new UserActions.getGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createGeolocs$ = this.actions$
    .ofType(UserActionTypes.CREATE_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createGeolocs(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new UserActions.createGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteGeolocs$ = this.actions$
    .ofType(UserActionTypes.DELETE_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteGeolocs(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteGeolocsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getParsers$ = this.actions$
    .ofType(UserActionTypes.GET_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getParsers(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Parser', 'findSuccess'),
            of(new UserActions.getParsersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createParsers$ = this.actions$
    .ofType(UserActionTypes.CREATE_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createParsers(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Parser', 'findSuccess'),
            of(new UserActions.createParsersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteParsers$ = this.actions$
    .ofType(UserActionTypes.DELETE_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteParsers(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteParsersSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganizations$ = this.actions$
    .ofType(UserActionTypes.GET_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getOrganizations(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'Organizationuser', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new UserActions.getOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createOrganizations$ = this.actions$
    .ofType(UserActionTypes.CREATE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'Organizationuser', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new UserActions.createOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteOrganizations$ = this.actions$
    .ofType(UserActionTypes.DELETE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteOrganizations(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteOrganizationsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAlerts$ = this.actions$
    .ofType(UserActionTypes.GET_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getAlerts(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'findSuccess'),
            of(new UserActions.getAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAlerts$ = this.actions$
    .ofType(UserActionTypes.CREATE_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createAlerts(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'findSuccess'),
            of(new UserActions.createAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAlerts$ = this.actions$
    .ofType(UserActionTypes.DELETE_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteAlerts(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteAlertsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getConnectors$ = this.actions$
    .ofType(UserActionTypes.GET_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getConnectors(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Connector', 'findSuccess'),
            of(new UserActions.getConnectorsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createConnectors$ = this.actions$
    .ofType(UserActionTypes.CREATE_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createConnectors(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Connector', 'findSuccess'),
            of(new UserActions.createConnectorsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteConnectors$ = this.actions$
    .ofType(UserActionTypes.DELETE_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteConnectors(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteConnectorsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getWidgets$ = this.actions$
    .ofType(UserActionTypes.GET_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getWidgets(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'findSuccess'),
            of(new UserActions.getWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createWidgets$ = this.actions$
    .ofType(UserActionTypes.CREATE_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createWidgets(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'findSuccess'),
            of(new UserActions.createWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteWidgets$ = this.actions$
    .ofType(UserActionTypes.DELETE_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteWidgets(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteWidgetsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getBeacons$ = this.actions$
    .ofType(UserActionTypes.GET_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.getBeacons(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Beacon', 'findSuccess'),
            of(new UserActions.getBeaconsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.getBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createBeacons$ = this.actions$
    .ofType(UserActionTypes.CREATE_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createBeacons(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Beacon', 'findSuccess'),
            of(new UserActions.createBeaconsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteBeacons$ = this.actions$
    .ofType(UserActionTypes.DELETE_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.deleteBeacons(action.payload.id).pipe(
          map((response: any) => new UserActions.deleteBeaconsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.deleteBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public login$ = this.actions$
    .ofType(UserActionTypes.LOGIN).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.login(action.payload.credentials, action.payload.include).pipe(
          map((response: any) => new UserActions.loginSuccess(response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.loginFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public logout$ = this.actions$
    .ofType(UserActionTypes.LOGOUT).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.logout().pipe(
          map((response: any) => new UserActions.logoutSuccess(action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.logoutFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public verify$ = this.actions$
    .ofType(UserActionTypes.VERIFY).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.verify(action.payload.id).pipe(
          map((response: any) => new UserActions.verifySuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.verifyFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public confirm$ = this.actions$
    .ofType(UserActionTypes.CONFIRM).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.confirm(action.payload.uid, action.payload.token, action.payload.redirect).pipe(
          map((response: any) => new UserActions.confirmSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.confirmFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public resetPassword$ = this.actions$
    .ofType(UserActionTypes.RESET_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.resetPassword(action.payload.options).pipe(
          map((response: any) => new UserActions.resetPasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.resetPasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public changePassword$ = this.actions$
    .ofType(UserActionTypes.CHANGE_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.changePassword(action.payload.oldPassword, action.payload.newPassword).pipe(
          map((response: any) => new UserActions.changePasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.changePasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public setPassword$ = this.actions$
    .ofType(UserActionTypes.SET_PASSWORD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.setPassword(action.payload.newPassword).pipe(
          map((response: any) => new UserActions.setPasswordSuccess(action.payload.id, action.payload.fk, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.setPasswordFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public loginQr$ = this.actions$
    .ofType(UserActionTypes.LOGIN_QR).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.loginQr(action.payload.redirect, action.payload.res).pipe(
          map((response: any) => new UserActions.loginQrSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.loginQrFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAccessTokens$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ACCESSTOKENS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyAccessTokens(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'AccessToken', 'findSuccess'),
            of(new UserActions.createManyAccessTokensSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyAccessTokensFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyRoles$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ROLES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyRoles(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Role', 'RoleMapping', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Role', 'findSuccess'),
            of(new UserActions.createManyRolesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyRolesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyDashboards$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyDashboards(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new UserActions.createManyDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyCategories$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyCategories(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new UserActions.createManyCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyDevices$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new UserActions.createManyDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyMessages$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new UserActions.createManyMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyGeolocs$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyGeolocs(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new UserActions.createManyGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyParsers$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_PARSERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyParsers(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Parser', 'findSuccess'),
            of(new UserActions.createManyParsersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyParsersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyOrganizations$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'Organizationuser', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new UserActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAlerts$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyAlerts(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'findSuccess'),
            of(new UserActions.createManyAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyConnectors$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_CONNECTORS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyConnectors(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Connector', 'findSuccess'),
            of(new UserActions.createManyConnectorsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyConnectorsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyWidgets$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_WIDGETS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyWidgets(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Widget', 'findSuccess'),
            of(new UserActions.createManyWidgetsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyWidgetsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyBeacons$ = this.actions$
    .ofType(UserActionTypes.CREATE_MANY_BEACONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.createManyBeacons(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Beacon', 'findSuccess'),
            of(new UserActions.createManyBeaconsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new UserActions.createManyBeaconsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

    /**
   * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
   * @description
   * User specific actions
   */
  @Effect()
  public signup$ = this.actions$
    .ofType(UserActionTypes.SIGNUP).pipe(
      mergeMap((action: LoopbackAction) =>
        this.user.create(action.payload).pipe(
          map((response: any) => new UserActions.signupSuccess(action.payload, response, action.meta)),
          catchError((error: any) => concat(
            of(new UserActions.signupFail(error, action.meta)),
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
    @Inject(UserApi) public user: UserApi
  ) {
    super(actions$, user, 'User', UserActionTypes, UserActions);
  }
}
