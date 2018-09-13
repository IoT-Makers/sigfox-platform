/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AlertValue } from '../models';

export const AlertValueActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AlertValue'), {
});
export const AlertValueActions =
Object.assign(BaseLoopbackActionsFactory<AlertValue>(AlertValueActionTypes), {
});