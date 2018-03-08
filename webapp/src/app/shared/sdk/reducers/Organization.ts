/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Organization, OrganizationInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { OrganizationActionTypes } from '../actions';


export interface OrganizationsState extends EntityState<Organization | OrganizationInterface> {
}

export const OrganizationAdapter: EntityAdapter<Organization | OrganizationInterface> = createEntityAdapter<Organization | OrganizationInterface>();

const initialState: OrganizationsState = OrganizationAdapter.getInitialState({});

const cases = BaseReducerFactory<OrganizationsState, Organization | OrganizationInterface>(OrganizationActionTypes, OrganizationAdapter);

/**
 * @module OrganizationsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Organization reducer.
 */
export function OrganizationsReducer(state = initialState, action: LoopbackAction): OrganizationsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getOrganizationsState = (state: any) => state.Organizations;
export const getOrganizationsEntities = (state: any) => state.Organizations.entities;
export const getOrganizationsIds = (state: any) => state.Organizations.ids;

export const getOrganizations =
  createSelector(getOrganizationsEntities, getOrganizationsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getOrganizationById(id: string) {
  return (state: any) => state.Organizations.entities[id];
}

export function getOrganizationsById(ids: string[]) {
  return createSelector(getOrganizationsEntities, (entities) => ids.map((id) => entities[id]));
}
