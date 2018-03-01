/* tslint:disable */
import {BaseLoopbackActionsFactory, BaseLoopbackActionTypesFactory} from './base';
import {Widget} from '../models';

export const WidgetActionTypes =
Object.assign(BaseLoopbackActionTypesFactory('Widget'), {
});
export const WidgetActions =
Object.assign(BaseLoopbackActionsFactory<Widget>(WidgetActionTypes), {});
