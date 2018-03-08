/* tslint:disable */
import { Injectable } from '@angular/core';
import { Email } from '../../models/Email';
import { AccessToken } from '../../models/AccessToken';
import { Device } from '../../models/Device';
import { Parser } from '../../models/Parser';
import { Category } from '../../models/Category';
import { Message } from '../../models/Message';
import { AppSetting } from '../../models/AppSetting';
import { Dashboard } from '../../models/Dashboard';
import { User } from '../../models/User';
import { Organization } from '../../models/Organization';
import { Geoloc } from '../../models/Geoloc';
import { Alert } from '../../models/Alert';
import { Reception } from '../../models/Reception';
import { Connector } from '../../models/Connector';
import { Widget } from '../../models/Widget';
import { Property } from '../../models/Property';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Email: Email,
    AccessToken: AccessToken,
    Device: Device,
    Parser: Parser,
    Category: Category,
    Message: Message,
    AppSetting: AppSetting,
    Dashboard: Dashboard,
    User: User,
    Organization: Organization,
    Geoloc: Geoloc,
    Alert: Alert,
    Reception: Reception,
    Connector: Connector,
    Widget: Widget,
    Property: Property,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
