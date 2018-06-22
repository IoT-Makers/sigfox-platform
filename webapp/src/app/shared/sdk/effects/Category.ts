/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { CategoryActionTypes, CategoryActions } from '../actions/Category';
import { LoopbackErrorActions } from '../actions/error';
import { CategoryApi } from '../services/index';

@Injectable()
export class CategoryEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdDevices$ = this.actions$
    .ofType(CategoryActionTypes.FIND_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.findByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new CategoryActions.findByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.findByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdDevices$ = this.actions$
    .ofType(CategoryActionTypes.DESTROY_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.destroyByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'deleteByIdSuccess'),
            of(new CategoryActions.destroyByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.destroyByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdDevices$ = this.actions$
    .ofType(CategoryActionTypes.UPDATE_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.updateByIdDevices(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new CategoryActions.updateByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.updateByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(CategoryActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new CategoryActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.FIND_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.findByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationCategory', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new CategoryActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.findByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.DESTROY_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.destroyByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'deleteByIdSuccess'),
            of(new CategoryActions.destroyByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.destroyByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.UPDATE_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationCategory', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new CategoryActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.updateByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.LINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.linkOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationCategoryActions'].createSuccess(response, action.meta)),
                    of(new CategoryActions.linkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new CategoryActions.linkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.UNLINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.unlinkOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationCategoryActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new CategoryActions.unlinkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new CategoryActions.unlinkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDevices$ = this.actions$
    .ofType(CategoryActionTypes.GET_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.getDevices(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new CategoryActions.getDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.getDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createDevices$ = this.actions$
    .ofType(CategoryActionTypes.CREATE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.createDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new CategoryActions.createDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.createDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDevices$ = this.actions$
    .ofType(CategoryActionTypes.DELETE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.deleteDevices(action.payload.id).pipe(
          map((response: any) => new CategoryActions.deleteDevicesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new CategoryActions.deleteDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.GET_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.getOrganizations(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationCategory', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new CategoryActions.getOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.getOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.CREATE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.createOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationCategory', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new CategoryActions.createOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.createOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.DELETE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.deleteOrganizations(action.payload.id).pipe(
          map((response: any) => new CategoryActions.deleteOrganizationsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new CategoryActions.deleteOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public download$ = this.actions$
    .ofType(CategoryActionTypes.DOWNLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.download(action.payload.categoryId, action.payload.type, action.payload.req, action.payload.res).pipe(
          map((response: any) => new CategoryActions.downloadSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new CategoryActions.downloadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public downloadFromOrganization$ = this.actions$
    .ofType(CategoryActionTypes.DOWNLOAD_FROM_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.downloadFromOrganization(action.payload.organizationId, action.payload.categoryId, action.payload.type, action.payload.req, action.payload.res).pipe(
          map((response: any) => new CategoryActions.downloadFromOrganizationSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new CategoryActions.downloadFromOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyDevices$ = this.actions$
    .ofType(CategoryActionTypes.CREATE_MANY_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.createManyDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new CategoryActions.createManyDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.createManyDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyOrganizations$ = this.actions$
    .ofType(CategoryActionTypes.CREATE_MANY_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.category.createManyOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationCategory', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new CategoryActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new CategoryActions.createManyOrganizationsFail(error, action.meta)),
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
    @Inject(CategoryApi) public category: CategoryApi
  ) {
    super(actions$, category, 'Category', CategoryActionTypes, CategoryActions);
  }
}
