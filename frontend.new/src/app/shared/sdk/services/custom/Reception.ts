/* tslint:disable */
import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SDKModels} from './SDKModels';
import {BaseLoopBackApi} from '../core/base.service';
import {LoopBackConfig} from '../../lb.config';
import {LoopBackAuth} from '../core/auth.service';
import {ErrorHandler} from '../core/error.service';
import {Observable} from 'rxjs';
import {Reception} from '../../models/Reception';
import {SocketConnection} from '../../sockets/socket.connections';


/**
 * Api services for the `Reception` model.
 */
@Injectable()
export class ReceptionApi extends BaseLoopBackApi {

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
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {string} deviceId the deviceId
   *
   * @param {number} time the message time
   *
   * @param {object} req 
   *
   * @returns {object[]} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * <em>
   * (The remote method definition does not provide any description.
   * This usually means the response is a `Reception` object.)
   * </em>
   */
  public getBaseStationsByDeviceId(deviceId: any, time: any, req: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "GET";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Receptions/base-stations-by-device-id";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof deviceId !== 'undefined' && deviceId !== null) _urlParams.deviceId = deviceId;
    if (typeof time !== 'undefined' && time !== null) _urlParams.time = time;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Reception`.
   */
  public getModelName() {
    return "Reception";
  }
}
