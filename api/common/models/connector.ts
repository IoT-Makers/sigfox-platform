import { Model } from '@mean-expert/model';
import {log} from 'util';
/**
 * @module Connector
 * @description
 * Write a useful Connector Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    /*testConnection: {
      accepts: [
        {arg: 'name', type: 'string', required: true, description: 'The connector name.'},
        {arg: 'login', type: 'string', required: true, description: 'The connector login.'},
        {arg: 'password', type: 'string', required: true, description: 'The connector password.'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/test-connection',
        verb: 'get'
      },
      returns: {type: [], root: true}
    }*/
  }
})

class Connector {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Connector: Before Save');
    const name = ctx.instance.name;
    const login = ctx.instance.login;
    const password = ctx.instance.password;
    if (name === 'sigfox-api') {
      this.testConnection(name, login, password, next);
    } else {
      next();
    }
  }

  // Test connector connection
  testConnection(name: string, login: string, password: string, next: Function): void {
    if (name === 'sigfox-api') {
      const credentials = new Buffer(login + ':' + password).toString('base64');

      this.model.app.dataSources.sigfox.testConnection(credentials).then((result: any) => {
        next(null, result);
      }).catch((err: any) => {
        next(err, null);
      });
    } else {
      next(null, 'Not implemented yet.');
    }
  }
}

module.exports = Connector;
