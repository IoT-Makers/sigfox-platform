/* tslint:disable */
import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SDKModels} from './SDKModels';
import {BaseLoopBackApi} from '../core/base.service';
import {LoopBackAuth} from '../core/auth.service';
import {ErrorHandler} from '../core/error.service';
import {AlertValue} from '../../models/AlertValue';
import {SocketConnection} from '../../sockets/socket.connections';


/**
 * Api services for the `AlertValue` model.
 */
@Injectable()
export class AlertValueApi extends BaseLoopBackApi {

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
   * i.e. `AlertValue`.
   */
  public getModelName() {
    return "AlertValue";
  }
}
