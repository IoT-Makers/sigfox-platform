/* tslint:disable */
import { Injectable } from '@angular/core';
import { Device } from '../../models/Device';
import { Parser } from '../../models/Parser';
import { Category } from '../../models/Category';
import { Message } from '../../models/Message';
import { Reception } from '../../models/Reception';
import { User } from '../../models/User';
import { Organization } from '../../models/Organization';
import { Geoloc } from '../../models/Geoloc';
import { AppSetting } from '../../models/AppSetting';
import { Dashboard } from '../../models/Dashboard';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Device: Device,
    Parser: Parser,
    Category: Category,
    Message: Message,
    Reception: Reception,
    User: User,
    Organization: Organization,
    Geoloc: Geoloc,
    AppSetting: AppSetting,
    Dashboard: Dashboard,
    
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
