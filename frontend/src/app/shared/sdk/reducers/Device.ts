/* tslint:disable */
import { Action, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BaseReducerFactory } from './base';
import { Device, DeviceInterface } from '../models';
import { LoopbackAction } from '../models/BaseModels';
import { DeviceActionTypes } from '../actions';


export interface DevicesState extends EntityState<Device | DeviceInterface> {
}

export const DeviceAdapter: EntityAdapter<Device | DeviceInterface> = createEntityAdapter<Device | DeviceInterface>();

const initialState: DevicesState = DeviceAdapter.getInitialState({});

const cases = BaseReducerFactory<DevicesState, Device | DeviceInterface>(DeviceActionTypes, DeviceAdapter);

/**
 * @module DevicesReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible Device reducer.
 */
export function DevicesReducer(state = initialState, action: LoopbackAction): DevicesState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getDevicesState = (state: any) => state.Devices;
export const getDevicesEntities = (state: any) => state.Devices.entities;
export const getDevicesIds = (state: any) => state.Devices.ids;

export const getDevices =
  createSelector(getDevicesEntities, getDevicesIds, (entities, ids) => ids.map((id) => entities[id]));

export function getDeviceById(id: string) {
  return (state: any) => state.Devices.entities[id];
}

export function getDevicesById(ids: string[]) {
  return createSelector(getDevicesEntities, (entities) => ids.map((id) => entities[id]));
}
