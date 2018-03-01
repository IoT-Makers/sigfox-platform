/* tslint:disable */
import {Inject, Injectable, Optional} from '@angular/core';
import {Http} from '@angular/http';
import {SDKModels} from './SDKModels';
import {BaseLoopBackApi} from '../core/base.service';
import {LoopBackAuth} from '../core/auth.service';
import {JSONSearchParams} from '../core/search.params';
import {ErrorHandler} from '../core/error.service';
import {Widget} from '../../models/Widget';
import {SocketConnection} from '../../sockets/socket.connections';


/**
 * Api services for the `Widget` model.
 */
@Injectable()
export class WidgetApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Widget`.
   */
  public getModelName() {
    return "Widget";
  }
}
