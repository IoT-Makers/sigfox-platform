/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { AccessToken, AccessTokenInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AccessTokenActionTypes } from '../actions';

export interface AccessTokensState extends EntityState<AccessToken | AccessTokenInterface> {};

export const AccessTokenAdapter: EntityAdapter<AccessToken | AccessTokenInterface> = createEntityAdapter<AccessToken | AccessTokenInterface>();

const initialState: AccessTokensState = AccessTokenAdapter.getInitialState({});

const cases = BaseReducerFactory<AccessTokensState, AccessToken | AccessTokenInterface>(AccessTokenActionTypes, AccessTokenAdapter);

/**
 * @module AccessTokensReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible AccessToken reducer.
 */
export function AccessTokensReducer(state = initialState, action: LoopbackAction): AccessTokensState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAccessTokensState = (state: any) => state.AccessTokens;
export const getAccessTokensEntities = (state: any) => state.AccessTokens.entities;
export const getAccessTokensIds = (state: any) => state.AccessTokens.ids;

export const getAccessTokens =
  createSelector(getAccessTokensEntities, getAccessTokensIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAccessTokenById(id: string) {
  return (state: any) => state.AccessTokens.entities[id];
}

export function getAccessTokensById(ids: string[]) {
  return createSelector(getAccessTokensEntities, (entities) => ids.map((id) => entities[id]));
}
