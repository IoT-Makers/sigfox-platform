/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Dashboard, DashboardInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { DashboardActionTypes } from '../actions';


export interface DashboardsState extends EntityState<Dashboard | DashboardInterface> {
}

export const DashboardAdapter: EntityAdapter<Dashboard | DashboardInterface> = createEntityAdapter<Dashboard | DashboardInterface>();

const initialState: DashboardsState = DashboardAdapter.getInitialState({});

const cases = BaseReducerFactory<DashboardsState, Dashboard | DashboardInterface>(DashboardActionTypes, DashboardAdapter);

/**
 * @module DashboardsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Dashboard reducer.
 */
export function DashboardsReducer(state = initialState, action: LoopbackAction): DashboardsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getDashboardsState = (state: any) => state.Dashboards;
export const getDashboardsEntities = (state: any) => state.Dashboards.entities;
export const getDashboardsIds = (state: any) => state.Dashboards.ids;

export const getDashboards =
  createSelector(getDashboardsEntities, getDashboardsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getDashboardById(id: string) {
  return (state: any) => state.Dashboards.entities[id];
}

export function getDashboardsById(ids: string[]) {
  return createSelector(getDashboardsEntities, (entities) => ids.map((id) => entities[id]));
}
