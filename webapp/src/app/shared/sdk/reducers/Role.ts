/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Role, RoleInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { RoleActionTypes } from '../actions';

export interface RolesState extends EntityState<Role | RoleInterface> {};

export const RoleAdapter: EntityAdapter<Role | RoleInterface> = createEntityAdapter<Role | RoleInterface>();

const initialState: RolesState = RoleAdapter.getInitialState({});

const cases = BaseReducerFactory<RolesState, Role | RoleInterface>(RoleActionTypes, RoleAdapter);

/**
 * @module RolesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Role reducer.
 */
export function RolesReducer(state = initialState, action: LoopbackAction): RolesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getRolesState = (state: any) => state.Roles;
export const getRolesEntities = (state: any) => state.Roles.entities;
export const getRolesIds = (state: any) => state.Roles.ids;

export const getRoles =
  createSelector(getRolesEntities, getRolesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getRoleById(id: string) {
  return (state: any) => state.Roles.entities[id];
}

export function getRolesById(ids: string[]) {
  return createSelector(getRolesEntities, (entities) => ids.map((id) => entities[id]));
}
