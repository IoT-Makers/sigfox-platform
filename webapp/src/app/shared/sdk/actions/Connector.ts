/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Connector } from '../models';

export const ConnectorActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Connector'), {
});
export const ConnectorActions =
Object.assign(BaseLoopbackActionsFactory<Connector>(ConnectorActionTypes), {
});