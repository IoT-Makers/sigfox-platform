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
import { DeviceActionTypes, DeviceActions } from '../actions/Device';
import { LoopbackErrorActions } from '../actions/error';
import { DeviceApi } from '../services/index';

@Injectable()
export class DeviceEffects extends BaseLoopbackEffects {
  @Effect()
  public getParser$ = this.actions$
    .ofType(DeviceActionTypes.GET_PARSER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getParser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Parser', 'findSuccess'),
            of(new DeviceActions.getParserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getParserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getCategory$ = this.actions$
    .ofType(DeviceActionTypes.GET_CATEGORY).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getCategory(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Category', 'findSuccess'),
            of(new DeviceActions.getCategorySuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getCategoryFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdMessages$ = this.actions$
    .ofType(DeviceActionTypes.FIND_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.findByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new DeviceActions.findByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.findByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdMessages$ = this.actions$
    .ofType(DeviceActionTypes.DESTROY_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.destroyByIdMessages(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'deleteByIdSuccess'),
            of(new DeviceActions.destroyByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.destroyByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdMessages$ = this.actions$
    .ofType(DeviceActionTypes.UPDATE_BY_ID_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.updateByIdMessages(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Message', 'findByIdSuccess'),
            of(new DeviceActions.updateByIdMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.updateByIdMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(DeviceActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new DeviceActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganization$ = this.actions$
    .ofType(DeviceActionTypes.GET_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getOrganization(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DeviceActions.getOrganizationSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessages$ = this.actions$
    .ofType(DeviceActionTypes.GET_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getMessages(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new DeviceActions.getMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createMessages$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new DeviceActions.createMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteMessages$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.deleteMessages(action.payload.id).pipe(
          map((response: any) => new DeviceActions.deleteMessagesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.deleteMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public graphData$ = this.actions$
    .ofType(DeviceActionTypes.GRAPH_DATA).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.graphData(action.payload.deviceId, action.payload.dateBegin, action.payload.dateEnd).pipe(
          map((response: any) => new DeviceActions.graphDataSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.graphDataFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyMessages$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_MANY_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createManyMessages(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new DeviceActions.createManyMessagesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createManyMessagesFail(error, action.meta)),
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
    @Inject(DeviceApi) public device: DeviceApi
  ) {
    super(actions$, device, 'Device', DeviceActionTypes, DeviceActions);
  }
}
