/* tslint:disable */
import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SDKModels} from './SDKModels';
import {BaseLoopBackApi} from '../core/base.service';
import {LoopBackAuth} from '../core/auth.service';
import {ErrorHandler} from '../core/error.service';
import {AlertGeofence} from '../../models/AlertGeofence';
import {SocketConnection} from '../../sockets/socket.connections';


/**
 * Api services for the `AlertGeofence` model.
 */
@Injectable()
export class AlertGeofenceApi extends BaseLoopBackApi {

  constructor(
    @Inject(HttpClient) protected http: HttpClient,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, errorHandler);
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `AlertGeofence`.
   */
  public getModelName() {
    return "AlertGeofence";
  }
}
