/* tslint:disable */
import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import { LoopbackAuthEffects } from './effects/auth';
import { AccessTokenEffects } from './effects/AccessToken';
import { DeviceEffects } from './effects/Device';
import { ParserEffects } from './effects/Parser';
import { CategoryEffects } from './effects/Category';
import { MessageEffects } from './effects/Message';
import { AppSettingEffects } from './effects/AppSetting';
import { DashboardEffects } from './effects/Dashboard';
import { UserEffects } from './effects/User';
import { OrganizationEffects } from './effects/Organization';
import { GeolocEffects } from './effects/Geoloc';
import { AlertEffects } from './effects/Alert';
import { ReceptionEffects } from './effects/Reception';
import { ConnectorEffects } from './effects/Connector';
import { WidgetEffects } from './effects/Widget';

export interface LoopbackStateInterface {
  LoopbackAuth: SDKToken;
  AccessTokens: reducers.AccessTokensState;
  Devices: reducers.DevicesState;
  Parsers: reducers.ParsersState;
  Categorys: reducers.CategorysState;
  Messages: reducers.MessagesState;
  AppSettings: reducers.AppSettingsState;
  Dashboards: reducers.DashboardsState;
  Users: reducers.UsersState;
  Organizations: reducers.OrganizationsState;
  Geolocs: reducers.GeolocsState;
  Alerts: reducers.AlertsState;
  Receptions: reducers.ReceptionsState;
  Widgets: reducers.WidgetsState;
  Connectors: reducers.ConnectorsState;
};

export const LoopbackReducer = {
  LoopbackAuth: reducers.LoopbackAuthReducer,
	AccessTokens: reducers.AccessTokensReducer,
	Devices: reducers.DevicesReducer,
	Parsers: reducers.ParsersReducer,
	Categorys: reducers.CategorysReducer,
	Messages: reducers.MessagesReducer,
	AppSettings: reducers.AppSettingsReducer,
	Dashboards: reducers.DashboardsReducer,
	Users: reducers.UsersReducer,
	Organizations: reducers.OrganizationsReducer,
	Geolocs: reducers.GeolocsReducer,
	Alerts: reducers.AlertsReducer,
	Receptions: reducers.ReceptionsReducer,
	Connectors: reducers.ConnectorsReducer,
	Widgets: reducers.WidgetsReducer,
};

export const LoopbackEffects = [
  LoopbackAuthEffects,
  AccessTokenEffects,
  DeviceEffects,
  ParserEffects,
  CategoryEffects,
  MessageEffects,
  AppSettingEffects,
  DashboardEffects,
  UserEffects,
  OrganizationEffects,
  GeolocEffects,
  AlertEffects,
  ReceptionEffects,
  ConnectorEffects,
  WidgetEffects,
];
