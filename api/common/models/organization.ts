import {Model} from '@mean-expert/model';

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
    beforeDelete: { name: 'before delete', type: 'operation' },
    afterRemoteLinkDevice: {name: 'prototype.__link__Devices', type: 'afterRemote'},
    afterRemoteUnlinkDevice: {name: 'prototype.__unlink__Devices', type: 'afterRemote'}
  },
  remotes: { }
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
      Organization.findById(data.organizationId, function(err: any, orga: any) {
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
          /**
           * TODO: check if its not better to use: orga.Messages.remove(message, function...)
           */
          orga.Messages.remove(message.id, function (err: any, result: any) {
            //console.log(result);
          });
        });
      });

    });
    next();
    //console.log(ctx);
  }

  // Before delete category, remove category organizaton links
  beforeDelete(ctx: any, next: Function): void {
    // Models
    const User = this.model.app.models.User;
    const Organization = this.model;
    const Category = this.model.app.models.Category;
    const Device = this.model.app.models.Device;
    const Message = this.model.app.models.Message;

    const organizationId = ctx.where.id;

    /*Organization.findOne({
      where: {id: organizationId},
      include: ['Members', 'Categories', 'Devices', 'Messages', 'Dashboards']
    }, (err: any, organization: any) => {
      // console.log(category);
      if (!err) {
        organization.toJSON().Members.forEach((member: any) => {
          organization.Members.remove(member.id, (err: any) => {
            console.log('Unlinked members from organization');
          });
        });
      }
    });*/
    next();
  }
}

module.exports = Organization;
