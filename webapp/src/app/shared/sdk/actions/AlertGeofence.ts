/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AlertGeofence } from '../models';

export const AlertGeofenceActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AlertGeofence'), {
});
export const AlertGeofenceActions =
Object.assign(BaseLoopbackActionsFactory<AlertGeofence>(AlertGeofenceActionTypes), {
});