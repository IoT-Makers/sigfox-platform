import {Model} from '@mean-expert/model';

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
    beforeRemoteGetMessages: {name: 'prototype.__get__Messages', type: 'beforeRemote'},
    afterRemoteLinkDevice: {name: 'prototype.__link__Devices', type: 'afterRemote'},
    afterRemoteUnlinkDevice: {name: 'prototype.__unlink__Devices', type: 'afterRemote'}
  },
  remotes: {
    getFilteredMessages: {
      accepts: [
        {arg: 'id', type: 'string', required: true, description: 'Organization id'},
        {arg: 'filter', type: 'object', required: true, description: 'Message filter'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/:id/FilteredMessages',
        verb: 'get'
      },
      returns: {type: ['Message'], root: true}
    }
  }
})

class Organization {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {

    //TODO: loopback organization.Messages(filter is broken for large data tables, can't efficiently fetch with a limit...
    /*this.model.once('attached', () => {
      this.model.findOne({where: {id: ''}}, (err: any, organization: any) => {
        // console.log(category);
        if (!err && organization) {
          organization.Messages(
            {limit: 1}, (err: any, messages: any) => {
              console.log(messages);
            });
          //console.log(organization.toJSON().Messages.length);
          /!*organization.toJSON().Messages.forEach((message: any) => {
            organization.Messages.remove(message.id, (err: any) => {
              console.log('Unlinked messages from organization');
            });
          });*!/
        } else {
          console.error(err);
        }
      });
    });*/
  }

  getFilteredMessages(organizationId: string, filter: string, req: any, next: Function): void {
    // Models
    const Organization = this.model;
    const Message = this.model.app.models.Message;

    const userId = req.accessToken.userId;
    if (!userId) {
      next(null, 'Please login or use a valid access token.');
    }

    Organization.findOne(
      {
        where: {
          id: organizationId
        }
      }, (err: any, organization: any) => {
        if (!err && organization) {
          organization.Messages.find(filter, (err: any, messages: any) => {
            if (!err) {
              next(null, messages);
            } else {
              next(err);
            }
          });
        } else {
          next(err);
        }
      });
  }


  beforeRemoteGetMessages(ctx: any, data: any, next: Function): void {
    /*//console.log(ctx);
    // Do not remove, avoids the application to crash
    console.log('orga', ctx);
    /!*console.log('orga', ctx.args.filter);
    console.log('orga', ctx.ctorArgs);
    console.log('orga', ctx.filter);
    console.log('orga', ctx.limit);
    console.log('orga', ctx.query);*!/

    if (!ctx.query) {
      ctx.query = {limit: 1};
    } else {
      ctx.query.limit = 1;
    }
    ctx.limit = 1;
    ctx.options.filter = {limit: 1};
    ctx.options.limit = 1;*/
    next();
  }

  beforeSave(ctx: any, next: Function): void {
    console.log('organization: Before Save');
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
    }
    next();
  }

  afterRemoteLinkDevice(ctx: any, data: any, next: Function): void {
    const Message = this.model.app.models.Message;
    const Organization = this.model;

    //console.log(Organization.prototype.__link__Messages);
    //console.log(ctx);
    Message.find({where: {deviceId: data.deviceId}, fields: {'id': true}}, (err: any, messages: any) => {
      //console.log(messages);
      Organization.findById(data.organizationId, (err: any, orga: any) => {
        console.log(orga);
        messages.forEach((message: any) => {
          orga.Messages.add(message.id, (err: any, result: any) => {
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
    const Organization = this.model.app.models.Organization;

    //console.log(Organization.prototype.__link__Messages);
    //console.log(ctx);
    Message.find({where: {deviceId: data.deviceId}, fields: {id: true}}, (err: any, messages: any) => {
      //console.log(messages);
      Organization.findById(data.organizationId, (err: any, orga: any) => {
        //console.log(orga);
        messages.forEach((message: any) => {
          /**
           * TODO: check if its not better to use: orga.Messages.remove(message, function...)
           */
          orga.Messages.remove(message.id, (err: any, result: any) => {
            //console.log(result);
          });
        });
      });

    });
    next();
    //console.log(ctx);
  }

  // Before delete, remove all organizaton models links
  beforeDelete(ctx: any, next: Function): void {
    // Models
    const User = this.model.app.models.User;
    const Organization = this.model;
    const Category = this.model.app.models.Category;
    const Device = this.model.app.models.Device;
    const Message = this.model.app.models.Message;

    const organizationId = ctx.where.id;

    Organization.findOne({
      where: {id: organizationId},
      include: ['Members', 'Categories', 'Devices', 'Messages', 'Dashboards']
    }, (err: any, organization: any) => {
      // console.log(category);
      if (!err && organization) {
        organization.toJSON().Members.forEach((member: any) => {
          organization.Members.remove(member.id, (err: any) => {
            console.log('Unlinked members from organization');
          });
        });
        organization.toJSON().Categories.forEach((category: any) => {
          organization.Categories.remove(category.id, (err: any) => {
            console.log('Unlinked categories from organization');
          });
        });
        organization.toJSON().Devices.forEach((device: any) => {
          organization.Devices.remove(device.id, (err: any) => {
            console.log('Unlinked devices from organization');
          });
        });
        organization.toJSON().Messages.forEach((message: any) => {
          organization.Messages.remove(message.id, (err: any) => {
            console.log('Unlinked messages from organization');
          });
        });
      } else {
        console.error(err);
      }
    });
    next();
  }
}

module.exports = Organization;
