/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { AlertHistory, AlertHistoryInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AlertHistoryActionTypes } from '../actions';


export interface AlertHistorysState extends EntityState<AlertHistory | AlertHistoryInterface> {
}

export const AlertHistoryAdapter: EntityAdapter<AlertHistory | AlertHistoryInterface> = createEntityAdapter<AlertHistory | AlertHistoryInterface>();

const initialState: AlertHistorysState = AlertHistoryAdapter.getInitialState({});

const cases = BaseReducerFactory<AlertHistorysState, AlertHistory | AlertHistoryInterface>(AlertHistoryActionTypes, AlertHistoryAdapter);

/**
 * @module AlertHistorysReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible AlertHistory reducer.
 */
export function AlertHistorysReducer(state = initialState, action: LoopbackAction): AlertHistorysState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAlertHistorysState = (state: any) => state.AlertHistorys;
export const getAlertHistorysEntities = (state: any) => state.AlertHistorys.entities;
export const getAlertHistorysIds = (state: any) => state.AlertHistorys.ids;

export const getAlertHistorys =
  createSelector(getAlertHistorysEntities, getAlertHistorysIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAlertHistoryById(id: string) {
  return (state: any) => state.AlertHistorys.entities[id];
}

export function getAlertHistorysById(ids: string[]) {
  return createSelector(getAlertHistorysEntities, (entities) => ids.map((id) => entities[id]));
}
