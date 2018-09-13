/* tslint:disable */
import { concat, of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { LoopbackAction } from '../models/BaseModels';
import { BaseLoopbackEffects } from './base';
import { resolver, resolveThrough } from './resolver';

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
  public findByIdGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.FIND_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.findByIdGeolocs(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Geoloc', 'findByIdSuccess'),
            of(new DeviceActions.findByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.findByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.DESTROY_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.destroyByIdGeolocs(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'deleteByIdSuccess'),
            of(new DeviceActions.destroyByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.destroyByIdGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.UPDATE_BY_ID_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.updateByIdGeolocs(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Geoloc', 'findByIdSuccess'),
            of(new DeviceActions.updateByIdGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.updateByIdGeolocsFail(error, action.meta)),
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
  public findByIdOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.FIND_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.findByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDevice', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new DeviceActions.findByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.findByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.DESTROY_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.destroyByIdOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Organization', 'deleteByIdSuccess'),
            of(new DeviceActions.destroyByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.destroyByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.UPDATE_BY_ID_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.updateByIdOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDevice', 'findSuccess'),
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Organization', 'findByIdSuccess'),
            of(new DeviceActions.updateByIdOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.updateByIdOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public linkOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.LINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.linkOrganizations(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDeviceActions'].createSuccess(response, action.meta)),
                    of(new DeviceActions.linkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new DeviceActions.linkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public unlinkOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.UNLINK_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.unlinkOrganizations(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
                    of(new actions['OrganizationDeviceActions'].deleteByIdSuccess(response.id, action.meta)),
                     of(new DeviceActions.unlinkOrganizationsSuccess(action.payload.id, response, action.meta))
        )),
          catchError((error: any) => concat(
            of(new DeviceActions.unlinkOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public findByIdAlerts$ = this.actions$
    .ofType(DeviceActionTypes.FIND_BY_ID_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.findByIdAlerts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Alert', 'findByIdSuccess'),
            of(new DeviceActions.findByIdAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.findByIdAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public destroyByIdAlerts$ = this.actions$
    .ofType(DeviceActionTypes.DESTROY_BY_ID_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.destroyByIdAlerts(action.payload.id, action.payload.fk).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'deleteByIdSuccess'),
            of(new DeviceActions.destroyByIdAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.destroyByIdAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public updateByIdAlerts$ = this.actions$
    .ofType(DeviceActionTypes.UPDATE_BY_ID_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.updateByIdAlerts(action.payload.id, action.payload.fk, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({id: action.payload.id, data: response, meta: action.meta}, 'Alert', 'findByIdSuccess'),
            of(new DeviceActions.updateByIdAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.updateByIdAlertsFail(error, action.meta)),
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
  public getGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.GET_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getGeolocs(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new DeviceActions.getGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createGeolocs(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new DeviceActions.createGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.deleteGeolocs(action.payload.id).pipe(
          map((response: any) => new DeviceActions.deleteGeolocsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.deleteGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.GET_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getOrganizations(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDevice', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DeviceActions.getOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDevice', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DeviceActions.createOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.deleteOrganizations(action.payload.id).pipe(
          map((response: any) => new DeviceActions.deleteOrganizationsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.deleteOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getAlerts$ = this.actions$
    .ofType(DeviceActionTypes.GET_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getAlerts(action.payload.id, action.payload.filter).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'findSuccess'),
            of(new DeviceActions.getAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.getAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createAlerts$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createAlerts(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'findSuccess'),
            of(new DeviceActions.createAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public deleteAlerts$ = this.actions$
    .ofType(DeviceActionTypes.DELETE_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.deleteAlerts(action.payload.id).pipe(
          map((response: any) => new DeviceActions.deleteAlertsSuccess(action.payload, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.deleteAlertsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public download$ = this.actions$
    .ofType(DeviceActionTypes.DOWNLOAD).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.download(action.payload.id, action.payload.type, action.payload.req, action.payload.res).pipe(
          map((response: any) => new DeviceActions.downloadSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.downloadFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public timeSeries$ = this.actions$
    .ofType(DeviceActionTypes.TIME_SERIES).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.timeSeries(action.payload.deviceId, action.payload.dateBegin, action.payload.dateEnd, action.payload.req).pipe(
          map((response: any) => new DeviceActions.timeSeriesSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.timeSeriesFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public getMessagesFromSigfoxBackend$ = this.actions$
    .ofType(DeviceActionTypes.GET_MESSAGES_FROM_SIGFOX_BACKEND).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.getMessagesFromSigfoxBackend(action.payload.id, action.payload.limit, action.payload.before, action.payload.req).pipe(
          map((response: any) => new DeviceActions.getMessagesFromSigfoxBackendSuccess(action.payload.id, response, action.meta)),
          catchError((error: any) => concat(
            of(new DeviceActions.getMessagesFromSigfoxBackendFail(error, action.meta)),
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

  @Effect()
  public createManyGeolocs$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_MANY_GEOLOCS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createManyGeolocs(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Geoloc', 'findSuccess'),
            of(new DeviceActions.createManyGeolocsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createManyGeolocsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyOrganizations$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_MANY_ORGANIZATIONS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createManyOrganizations(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolveThrough(action, response, 'Organization', 'OrganizationDevice', 'findSuccess'),
            resolver({data: response, meta: action.meta}, 'Organization', 'findSuccess'),
            of(new DeviceActions.createManyOrganizationsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createManyOrganizationsFail(error, action.meta)),
            of(new LoopbackErrorActions.error(error, action.meta))
          ))
        )
      )
    );

  @Effect()
  public createManyAlerts$ = this.actions$
    .ofType(DeviceActionTypes.CREATE_MANY_ALERTS).pipe(
      mergeMap((action: LoopbackAction) =>
        this.device.createManyAlerts(action.payload.id, action.payload.data).pipe(
          mergeMap((response: any) => concat(
            resolver({data: response, meta: action.meta}, 'Alert', 'findSuccess'),
            of(new DeviceActions.createManyAlertsSuccess(action.payload.id, response, action.meta))
          )),
          catchError((error: any) => concat(
            of(new DeviceActions.createManyAlertsFail(error, action.meta)),
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
