/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AccessToken } from '../models';

export const AccessTokenActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AccessToken'), {
});
export const AccessTokenActions =
Object.assign(BaseLoopbackActionsFactory<AccessToken>(AccessTokenActionTypes), {
});