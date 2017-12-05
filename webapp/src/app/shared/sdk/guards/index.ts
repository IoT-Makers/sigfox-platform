/* tslint:disable */
import { AuthGuard } from './auth.guard';
import { DeviceExistsGuard } from './Device';
import { ParserExistsGuard } from './Parser';
import { CategoryExistsGuard } from './Category';
import { MessageExistsGuard } from './Message';
import { ReceptionExistsGuard } from './Reception';
import { UserExistsGuard } from './User';
import { OrganizationExistsGuard } from './Organization';
import { GeolocExistsGuard } from './Geoloc';
import { AppSettingExistsGuard } from './AppSetting';
import { DashboardExistsGuard } from './Dashboard';

export const LOOPBACK_GUARDS_PROVIDERS = [
  AuthGuard,
	DeviceExistsGuard,
	ParserExistsGuard,
	CategoryExistsGuard,
	MessageExistsGuard,
	ReceptionExistsGuard,
	UserExistsGuard,
	OrganizationExistsGuard,
	GeolocExistsGuard,
	AppSettingExistsGuard,
	DashboardExistsGuard,
];

export * from './auth.guard';
export * from './Device';
export * from './Parser';
export * from './Category';
export * from './Message';
export * from './Reception';
export * from './User';
export * from './Organization';
export * from './Geoloc';
export * from './AppSetting';
export * from './Dashboard';
