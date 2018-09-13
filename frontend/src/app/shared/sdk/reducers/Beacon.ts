/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Beacon, BeaconInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { BeaconActionTypes } from '../actions';


export interface BeaconsState extends EntityState<Beacon | BeaconInterface> {
}

export const BeaconAdapter: EntityAdapter<Beacon | BeaconInterface> = createEntityAdapter<Beacon | BeaconInterface>();

const initialState: BeaconsState = BeaconAdapter.getInitialState({});

const cases = BaseReducerFactory<BeaconsState, Beacon | BeaconInterface>(BeaconActionTypes, BeaconAdapter);

/**
 * @module BeaconsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Beacon reducer.
 */
export function BeaconsReducer(state = initialState, action: LoopbackAction): BeaconsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getBeaconsState = (state: any) => state.Beacons;
export const getBeaconsEntities = (state: any) => state.Beacons.entities;
export const getBeaconsIds = (state: any) => state.Beacons.ids;

export const getBeacons =
  createSelector(getBeaconsEntities, getBeaconsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getBeaconById(id: string) {
  return (state: any) => state.Beacons.entities[id];
}

export function getBeaconsById(ids: string[]) {
  return createSelector(getBeaconsEntities, (entities) => ids.map((id) => entities[id]));
}
