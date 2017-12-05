/* tslint:disable */
import { Action } from '@ngrx/store';
import { type } from '../util';
import { BaseLoopbackActionTypesFactory, BaseLoopbackActionsFactory } from './base';
import { LoopBackFilter, SDKToken, Category } from '../models';

export const CategoryActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Category'), {
});
export const CategoryActions =
Object.assign(BaseLoopbackActionsFactory<Category>(CategoryActionTypes), {
});