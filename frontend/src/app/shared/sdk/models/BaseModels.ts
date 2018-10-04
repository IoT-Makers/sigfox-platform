/* tslint:disable */

import { AccessToken, AccessTokenInterface } from './AccessToken';
export * from './AccessToken';



declare var Object: any;
export interface LoopBackFilter {
  fields?: any;
  include?: any;
  limit?: any;
  order?: any;
  skip?: any;
  offset?: any;
  where?: any;
}

export class SDKToken implements AccessTokenInterface {
  id: any = null;
  ttl: number = null;
  scopes: any = null;
  created: any = null;
  userId: any = null;
  user: any = null;
  rememberMe: boolean = null;
  constructor(data?: AccessTokenInterface) {
    Object.assign(this, data);
  }
}
/**
* This GeoPoint represents both, LoopBack and MongoDB GeoPoint
**/
export interface GeoPoint  {
    lat?: number;
    lng?: number;
    type?: string;
    coordinates?: number[];
}

export interface StatFilter {
    range: string,
    custom?: {
      start: string,
      end: string
    },
    where?: {},
    groupBy?: string
}
