/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Alert } from '../models';

export const AlertActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Alert'), {
});
export const AlertActions =
Object.assign(BaseLoopbackActionsFactory<Alert>(AlertActionTypes), {
});