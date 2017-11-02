/* tslint:disable */
import { Injectable } from '@angular/core';
import { AccessToken } from '../../models/AccessToken';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { Device } from '../../models/Device';
import { Parser } from '../../models/Parser';
import { Category } from '../../models/Category';
import { Message } from '../../models/Message';
import { BaseStation } from '../../models/BaseStation';
import { User } from '../../models/User';
import { Organization } from '../../models/Organization';
import { Geoloc } from '../../models/Geoloc';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    AccessToken: AccessToken,
    RoleMapping: RoleMapping,
    Role: Role,
    Device: Device,
    Parser: Parser,
    Category: Category,
    Message: Message,
    BaseStation: BaseStation,
    User: User,
    Organization: Organization,
    Geoloc: Geoloc,
    
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
