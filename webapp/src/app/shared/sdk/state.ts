/* tslint:disable */
import { SDKToken } from './models/BaseModels';

import * as reducers from './reducers/index';

import { LoopbackAuthEffects } from './effects/auth';
import { EmailEffects } from './effects/Email';
import { AccessTokenEffects } from './effects/AccessToken';
import { RoleEffects } from './effects/Role';
import { DeviceEffects } from './effects/Device';
import { ParserEffects } from './effects/Parser';
import { CategoryEffects } from './effects/Category';
import { MessageEffects } from './effects/Message';
import { GeolocEffects } from './effects/Geoloc';
import { AppSettingEffects } from './effects/AppSetting';
import { DashboardEffects } from './effects/Dashboard';
import { UserEffects } from './effects/User';
import { OrganizationEffects } from './effects/Organization';
import { AlertEffects } from './effects/Alert';
import { AlertHistoryEffects } from './effects/AlertHistory';
import { ReceptionEffects } from './effects/Reception';
import { ConnectorEffects } from './effects/Connector';
import { WidgetEffects } from './effects/Widget';
import { PropertyEffects } from './effects/Property';

export interface LoopbackStateInterface {
  LoopbackAuth: SDKToken;
  Emails: reducers.EmailsState;
  AccessTokens: reducers.AccessTokensState;
  Roles: reducers.RolesState;
  Devices: reducers.DevicesState;
  Parsers: reducers.ParsersState;
  Categorys: reducers.CategorysState;
  Messages: reducers.MessagesState;
  Geolocs: reducers.GeolocsState;
  AppSettings: reducers.AppSettingsState;
  Dashboards: reducers.DashboardsState;
  Users: reducers.UsersState;
  Organizations: reducers.OrganizationsState;
  Alerts: reducers.AlertsState;
  AlertHistorys: reducers.AlertHistorysState;
  Receptions: reducers.ReceptionsState;
  Connectors: reducers.ConnectorsState;
  Widgets: reducers.WidgetsState;
  Propertys: reducers.PropertysState;
}

export const LoopbackReducer = {
  LoopbackAuth: reducers.LoopbackAuthReducer,
	Emails: reducers.EmailsReducer,
	AccessTokens: reducers.AccessTokensReducer,
	Roles: reducers.RolesReducer,
	Devices: reducers.DevicesReducer,
	Parsers: reducers.ParsersReducer,
	Categorys: reducers.CategorysReducer,
	Messages: reducers.MessagesReducer,
	Geolocs: reducers.GeolocsReducer,
	AppSettings: reducers.AppSettingsReducer,
	Dashboards: reducers.DashboardsReducer,
	Users: reducers.UsersReducer,
	Organizations: reducers.OrganizationsReducer,
	Alerts: reducers.AlertsReducer,
	AlertHistorys: reducers.AlertHistorysReducer,
	Receptions: reducers.ReceptionsReducer,
	Connectors: reducers.ConnectorsReducer,
	Widgets: reducers.WidgetsReducer,
	Propertys: reducers.PropertysReducer,
};

export const LoopbackEffects = [
  LoopbackAuthEffects,
  EmailEffects,
  AccessTokenEffects,
  RoleEffects,
  DeviceEffects,
  ParserEffects,
  CategoryEffects,
  MessageEffects,
  GeolocEffects,
  AppSettingEffects,
  DashboardEffects,
  UserEffects,
  OrganizationEffects,
  AlertEffects,
  AlertHistoryEffects,
  ReceptionEffects,
  ConnectorEffects,
  WidgetEffects,
  PropertyEffects,
];
