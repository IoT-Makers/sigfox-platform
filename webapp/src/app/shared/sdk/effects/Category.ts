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
import { CategoryActionTypes, CategoryActions } from '../actions/Category';
import { LoopbackErrorActions } from '../actions/error';
import { CategoryApi } from '../services/index';

@Injectable()
export class CategoryEffects extends BaseLoopbackEffects {
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
