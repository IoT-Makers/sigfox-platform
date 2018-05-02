/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AlertHistory } from '../models';

export const AlertHistoryActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AlertHistory'), {
});
export const AlertHistoryActions =
Object.assign(BaseLoopbackActionsFactory<AlertHistory>(AlertHistoryActionTypes), {
});