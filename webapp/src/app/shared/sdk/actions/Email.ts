/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Email } from '../models';

export const EmailActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Email'), {
});
export const EmailActions =
Object.assign(BaseLoopbackActionsFactory<Email>(EmailActionTypes), {
});