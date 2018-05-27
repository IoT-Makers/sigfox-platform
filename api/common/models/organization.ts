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
    beforeRemoteGetMessages: {name: 'prototype.__get__Messages', type: 'beforeRemote'}
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

    //TODO: loopback organization.Messages(filter is broken for large data tables, can't efficiently fetch with a limit because it retrieves all messages before ordering them...
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


  // TODO: optimize OrganizationMessage
  getFilteredMessages(organizationId: string, filter: any, req: any, next: Function): void {
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
        },
        include: ['Devices']
      }, (err: any, organization: any) => {
        if (!err && organization) {

          if (filter.where && filter.where.deviceId) {

            organization.toJSON().Devices.forEach((device: any) => {
              if (device.id === filter.where.deviceId) {
                Message.find(filter, (err: any, messages: any) => {
                  if (!err) {
                    //console.log(messages);
                    next(null, messages);
                  } else {
                    next(err);
                  }
                });
                return;
              }
            });
            /*organization.Devices.findOne({where: filter.where}, (err: any, organizationDevice: any) => {
              console.error(organizationDevice);
              if (!err && organizationDevice) {
                Message.find(filter, (err: any, messages: any) => {
                  if (!err) {
                    //console.log(messages);
                    next(null, messages);
                  } else {
                    next(err);
                  }
                });
              } else {
                next(err);
              }
            });*/

          } else {

            const devicesIds: any[] = [];
            organization.toJSON().Devices.forEach((device: any) => {
              devicesIds.push(device.id);
            });

            filter.where = {deviceId: {inq: devicesIds}};
            Message.find(filter, (err: any, messages: any) => {
              if (!err) {
                //console.log(messages);
                next(null, messages);
              } else {
                next(err);
              }
            });


            /*organization.Messages.find(filter, (err: any, organizationMessages: any) => {
              if (!err) {
                console.log(organizationMessages);
                next(null, organizationMessages);
                /!* const messagesIds: any[] = [];
                 organizationMessages.forEach((orgMsg: any) => {
                   messagesIds.push(orgMsg.id);
                 });
                 console.log(messagesIds);
                 Message.find({where: {id: {inq: messagesIds}}, order: 'createdAt DESC', include: ['Device', 'Geolocs']}, (err: any, messages: any) => {
                   if (!err) {
                     console.log(messages);
                     next(null, messages);
                   } else {
                     console.error(err);
                     next(err);
                   }
                 });*!/
              } else {
                next(err);
              }
            });*/
          }
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
