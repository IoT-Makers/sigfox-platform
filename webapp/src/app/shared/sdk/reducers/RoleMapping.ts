/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { RoleMapping, RoleMappingInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoleMappingActionTypes } from '../actions';

export interface RoleMappingsState extends EntityState<RoleMapping | RoleMappingInterface> {};

export const RoleMappingAdapter: EntityAdapter<RoleMapping | RoleMappingInterface> = createEntityAdapter<RoleMapping | RoleMappingInterface>();

const initialState: RoleMappingsState = RoleMappingAdapter.getInitialState({});

const cases = BaseReducerFactory<RoleMappingsState, RoleMapping | RoleMappingInterface>(RoleMappingActionTypes, RoleMappingAdapter);

/**
 * @module RoleMappingsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible RoleMapping reducer.
 */
export function RoleMappingsReducer(state = initialState, action: LoopbackAction): RoleMappingsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRoleMappingsState = (state: any) => state.RoleMappings;
export const getRoleMappingsEntities = (state: any) => state.RoleMappings.entities;
export const getRoleMappingsIds = (state: any) => state.RoleMappings.ids;

export const getRoleMappings =
  createSelector(getRoleMappingsEntities, getRoleMappingsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoleMappingById(id: string) {
  return (state: any) => state.RoleMappings.entities[id];
}

export function getRoleMappingsById(ids: string[]) {
  return createSelector(getRoleMappingsEntities, (entities) => ids.map((id) => entities[id]));
}
