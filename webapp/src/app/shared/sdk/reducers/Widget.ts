/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Widget, WidgetInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { WidgetActionTypes } from '../actions';


export interface WidgetsState extends EntityState<Widget | WidgetInterface> {
}

export const WidgetAdapter: EntityAdapter<Widget | WidgetInterface> = createEntityAdapter<Widget | WidgetInterface>();

const initialState: WidgetsState = WidgetAdapter.getInitialState({});

const cases = BaseReducerFactory<WidgetsState, Widget | WidgetInterface>(WidgetActionTypes, WidgetAdapter);

/**
 * @module WidgetsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Widget reducer.
 */
export function WidgetsReducer(state = initialState, action: LoopbackAction): WidgetsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getWidgetsState = (state: any) => state.Widgets;
export const getWidgetsEntities = (state: any) => state.Widgets.entities;
export const getWidgetsIds = (state: any) => state.Widgets.ids;

export const getWidgets =
  createSelector(getWidgetsEntities, getWidgetsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getWidgetById(id: string) {
  return (state: any) => state.Widgets.entities[id];
}

export function getWidgetsById(ids: string[]) {
  return createSelector(getWidgetsEntities, (entities) => ids.map((id) => entities[id]));
}
