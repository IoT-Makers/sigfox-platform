/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Alexa, AlexaInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AlexaActionTypes } from '../actions';


export interface AlexasState extends EntityState<Alexa | AlexaInterface> {
}

export const AlexaAdapter: EntityAdapter<Alexa | AlexaInterface> = createEntityAdapter<Alexa | AlexaInterface>();

const initialState: AlexasState = AlexaAdapter.getInitialState({});

const cases = BaseReducerFactory<AlexasState, Alexa | AlexaInterface>(AlexaActionTypes, AlexaAdapter);

/**
 * @module AlexasReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Alexa reducer.
 */
export function AlexasReducer(state = initialState, action: LoopbackAction): AlexasState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAlexasState = (state: any) => state.Alexas;
export const getAlexasEntities = (state: any) => state.Alexas.entities;
export const getAlexasIds = (state: any) => state.Alexas.ids;

export const getAlexas =
  createSelector(getAlexasEntities, getAlexasIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAlexaById(id: string) {
  return (state: any) => state.Alexas.entities[id];
}

export function getAlexasById(ids: string[]) {
  return createSelector(getAlexasEntities, (entities) => ids.map((id) => entities[id]));
}
