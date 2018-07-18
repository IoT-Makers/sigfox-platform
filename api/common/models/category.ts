import {Model} from '@mean-expert/model';

const moment = require('moment');
const json2csv = require('json2csv').parse;

/**
 * @module Category
 * @description
 * Write a useful Category Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' },
    beforeDelete: { name: 'before delete', type: 'operation' }
  },
  remotes: {
    download: {
      accepts: [
        {arg: 'categoryId', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'type', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'res', type: 'object', http: {source: 'res'}}
      ],
      http: {
        path: '/download/:categoryId/:type',
        verb: 'get'
      },
      returns: {type: 'object', root: true}
    },
    downloadFromOrganization: {
      accepts: [
        {arg: 'organizationId', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'categoryId', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'type', required: true, type: 'string', http: {source: 'path'}},
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'res', type: 'object', http: {source: 'res'}}
      ],
      http: {
        path: '/download/:organizationId/:categoryId/:type',
        verb: 'get'
      },
      returns: {type: 'object', root: true}
    }
  }
})

class Category {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Category: Before Save');
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
    }
    next();
  }

  // Before delete category, remove category organizaton links
  beforeDelete(ctx: any, next: Function): void {
    // Models
    const Category = this.model;

    Category.findOne({where: {id: ctx.where.id}, include: 'Organizations'}, (err: any, category: any) => {
      // console.log(category);
      if (!err) {
        if (category && category.Organizations) {
          category.toJSON().Organizations.forEach((orga: any) => {
            category.Organizations.remove(orga.id, (err: any, result: any) => {
              if (!err) {
                console.log('Unlinked category from organization (' + orga.name + ')');
              }
            });
          });
        }
        next(null, 'Unlinked category from organization');
      } else {
        next(err);
      }
    });
  }


  download(categoryId: string, type: string, req: any, res: any, next: Function) {
    // Model
    const Category = this.model;
    const Device = this.model.app.models.Device;

    if ((type !== 'csv'
      && type !== 'json')
      || typeof categoryId === 'undefined') {
      res.send('Missing "type" ("csv" or "json"), "categoryId"');
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    Category.findOne(
      {
        where: {
          and: [
            {userId: userId},
            {id: categoryId}
          ]
        },
        include: ['Devices']
      }, (err: any, category: any) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else if (category) {
          category = category.toJSON();

          const today = moment().format('YYYY.MM.DD');
          const filename = today + '_' + category.name + '_export.csv';
          res.setTimeout(600000);
          res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
          res.set('Content-Type', 'application/force-download');
          res.set('Content-Type', 'application/octet-stream');
          res.set('Content-Type', 'application/download');
          res.set('Content-Disposition', 'attachment;filename=' + filename);
          res.set('Content-Transfer-Encoding', 'binary');

          const data: any = [];
          let csv: any = [];
          const options: any = {
            fields: []
          };
          options.fields.push('deviceId');
          options.fields.push('seqNumber');
          options.fields.push('createdAt');
          options.fields.push('year'); //
          options.fields.push('month'); //
          options.fields.push('day'); //
          options.fields.push('hours'); //
          options.fields.push('minutes'); //
          options.fields.push('seconds'); //
          options.fields.push('data');
          options.fields.push('ack');
          options.fields.push('data_downlink');

          let nbProcessedDevices = 0;
          category.Devices.forEach((device: any, i: number) => {
            Device.findOne(
              {
                where: {
                  and: [
                    {userId: userId},
                    {id: device.id}
                  ]
                },
                include: [{
                  relation: 'Messages',
                  scope: {
                    order: 'createdAt DESC',
                    include: [{
                      relation: 'Geolocs',
                      scope: {
                        limit: 5,
                        order: 'createdAt DESC'
                      }
                    }]
                  }
                }]
              }, (err: any, device: any) => {
                if (err) {
                  console.error(err);
                  res.send(err);
                } else if (device) {
                  device = device.toJSON();
                  device.Messages.forEach((message: any) => {
                    const obj: any = {};

                    obj.deviceId = message.deviceId;
                    obj.seqNumber = message.seqNumber;
                    obj.createdAt = moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss');
                    obj.year = new Date(message.createdAt).getFullYear();
                    obj.month = new Date(message.createdAt).getMonth() + 1;
                    obj.day = new Date(message.createdAt).getDate();
                    obj.hours = new Date(message.createdAt).getHours();
                    obj.minutes = new Date(message.createdAt).getMinutes();
                    obj.seconds = new Date(message.createdAt).getSeconds();
                    obj.data = message.data;
                    obj.ack = message.ack;
                    obj.data_downlink = message.data_downlink;

                    if (message.data_parsed) {
                      message.data_parsed.forEach((p: any) => {
                        if (options.fields.indexOf(p.key) === -1) {
                          options.fields.push(p.key);
                        }
                        obj[p.key] = p.value;
                      });
                    }
                    if (message.Geolocs) {
                      message.Geolocs.forEach((geoloc: any) => {
                        if (options.fields.indexOf('lat_' + geoloc.type) === -1) {
                          options.fields.push('lat_' + geoloc.type);
                          options.fields.push('lng_' + geoloc.type);
                          options.fields.push('accuracy_' + geoloc.type);
                        }
                        obj['lat_' + geoloc.type] = geoloc.location.lat;
                        obj['lng_' + geoloc.type] = geoloc.location.lng;
                        obj['accuracy_' + geoloc.type] = geoloc.accuracy;
                      });
                    }
                    data.push(obj);
                  });
                  ++nbProcessedDevices;
                  // If all devices are treated
                  if (data.length > 0 && nbProcessedDevices === category.Devices.length) {
                    try {
                      csv = json2csv(data, options);
                      console.log('Done CSV processing.');
                    } catch (err) {
                      console.error(err);
                    }
                    //res.status(200).send({data: csv});
                    res.send(csv);
                    //next();
                  }
                } else if (i === category.Devices.length - 1) {
                  next(null, 'Device does not belong to user - not allowed');
                }
              });
          });
        } else {
          next(null, 'Error occured - not allowed');
        }
      });
  }

  downloadFromOrganization(organizationId: string, categoryId: string, type: string, req: any, res: any, next: Function) {
    // Model
    const Organization = this.model.app.models.Organization;
    const Device = this.model.app.models.Device;

    if ((type !== 'csv'
      && type !== 'json')
      || typeof categoryId === 'undefined'
      || typeof organizationId === 'undefined') {
      res.send('Missing "type" ("csv" or "json"), "categoryId"');
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    Organization.findOne(
      {
        where: {
          id: organizationId
        },
        include: [{
          relation: 'Categories',
          scope: {
            order: 'createdAt DESC',
            where: {id: categoryId},
            limit: 1,
            include: [{
              relation: 'Devices',
              scope: {
                limit: 100,
                order: 'updatedAt DESC'
              }
            }]
          }
        }]
      }, (err: any, organization: any) => {
        organization = organization.toJSON();
        if (err) {
          console.error(err);
          res.send(err);
        } else if (organization && organization.Categories.length >= 1) {
          const category = organization.Categories[0];
          const devices = category.Devices;

          const today = moment().format('YYYY.MM.DD');
          const filename = today + '_' + category.id + '_export.csv';
          res.setTimeout(600000);
          res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
          res.set('Content-Type', 'application/force-download');
          res.set('Content-Type', 'application/octet-stream');
          res.set('Content-Type', 'application/download');
          res.set('Content-Disposition', 'attachment;filename=' + filename);
          res.set('Content-Transfer-Encoding', 'binary');

          const data: any = [];
          let csv: any = [];
          const options: any = {
            fields: []
          };
          options.fields.push('deviceId');
          options.fields.push('seqNumber');
          options.fields.push('createdAt');
          options.fields.push('year'); //
          options.fields.push('month'); //
          options.fields.push('day'); //
          options.fields.push('hours'); //
          options.fields.push('minutes'); //
          options.fields.push('seconds'); //
          options.fields.push('data');
          options.fields.push('ack');
          options.fields.push('data_downlink');

          let nbProcessedDevices = 0;
          devices.forEach((device: any, i: number) => {
            Device.findOne(
              {
                where: {
                  id: device.id
                },
                include: [{
                  relation: 'Messages',
                  scope: {
                    order: 'createdAt DESC',
                    include: [{
                      relation: 'Geolocs',
                      scope: {
                        limit: 5,
                        order: 'createdAt DESC'
                      }
                    }]
                  }
                }]
              }, (err: any, device: any) => {
                if (err) {
                  console.error(err);
                  res.send(err);
                } else {
                  device = device.toJSON();
                  device.Messages.forEach((message: any) => {
                    const obj: any = {};

                    obj.deviceId = message.deviceId;
                    obj.seqNumber = message.seqNumber;
                    obj.createdAt = moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss');
                    obj.year = new Date(message.createdAt).getFullYear();
                    obj.month = new Date(message.createdAt).getMonth() + 1;
                    obj.day = new Date(message.createdAt).getDate();
                    obj.hours = new Date(message.createdAt).getHours();
                    obj.minutes = new Date(message.createdAt).getMinutes();
                    obj.seconds = new Date(message.createdAt).getSeconds();
                    obj.data = message.data;
                    obj.ack = message.ack;
                    obj.data_downlink = message.data_downlink;

                    if (message.data_parsed) {
                      message.data_parsed.forEach((p: any) => {
                        if (options.fields.indexOf(p.key) === -1) {
                          options.fields.push(p.key);
                        }
                        obj[p.key] = p.value;
                      });
                    }
                    if (message.Geolocs) {
                      message.Geolocs.forEach((geoloc: any) => {
                        if (options.fields.indexOf('lat_' + geoloc.type) === -1) {
                          options.fields.push('lat_' + geoloc.type);
                          options.fields.push('lng_' + geoloc.type);
                          options.fields.push('accuracy_' + geoloc.type);
                        }
                        obj['lat_' + geoloc.type] = geoloc.location.lat;
                        obj['lng_' + geoloc.type] = geoloc.location.lng;
                        obj['accuracy_' + geoloc.type] = geoloc.accuracy;
                      });
                    }
                    data.push(obj);
                  });
                  ++nbProcessedDevices;
                  // If all devices are treated
                  if (data.length > 0 && nbProcessedDevices === devices.length) {
                    try {
                      csv = json2csv(data, options);
                      console.log('Done CSV processing.');
                    } catch (err) {
                      console.error(err);
                    }
                    //res.status(200).send({data: csv});
                    res.send(csv);
                    //next();
                  }
                }
              });
          });
        } else {
          next(null, 'Error occured - not allowed');
        }
      });
  }
}

module.exports = Category;
