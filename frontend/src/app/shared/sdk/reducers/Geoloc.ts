/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Geoloc, GeolocInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { GeolocActionTypes } from '../actions';


export interface GeolocsState extends EntityState<Geoloc | GeolocInterface> {
}

export const GeolocAdapter: EntityAdapter<Geoloc | GeolocInterface> = createEntityAdapter<Geoloc | GeolocInterface>();

const initialState: GeolocsState = GeolocAdapter.getInitialState({});

const cases = BaseReducerFactory<GeolocsState, Geoloc | GeolocInterface>(GeolocActionTypes, GeolocAdapter);

/**
 * @module GeolocsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Geoloc reducer.
 */
export function GeolocsReducer(state = initialState, action: LoopbackAction): GeolocsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getGeolocsState = (state: any) => state.Geolocs;
export const getGeolocsEntities = (state: any) => state.Geolocs.entities;
export const getGeolocsIds = (state: any) => state.Geolocs.ids;

export const getGeolocs =
  createSelector(getGeolocsEntities, getGeolocsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getGeolocById(id: string) {
  return (state: any) => state.Geolocs.entities[id];
}

export function getGeolocsById(ids: string[]) {
  return createSelector(getGeolocsEntities, (entities) => ids.map((id) => entities[id]));
}
