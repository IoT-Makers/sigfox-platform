/* tslint:disable */
import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import { LoopbackAuthEffects } from './effects/auth';
import { AccessTokenEffects } from './effects/AccessToken';
import { DeviceEffects } from './effects/Device';
import { ParserEffects } from './effects/Parser';
import { CategoryEffects } from './effects/Category';
import { MessageEffects } from './effects/Message';
import { ReceptionEffects } from './effects/Reception';
import { UserEffects } from './effects/User';
import { OrganizationEffects } from './effects/Organization';
import { GeolocEffects } from './effects/Geoloc';
import { AppSettingEffects } from './effects/AppSetting';
import { DashboardEffects } from './effects/Dashboard';

export interface LoopbackStateInterface {
  LoopbackAuth: SDKToken;
  AccessTokens: reducers.AccessTokensState;
  Devices: reducers.DevicesState;
  Parsers: reducers.ParsersState;
  Categorys: reducers.CategorysState;
  Messages: reducers.MessagesState;
  Receptions: reducers.ReceptionsState;
  Users: reducers.UsersState;
  Organizations: reducers.OrganizationsState;
  Geolocs: reducers.GeolocsState;
  AppSettings: reducers.AppSettingsState;
  Dashboards: reducers.DashboardsState;
};

export const LoopbackReducer = {
  LoopbackAuth: reducers.LoopbackAuthReducer,
	AccessTokens: reducers.AccessTokensReducer,
	Devices: reducers.DevicesReducer,
	Parsers: reducers.ParsersReducer,
	Categorys: reducers.CategorysReducer,
	Messages: reducers.MessagesReducer,
	Receptions: reducers.ReceptionsReducer,
	Users: reducers.UsersReducer,
	Organizations: reducers.OrganizationsReducer,
	Geolocs: reducers.GeolocsReducer,
	AppSettings: reducers.AppSettingsReducer,
	Dashboards: reducers.DashboardsReducer,
};

export const LoopbackEffects = [
  LoopbackAuthEffects,
  AccessTokenEffects,
  DeviceEffects,
  ParserEffects,
  CategoryEffects,
  MessageEffects,
  ReceptionEffects,
  UserEffects,
  OrganizationEffects,
  GeolocEffects,
  AppSettingEffects,
  DashboardEffects,
];
