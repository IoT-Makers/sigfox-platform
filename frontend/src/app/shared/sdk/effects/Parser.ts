/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { ParserActionTypes, ParserActions } from '../actions/Parser';
import { LoopbackErrorActions } from '../actions/error';
import { ParserApi } from '../services/index';

@Injectable()
export class ParserEffects extends BaseLoopbackEffects {
  @Effect()
  public findByIdDevices$ = this.actions$
    .ofType(ParserActionTypes.FIND_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.findByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new ParserActions.findByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.findByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdDevices$ = this.actions$
    .ofType(ParserActionTypes.DESTROY_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.destroyByIdDevices(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'deleteByIdSuccess'),
            of(new ParserActions.destroyByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.destroyByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdDevices$ = this.actions$
    .ofType(ParserActionTypes.UPDATE_BY_ID_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.updateByIdDevices(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Device', 'findByIdSuccess'),
            of(new ParserActions.updateByIdDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.updateByIdDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(ParserActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new ParserActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganization$ = this.actions$
    .ofType(ParserActionTypes.GET_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.getOrganization(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new ParserActions.getOrganizationSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.getOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getDevices$ = this.actions$
    .ofType(ParserActionTypes.GET_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.getDevices(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new ParserActions.getDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.getDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createDevices$ = this.actions$
    .ofType(ParserActionTypes.CREATE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.createDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new ParserActions.createDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.createDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteDevices$ = this.actions$
    .ofType(ParserActionTypes.DELETE_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.deleteDevices(action.payload.id).pipe(
          map((response: any) => new ParserActions.deleteDevicesSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new ParserActions.deleteDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public parsePayload$ = this.actions$
    .ofType(ParserActionTypes.PARSE_PAYLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.parsePayload(action.payload.fn, action.payload.payload, action.payload.req).pipe(
          map((response: any) => new ParserActions.parsePayloadSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new ParserActions.parsePayloadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public parseAllMessages$ = this.actions$
    .ofType(ParserActionTypes.PARSE_ALL_MESSAGES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.parseAllMessages(action.payload.id, action.payload.req).pipe(
          map((response: any) => new ParserActions.parseAllMessagesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new ParserActions.parseAllMessagesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public parseAllDevices$ = this.actions$
    .ofType(ParserActionTypes.PARSE_ALL_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.parseAllDevices(action.payload.id, action.payload.req).pipe(
          map((response: any) => new ParserActions.parseAllDevicesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new ParserActions.parseAllDevicesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyDevices$ = this.actions$
    .ofType(ParserActionTypes.CREATE_MANY_DEVICES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.parser.createManyDevices(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new ParserActions.createManyDevicesSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new ParserActions.createManyDevicesFail(error, action.meta)),
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
    @Inject(ParserApi) public parser: ParserApi
  ) {
    super(actions$, parser, 'Parser', ParserActionTypes, ParserActions);
  }
}
