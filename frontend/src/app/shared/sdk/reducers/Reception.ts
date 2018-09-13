/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Reception, ReceptionInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { ReceptionActionTypes } from '../actions';


export interface ReceptionsState extends EntityState<Reception | ReceptionInterface> {
}

export const ReceptionAdapter: EntityAdapter<Reception | ReceptionInterface> = createEntityAdapter<Reception | ReceptionInterface>();

const initialState: ReceptionsState = ReceptionAdapter.getInitialState({});

const cases = BaseReducerFactory<ReceptionsState, Reception | ReceptionInterface>(ReceptionActionTypes, ReceptionAdapter);

/**
 * @module ReceptionsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Reception reducer.
 */
export function ReceptionsReducer(state = initialState, action: LoopbackAction): ReceptionsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getReceptionsState = (state: any) => state.Receptions;
export const getReceptionsEntities = (state: any) => state.Receptions.entities;
export const getReceptionsIds = (state: any) => state.Receptions.ids;

export const getReceptions =
  createSelector(getReceptionsEntities, getReceptionsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getReceptionById(id: string) {
  return (state: any) => state.Receptions.entities[id];
}

export function getReceptionsById(ids: string[]) {
  return createSelector(getReceptionsEntities, (entities) => ids.map((id) => entities[id]));
}
