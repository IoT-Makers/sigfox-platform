/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Property } from '../models';

export const PropertyActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Property'), {
});
export const PropertyActions =
Object.assign(BaseLoopbackActionsFactory<Property>(PropertyActionTypes), {
});