/* tslint:disable */
import {BaseLoopbackActionsFactory, BaseLoopbackActionTypesFactory} from './base';
import {Property} from '../models';

export const PropertyActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Property'), {
});
export const PropertyActions =
Object.assign(BaseLoopbackActionsFactory<Property>(PropertyActionTypes), {
});
