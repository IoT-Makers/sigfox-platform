/* tslint:disable */
import { AuthGuard } from './auth.guard';
import { AccessTokenExistsGuard } from './AccessToken';
import { DeviceExistsGuard } from './Device';
import { ParserExistsGuard } from './Parser';
import { CategoryExistsGuard } from './Category';
import { MessageExistsGuard } from './Message';
import { AppSettingExistsGuard } from './AppSetting';
import { DashboardExistsGuard } from './Dashboard';
import { UserExistsGuard } from './User';
import { OrganizationExistsGuard } from './Organization';
import { GeolocExistsGuard } from './Geoloc';
import { AlertExistsGuard } from './Alert';
import { ReceptionExistsGuard } from './Reception';
import { ConnectorExistsGuard } from './Connector';

export const LOOPBACK_GUARDS_PROVIDERS = [
  AuthGuard,
	AccessTokenExistsGuard,
	DeviceExistsGuard,
	ParserExistsGuard,
	CategoryExistsGuard,
	MessageExistsGuard,
	AppSettingExistsGuard,
	DashboardExistsGuard,
	UserExistsGuard,
	OrganizationExistsGuard,
	GeolocExistsGuard,
	AlertExistsGuard,
	ReceptionExistsGuard,
	ConnectorExistsGuard,
];

export * from './auth.guard';
export * from './AccessToken';
export * from './Device';
export * from './Parser';
export * from './Category';
export * from './Message';
export * from './AppSetting';
export * from './Dashboard';
export * from './User';
export * from './Organization';
export * from './Geoloc';
export * from './Alert';
export * from './Reception';
export * from './Connector';
