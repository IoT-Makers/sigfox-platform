import { Model } from '@mean-expert/model';
const app = require('../../server/server.js');

/**
 * @module Organization
 * @description
 * Write a useful organization Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' },
    afterRemoteLinkDevice: {name: 'prototype.__link__Devices', type: 'afterRemote'},
    afterRemoteUnlinkDevice: {name: 'prototype.__unlink__Devices', type: 'afterRemote'}
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class Organization {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('organization: Before Save');
    console.log(ctx);
    next();
  }

  afterRemoteLinkDevice(ctx: any, data: any, next: Function): void {
    const Message = this.model.app.models.Message;
    const Organization = app.models.Organization;

    //console.log(Organization.prototype.__link__Messages);
    //console.log(ctx);
    Message.find({where: {deviceId: data.deviceId}, fields: {'id': true}}, function (err: any, messages: any) {
      //console.log(messages);
      Organization.findById(data.organizationId, function(err: any, orga:any) {
        console.log(orga);
        messages.forEach((message: any) => {
          orga.Messages.add(message.id, function (err: any, result: any) {
            console.log(result);
          });
        });
      });

    });
    next();
     //console.log(ctx);
  }

  afterRemoteUnlinkDevice(ctx: any, data: any, next: Function): void {
    const Message = this.model.app.models.Message;
    const Organization = app.models.Organization;

    //console.log(Organization.prototype.__link__Messages);
    //console.log(ctx);
    Message.find({where: {deviceId: data.deviceId}, fields: {id: true}}, function (err: any, messages: any) {
      //console.log(messages);
      Organization.findById(data.organizationId, function(err: any, orga: any) {
        //console.log(orga);
        messages.forEach((message: any) => {
          orga.Messages.remove(message.id, function (err: any, result: any) {
            //console.log(result);
          });
        });
      });

    });
    next();
    //console.log(ctx);
  }

  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = Organization;
