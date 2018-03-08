/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Connector, ConnectorInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { ConnectorActionTypes } from '../actions';


export interface ConnectorsState extends EntityState<Connector | ConnectorInterface> {
}

export const ConnectorAdapter: EntityAdapter<Connector | ConnectorInterface> = createEntityAdapter<Connector | ConnectorInterface>();

const initialState: ConnectorsState = ConnectorAdapter.getInitialState({});

const cases = BaseReducerFactory<ConnectorsState, Connector | ConnectorInterface>(ConnectorActionTypes, ConnectorAdapter);

/**
 * @module ConnectorsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Connector reducer.
 */
export function ConnectorsReducer(state = initialState, action: LoopbackAction): ConnectorsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getConnectorsState = (state: any) => state.Connectors;
export const getConnectorsEntities = (state: any) => state.Connectors.entities;
export const getConnectorsIds = (state: any) => state.Connectors.ids;

export const getConnectors =
  createSelector(getConnectorsEntities, getConnectorsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getConnectorById(id: string) {
  return (state: any) => state.Connectors.entities[id];
}

export function getConnectorsById(ids: string[]) {
  return createSelector(getConnectorsEntities, (entities) => ids.map((id) => entities[id]));
}
