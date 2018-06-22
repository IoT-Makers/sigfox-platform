/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { GeolocActionTypes, GeolocActions } from '../actions/Geoloc';
import { LoopbackErrorActions } from '../actions/error';
import { GeolocApi } from '../services/index';

@Injectable()
export class GeolocEffects extends BaseLoopbackEffects {
  @Effect()
  public getDevice$ = this.actions$
    .ofType(GeolocActionTypes.GET_DEVICE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.getDevice(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new GeolocActions.getDeviceSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new GeolocActions.getDeviceFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessage$ = this.actions$
    .ofType(GeolocActionTypes.GET_MESSAGE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.getMessage(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Message', 'findSuccess'),
            of(new GeolocActions.getMessageSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new GeolocActions.getMessageFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(GeolocActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new GeolocActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new GeolocActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganization$ = this.actions$
    .ofType(GeolocActionTypes.GET_ORGANIZATION).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.getOrganization(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new GeolocActions.getOrganizationSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new GeolocActions.getOrganizationFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createFromParsedPayload$ = this.actions$
    .ofType(GeolocActionTypes.CREATE_FROM_PARSED_PAYLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.createFromParsedPayload(action.payload.message).pipe(
          map((response: any) => new GeolocActions.createFromParsedPayloadSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new GeolocActions.createFromParsedPayloadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public postSigfox$ = this.actions$
    .ofType(GeolocActionTypes.POST_SIGFOX).pipe(
      mergeMap((action: LoopbackAction) =>
        this.geoloc.postSigfox(action.payload.req, action.payload.data).pipe(
          map((response: any) => new GeolocActions.postSigfoxSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new GeolocActions.postSigfoxFail(error, action.meta)),
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
    @Inject(GeolocApi) public geoloc: GeolocApi
  ) {
    super(actions$, geoloc, 'Geoloc', GeolocActionTypes, GeolocActions);
  }
}
