/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { OrganizationActionTypes, OrganizationActions } from '../actions/Organization';
import { LoopbackErrorActions } from '../actions/error';
import { OrganizationApi } from '../services/index';

@Injectable()
export class OrganizationEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdMembers$ = this.actions$
    .ofType(OrganizationActionTypes.FIND_BY_ID_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.findByIdMembers(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'User', 'Organizationuser', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'User', 'findByIdSuccess'),
            of(new OrganizationActions.findByIdMembersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.findByIdMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdMembers$ = this.actions$
    .ofType(OrganizationActionTypes.DESTROY_BY_ID_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.destroyByIdMembers(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'deleteByIdSuccess'),
            of(new OrganizationActions.destroyByIdMembersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.destroyByIdMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdMembers$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE_BY_ID_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.updateByIdMembers(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'User', 'Organizationuser', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'User', 'findByIdSuccess'),
            of(new OrganizationActions.updateByIdMembersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.updateByIdMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkMembers$ = this.actions$
    .ofType(OrganizationActionTypes.LINK_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.linkMembers(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationuserActions'].createSuccess(response, action.meta)),
                    of(new OrganizationActions.linkMembersSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.linkMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkMembers$ = this.actions$
    .ofType(OrganizationActionTypes.UNLINK_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.unlinkMembers(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationuserActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new OrganizationActions.unlinkMembersSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.unlinkMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(OrganizationActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new OrganizationActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdMessages$ = this.actions$
    .ofType(OrganizationActionTypes.FIND_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.findByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Message', 'OrganizationMessage', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new OrganizationActions.findByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.findByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdMessages$ = this.actions$
    .ofType(OrganizationActionTypes.DESTROY_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.destroyByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'deleteByIdSuccess'),
            of(new OrganizationActions.destroyByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.destroyByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdMessages$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.updateByIdMessages(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Message', 'OrganizationMessage', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new OrganizationActions.updateByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.updateByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkMessages$ = this.actions$
    .ofType(OrganizationActionTypes.LINK_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.linkMessages(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationMessageActions'].createSuccess(response, action.meta)),
                    of(new OrganizationActions.linkMessagesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.linkMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkMessages$ = this.actions$
    .ofType(OrganizationActionTypes.UNLINK_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.unlinkMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationMessageActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new OrganizationActions.unlinkMessagesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.unlinkMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdDevices$ = this.actions$
    .ofType(OrganizationActionTypes.FIND_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.findByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Device', 'OrganizationDevice', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new OrganizationActions.findByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.findByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdDevices$ = this.actions$
    .ofType(OrganizationActionTypes.DESTROY_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.destroyByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'deleteByIdSuccess'),
            of(new OrganizationActions.destroyByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.destroyByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdDevices$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.updateByIdDevices(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Device', 'OrganizationDevice', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new OrganizationActions.updateByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.updateByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkDevices$ = this.actions$
    .ofType(OrganizationActionTypes.LINK_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.linkDevices(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDeviceActions'].createSuccess(response, action.meta)),
                    of(new OrganizationActions.linkDevicesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.linkDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkDevices$ = this.actions$
    .ofType(OrganizationActionTypes.UNLINK_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.unlinkDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDeviceActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new OrganizationActions.unlinkDevicesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.unlinkDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdCategories$ = this.actions$
    .ofType(OrganizationActionTypes.FIND_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.findByIdCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Category', 'OrganizationCategory', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
            of(new OrganizationActions.findByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.findByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdCategories$ = this.actions$
    .ofType(OrganizationActionTypes.DESTROY_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.destroyByIdCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'deleteByIdSuccess'),
            of(new OrganizationActions.destroyByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.destroyByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdCategories$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE_BY_ID_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.updateByIdCategories(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Category', 'OrganizationCategory', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Category', 'findByIdSuccess'),
            of(new OrganizationActions.updateByIdCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.updateByIdCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkCategories$ = this.actions$
    .ofType(OrganizationActionTypes.LINK_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.linkCategories(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationCategoryActions'].createSuccess(response, action.meta)),
                    of(new OrganizationActions.linkCategoriesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.linkCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkCategories$ = this.actions$
    .ofType(OrganizationActionTypes.UNLINK_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.unlinkCategories(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationCategoryActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new OrganizationActions.unlinkCategoriesSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.unlinkCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.FIND_BY_ID_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.findByIdDashboards(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Dashboard', 'OrganizationDashboard', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Dashboard', 'findByIdSuccess'),
            of(new OrganizationActions.findByIdDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.findByIdDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.DESTROY_BY_ID_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.destroyByIdDashboards(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Dashboard', 'deleteByIdSuccess'),
            of(new OrganizationActions.destroyByIdDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.destroyByIdDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.UPDATE_BY_ID_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.updateByIdDashboards(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Dashboard', 'OrganizationDashboard', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Dashboard', 'findByIdSuccess'),
            of(new OrganizationActions.updateByIdDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.updateByIdDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.LINK_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.linkDashboards(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDashboardActions'].createSuccess(response, action.meta)),
                    of(new OrganizationActions.linkDashboardsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.linkDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.UNLINK_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.unlinkDashboards(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDashboardActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new OrganizationActions.unlinkDashboardsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new OrganizationActions.unlinkDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMembers$ = this.actions$
    .ofType(OrganizationActionTypes.GET_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getMembers(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'User', 'Organizationuser', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new OrganizationActions.getMembersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.getMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createMembers$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createMembers(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'User', 'Organizationuser', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new OrganizationActions.createMembersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteMembers$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.deleteMembers(action.payload.id).pipe(
          map((response: any) => new OrganizationActions.deleteMembersSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new OrganizationActions.deleteMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessages$ = this.actions$
    .ofType(OrganizationActionTypes.GET_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getMessages(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Message', 'OrganizationMessage', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new OrganizationActions.getMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.getMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createMessages$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Message', 'OrganizationMessage', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new OrganizationActions.createMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteMessages$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.deleteMessages(action.payload.id).pipe(
          map((response: any) => new OrganizationActions.deleteMessagesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new OrganizationActions.deleteMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDevices$ = this.actions$
    .ofType(OrganizationActionTypes.GET_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getDevices(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Device', 'OrganizationDevice', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new OrganizationActions.getDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.getDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createDevices$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Device', 'OrganizationDevice', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new OrganizationActions.createDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDevices$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.deleteDevices(action.payload.id).pipe(
          map((response: any) => new OrganizationActions.deleteDevicesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new OrganizationActions.deleteDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getCategories$ = this.actions$
    .ofType(OrganizationActionTypes.GET_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getCategories(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Category', 'OrganizationCategory', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new OrganizationActions.getCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.getCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createCategories$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createCategories(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Category', 'OrganizationCategory', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new OrganizationActions.createCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteCategories$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.deleteCategories(action.payload.id).pipe(
          map((response: any) => new OrganizationActions.deleteCategoriesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new OrganizationActions.deleteCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.GET_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getDashboards(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Dashboard', 'OrganizationDashboard', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new OrganizationActions.getDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.getDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createDashboards(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Dashboard', 'OrganizationDashboard', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new OrganizationActions.createDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.DELETE_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.deleteDashboards(action.payload.id).pipe(
          map((response: any) => new OrganizationActions.deleteDashboardsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new OrganizationActions.deleteDashboardsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getFilteredMessages$ = this.actions$
    .ofType(OrganizationActionTypes.GET_FILTERED_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.getFilteredMessages(action.payload.id, action.payload.filter, action.payload.req).pipe(
          map((response: any) => new OrganizationActions.getFilteredMessagesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new OrganizationActions.getFilteredMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyMembers$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MANY_MEMBERS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createManyMembers(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'User', 'Organizationuser', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new OrganizationActions.createManyMembersSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createManyMembersFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyMessages$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MANY_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createManyMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Message', 'OrganizationMessage', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new OrganizationActions.createManyMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createManyMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyDevices$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MANY_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createManyDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Device', 'OrganizationDevice', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new OrganizationActions.createManyDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createManyDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyCategories$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MANY_CATEGORIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createManyCategories(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Category', 'OrganizationCategory', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new OrganizationActions.createManyCategoriesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createManyCategoriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyDashboards$ = this.actions$
    .ofType(OrganizationActionTypes.CREATE_MANY_DASHBOARDS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.organization.createManyDashboards(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Dashboard', 'OrganizationDashboard', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Dashboard', 'findSuccess'),
            of(new OrganizationActions.createManyDashboardsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new OrganizationActions.createManyDashboardsFail(error, action.meta)),
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
    @Inject(OrganizationApi) public organization: OrganizationApi
  ) {
    super(actions$, organization, 'Organization', OrganizationActionTypes, OrganizationActions);
  }
}
