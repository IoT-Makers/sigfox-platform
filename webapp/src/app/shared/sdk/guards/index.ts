/* tslint:disable */
import { AuthGuard } from './auth.guard';
import { AccessTokenExistsGuard } from './AccessToken';
import { RoleExistsGuard } from './Role';
import { DeviceExistsGuard } from './Device';
import { ParserExistsGuard } from './Parser';
import { CategoryExistsGuard } from './Category';
import { MessageExistsGuard } from './Message';
import { GeolocExistsGuard } from './Geoloc';
import { AppSettingExistsGuard } from './AppSetting';
import { DashboardExistsGuard } from './Dashboard';
import { UserExistsGuard } from './User';
import { OrganizationExistsGuard } from './Organization';
import { AlertExistsGuard } from './Alert';
import { AlertValueExistsGuard } from './AlertValue';
import { AlertGeofenceExistsGuard } from './AlertGeofence';
import { AlertHistoryExistsGuard } from './AlertHistory';
import { ReceptionExistsGuard } from './Reception';
import { ConnectorExistsGuard } from './Connector';
import { WidgetExistsGuard } from './Widget';
import { PropertyExistsGuard } from './Property';
import { BeaconExistsGuard } from './Beacon';
import { AlexaExistsGuard } from './Alexa';

export const LOOPBACK_GUARDS_PROVIDERS = [
  AuthGuard,
	AccessTokenExistsGuard,
	RoleExistsGuard,
	DeviceExistsGuard,
	ParserExistsGuard,
	CategoryExistsGuard,
	MessageExistsGuard,
	GeolocExistsGuard,
	AppSettingExistsGuard,
	DashboardExistsGuard,
	UserExistsGuard,
	OrganizationExistsGuard,
	AlertExistsGuard,
	AlertValueExistsGuard,
	AlertGeofenceExistsGuard,
	AlertHistoryExistsGuard,
	ReceptionExistsGuard,
	ConnectorExistsGuard,
	WidgetExistsGuard,
	PropertyExistsGuard,
	BeaconExistsGuard,
	AlexaExistsGuard,
];

export * from './auth.guard';
export * from './AccessToken';
export * from './Role';
export * from './Device';
export * from './Parser';
export * from './Category';
export * from './Message';
export * from './Geoloc';
export * from './AppSetting';
export * from './Dashboard';
export * from './User';
export * from './Organization';
export * from './Alert';
export * from './AlertValue';
export * from './AlertGeofence';
export * from './AlertHistory';
export * from './Reception';
export * from './Connector';
export * from './Widget';
export * from './Property';
export * from './Beacon';
export * from './Alexa';
