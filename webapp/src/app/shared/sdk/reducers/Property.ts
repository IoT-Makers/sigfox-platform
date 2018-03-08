/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Property, PropertyInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { PropertyActionTypes } from '../actions';


export interface PropertysState extends EntityState<Property | PropertyInterface> {
}

export const PropertyAdapter: EntityAdapter<Property | PropertyInterface> = createEntityAdapter<Property | PropertyInterface>();

const initialState: PropertysState = PropertyAdapter.getInitialState({});

const cases = BaseReducerFactory<PropertysState, Property | PropertyInterface>(PropertyActionTypes, PropertyAdapter);

/**
 * @module PropertysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Property reducer.
 */
export function PropertysReducer(state = initialState, action: LoopbackAction): PropertysState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getPropertysState = (state: any) => state.Propertys;
export const getPropertysEntities = (state: any) => state.Propertys.entities;
export const getPropertysIds = (state: any) => state.Propertys.ids;

export const getPropertys =
  createSelector(getPropertysEntities, getPropertysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getPropertyById(id: string) {
  return (state: any) => state.Propertys.entities[id];
}

export function getPropertysById(ids: string[]) {
  return createSelector(getPropertysEntities, (entities) => ids.map((id) => entities[id]));
}
