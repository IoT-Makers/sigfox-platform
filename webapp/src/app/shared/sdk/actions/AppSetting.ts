/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, AppSetting } from '../models';

export const AppSettingActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('AppSetting'), {
});
export const AppSettingActions =
Object.assign(BaseLoopbackActionsFactory<AppSetting>(AppSettingActionTypes), {
});