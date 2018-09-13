/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Alert, AlertInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AlertActionTypes } from '../actions';


export interface AlertsState extends EntityState<Alert | AlertInterface> {
}

export const AlertAdapter: EntityAdapter<Alert | AlertInterface> = createEntityAdapter<Alert | AlertInterface>();

const initialState: AlertsState = AlertAdapter.getInitialState({});

const cases = BaseReducerFactory<AlertsState, Alert | AlertInterface>(AlertActionTypes, AlertAdapter);

/**
 * @module AlertsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Alert reducer.
 */
export function AlertsReducer(state = initialState, action: LoopbackAction): AlertsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAlertsState = (state: any) => state.Alerts;
export const getAlertsEntities = (state: any) => state.Alerts.entities;
export const getAlertsIds = (state: any) => state.Alerts.ids;

export const getAlerts =
  createSelector(getAlertsEntities, getAlertsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAlertById(id: string) {
  return (state: any) => state.Alerts.entities[id];
}

export function getAlertsById(ids: string[]) {
  return createSelector(getAlertsEntities, (entities) => ids.map((id) => entities[id]));
}
