/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { AlertValue, AlertValueInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AlertValueActionTypes } from '../actions';


export interface AlertValuesState extends EntityState<AlertValue | AlertValueInterface> {
}

export const AlertValueAdapter: EntityAdapter<AlertValue | AlertValueInterface> = createEntityAdapter<AlertValue | AlertValueInterface>();

const initialState: AlertValuesState = AlertValueAdapter.getInitialState({});

const cases = BaseReducerFactory<AlertValuesState, AlertValue | AlertValueInterface>(AlertValueActionTypes, AlertValueAdapter);

/**
 * @module AlertValuesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible AlertValue reducer.
 */
export function AlertValuesReducer(state = initialState, action: LoopbackAction): AlertValuesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAlertValuesState = (state: any) => state.AlertValues;
export const getAlertValuesEntities = (state: any) => state.AlertValues.entities;
export const getAlertValuesIds = (state: any) => state.AlertValues.ids;

export const getAlertValues =
  createSelector(getAlertValuesEntities, getAlertValuesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAlertValueById(id: string) {
  return (state: any) => state.AlertValues.entities[id];
}

export function getAlertValuesById(ids: string[]) {
  return createSelector(getAlertValuesEntities, (entities) => ids.map((id) => entities[id]));
}
