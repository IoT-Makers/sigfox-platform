/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { AlertGeofence, AlertGeofenceInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AlertGeofenceActionTypes } from '../actions';


export interface AlertGeofencesState extends EntityState<AlertGeofence | AlertGeofenceInterface> {
}

export const AlertGeofenceAdapter: EntityAdapter<AlertGeofence | AlertGeofenceInterface> = createEntityAdapter<AlertGeofence | AlertGeofenceInterface>();

const initialState: AlertGeofencesState = AlertGeofenceAdapter.getInitialState({});

const cases = BaseReducerFactory<AlertGeofencesState, AlertGeofence | AlertGeofenceInterface>(AlertGeofenceActionTypes, AlertGeofenceAdapter);

/**
 * @module AlertGeofencesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible AlertGeofence reducer.
 */
export function AlertGeofencesReducer(state = initialState, action: LoopbackAction): AlertGeofencesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAlertGeofencesState = (state: any) => state.AlertGeofences;
export const getAlertGeofencesEntities = (state: any) => state.AlertGeofences.entities;
export const getAlertGeofencesIds = (state: any) => state.AlertGeofences.ids;

export const getAlertGeofences =
  createSelector(getAlertGeofencesEntities, getAlertGeofencesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAlertGeofenceById(id: string) {
  return (state: any) => state.AlertGeofences.entities[id];
}

export function getAlertGeofencesById(ids: string[]) {
  return createSelector(getAlertGeofencesEntities, (entities) => ids.map((id) => entities[id]));
}
