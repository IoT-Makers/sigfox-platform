/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Parser, ParserInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { ParserActionTypes } from '../actions';


export interface ParsersState extends EntityState<Parser | ParserInterface> {
}

export const ParserAdapter: EntityAdapter<Parser | ParserInterface> = createEntityAdapter<Parser | ParserInterface>();

const initialState: ParsersState = ParserAdapter.getInitialState({});

const cases = BaseReducerFactory<ParsersState, Parser | ParserInterface>(ParserActionTypes, ParserAdapter);

/**
 * @module ParsersReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Parser reducer.
 */
export function ParsersReducer(state = initialState, action: LoopbackAction): ParsersState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getParsersState = (state: any) => state.Parsers;
export const getParsersEntities = (state: any) => state.Parsers.entities;
export const getParsersIds = (state: any) => state.Parsers.ids;

export const getParsers =
  createSelector(getParsersEntities, getParsersIds, (entities, ids) => ids.map((id) => entities[id]));

export function getParserById(id: string) {
  return (state: any) => state.Parsers.entities[id];
}

export function getParsersById(ids: string[]) {
  return createSelector(getParsersEntities, (entities) => ids.map((id) => entities[id]));
}
