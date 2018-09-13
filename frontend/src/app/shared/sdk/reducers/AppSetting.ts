/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { AppSetting, AppSettingInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { AppSettingActionTypes } from '../actions';


export interface AppSettingsState extends EntityState<AppSetting | AppSettingInterface> {
}

export const AppSettingAdapter: EntityAdapter<AppSetting | AppSettingInterface> = createEntityAdapter<AppSetting | AppSettingInterface>();

const initialState: AppSettingsState = AppSettingAdapter.getInitialState({});

const cases = BaseReducerFactory<AppSettingsState, AppSetting | AppSettingInterface>(AppSettingActionTypes, AppSettingAdapter);

/**
 * @module AppSettingsReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible AppSetting reducer.
 */
export function AppSettingsReducer(state = initialState, action: LoopbackAction): AppSettingsState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getAppSettingsState = (state: any) => state.AppSettings;
export const getAppSettingsEntities = (state: any) => state.AppSettings.entities;
export const getAppSettingsIds = (state: any) => state.AppSettings.ids;

export const getAppSettings =
  createSelector(getAppSettingsEntities, getAppSettingsIds, (entities, ids) => ids.map((id) => entities[id]));

export function getAppSettingById(id: string) {
  return (state: any) => state.AppSettings.entities[id];
}

export function getAppSettingsById(ids: string[]) {
  return createSelector(getAppSettingsEntities, (entities) => ids.map((id) => entities[id]));
}
