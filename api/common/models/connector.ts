import {Model} from '@mean-expert/model';
const utils = require('../../node_modules/loopback/lib/utils.js');
const SALT_WORK_FACTOR = 10;
const crypto = require('crypto');
const MAX_PASSWORD_LENGTH = 72;
let bcrypt: any;
try {
  // Try the native module first
  bcrypt = require('bcrypt');
  // Browserify returns an empty object
  if (bcrypt && typeof bcrypt.compare !== 'function') {
    bcrypt = require('bcryptjs');
  }
} catch (err) {
  // Fall back to pure JS impl
  bcrypt = require('bcryptjs');
}
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
    const type = ctx.instance.type;
    const login = ctx.instance.login;
    const password = ctx.instance.password;

    if (type === 'sigfox-api') {
      this.testConnection(type, login, password, next);
    } else {
      // Encrypt the password to be stored
      /*
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      ctx.instance.password = bcrypt.hashSync(password, salt);
      */
      next();
    }
  }

  // Test connector connection
  testConnection(type: string, login: string, password: string, next: Function): void {
    if (type === 'sigfox-api') {
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

    /**
     * Compare the given `password` with the users hashed password.
     *
     * @param {String} password The plain text password
     * @callback {Function} callback Callback function
     * @param {Error} err Error object
     * @param {Boolean} isMatch Returns true if the given `password` matches record
     * @promise
     */

    hasPassword = function(plain: any, fn: any) {
      fn = fn || utils.createPromiseCallback();
      if (this.password && plain) {
        bcrypt.compare(plain, this.password, function(err: any, isMatch: boolean) {
          if (err) return fn(err);
          fn(null, isMatch);
        });
      } else {
        fn(null, false);
      }
      return fn.promise;
    };

}

module.exports = Connector;
