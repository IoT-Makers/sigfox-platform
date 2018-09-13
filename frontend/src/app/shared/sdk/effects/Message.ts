/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

import * as actions from '../actions';
import { MessageActionTypes, MessageActions } from '../actions/Message';
import { LoopbackErrorActions } from '../actions/error';
import { MessageApi } from '../services/index';

@Injectable()
export class MessageEffects extends BaseLoopbackEffects {
  @Effect()
  public getDevice$ = this.actions$
    .ofType(MessageActionTypes.GET_DEVICE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getDevice(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Device', 'findSuccess'),
            of(new MessageActions.getDeviceSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getDeviceFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdGeolocs$ = this.actions$
    .ofType(MessageActionTypes.FIND_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.findByIdGeolocs(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Geoloc', 'findByIdSuccess'),
            of(new MessageActions.findByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.findByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdGeolocs$ = this.actions$
    .ofType(MessageActionTypes.DESTROY_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.destroyByIdGeolocs(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'deleteByIdSuccess'),
            of(new MessageActions.destroyByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.destroyByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdGeolocs$ = this.actions$
    .ofType(MessageActionTypes.UPDATE_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.updateByIdGeolocs(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Geoloc', 'findByIdSuccess'),
            of(new MessageActions.updateByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.updateByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getUser$ = this.actions$
    .ofType(MessageActionTypes.GET_USER).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getUser(action.payload.id, action.payload.refresh).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'User', 'findSuccess'),
            of(new MessageActions.getUserSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getUserFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdOrganizations$ = this.actions$
    .ofType(MessageActionTypes.FIND_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.findByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationMessage', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new MessageActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.findByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdOrganizations$ = this.actions$
    .ofType(MessageActionTypes.DESTROY_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.destroyByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'deleteByIdSuccess'),
            of(new MessageActions.destroyByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.destroyByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdOrganizations$ = this.actions$
    .ofType(MessageActionTypes.UPDATE_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationMessage', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new MessageActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.updateByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkOrganizations$ = this.actions$
    .ofType(MessageActionTypes.LINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.linkOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationMessageActions'].createSuccess(response, action.meta)),
                    of(new MessageActions.linkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new MessageActions.linkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkOrganizations$ = this.actions$
    .ofType(MessageActionTypes.UNLINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.unlinkOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationMessageActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new MessageActions.unlinkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new MessageActions.unlinkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getGeolocs$ = this.actions$
    .ofType(MessageActionTypes.GET_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getGeolocs(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new MessageActions.getGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createGeolocs$ = this.actions$
    .ofType(MessageActionTypes.CREATE_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createGeolocs(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new MessageActions.createGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteGeolocs$ = this.actions$
    .ofType(MessageActionTypes.DELETE_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.deleteGeolocs(action.payload.id).pipe(
          map((response: any) => new MessageActions.deleteGeolocsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.deleteGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganizations$ = this.actions$
    .ofType(MessageActionTypes.GET_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.getOrganizations(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationMessage', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new MessageActions.getOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.getOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createOrganizations$ = this.actions$
    .ofType(MessageActionTypes.CREATE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationMessage', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new MessageActions.createOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteOrganizations$ = this.actions$
    .ofType(MessageActionTypes.DELETE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.deleteOrganizations(action.payload.id).pipe(
          map((response: any) => new MessageActions.deleteOrganizationsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.deleteOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public putSigfox$ = this.actions$
    .ofType(MessageActionTypes.PUT_SIGFOX).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.putSigfox(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.putSigfoxSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.putSigfoxFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public putSigfoxAcknowledge$ = this.actions$
    .ofType(MessageActionTypes.PUT_SIGFOX_ACKNOWLEDGE).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.putSigfoxAcknowledge(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.putSigfoxAcknowledgeSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.putSigfoxAcknowledgeFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public postSigfoxStatus$ = this.actions$
    .ofType(MessageActionTypes.POST_SIGFOX_STATUS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.postSigfoxStatus(action.payload.req, action.payload.data).pipe(
          map((response: any) => new MessageActions.postSigfoxStatusSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new MessageActions.postSigfoxStatusFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyGeolocs$ = this.actions$
    .ofType(MessageActionTypes.CREATE_MANY_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createManyGeolocs(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new MessageActions.createManyGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createManyGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyOrganizations$ = this.actions$
    .ofType(MessageActionTypes.CREATE_MANY_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.message.createManyOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationMessage', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new MessageActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new MessageActions.createManyOrganizationsFail(error, action.meta)),
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
    @Inject(MessageApi) public message: MessageApi
  ) {
    super(actions$, message, 'Message', MessageActionTypes, MessageActions);
  }
}
