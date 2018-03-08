/* tslint:disable */
import {createSelector} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {BaseReducerFactory} from './base';
import {Email, EmailInterface} from '../models';
import {LoopbackAction} from '../models/BaseModels';
import {EmailActionTypes} from '../actions';


export interface EmailsState extends EntityState<Email | EmailInterface> {
}

export const EmailAdapter: EntityAdapter<Email | EmailInterface> = createEntityAdapter<Email | EmailInterface>();

const initialState: EmailsState = EmailAdapter.getInitialState({});

const cases = BaseReducerFactory<EmailsState, Email | EmailInterface>(EmailActionTypes, EmailAdapter);

/**
 * @module EmailsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Email reducer.
 */
export function EmailsReducer(state = initialState, action: LoopbackAction): EmailsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getEmailsState = (state: any) => state.Emails;
export const getEmailsEntities = (state: any) => state.Emails.entities;
export const getEmailsIds = (state: any) => state.Emails.ids;

export const getEmails =
  createSelector(getEmailsEntities, getEmailsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getEmailById(id: string) {
  return (state: any) => state.Emails.entities[id];
}

export function getEmailsById(ids: string[]) {
  return createSelector(getEmailsEntities, (entities) => ids.map((id) => entities[id]));
}
