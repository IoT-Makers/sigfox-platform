import {Model} from "@mean-expert/model";
import * as _ from "lodash";
import {decrypt} from "./utils";
import {RabbitPub} from '../../server/RabbitPub';

const moment = require("moment");
const loopback = require("loopback");
const json2csv = require("json2csv").parse;

/**
 * @module Devicex
 * @description
 * Write a useful Device Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: "before save", type: "operation"},
    afterSave: {name: "after save", type: "operation"},
    beforeDelete: {name: "before delete", type: "operation"},
    afterDelete: {name: "after delete", type: "operation"},
    afterRemoteLinkOrganizations: {name: "prototype.__link__Organizations", type: "afterRemote"},
    afterRemoteUnlinkOrganizations: {name: "prototype.__unlink__Organizations", type: "afterRemote"}
  },
  remotes: {
    addDeviceMessagesToOrganization: {
      http: {path: '/add-device-messages-to-organization', verb: 'post'},
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'deviceId'},
        {arg: 'organizationId', type: 'string', required: true, description: 'organizationId'}
      ]
    },
    removeDeviceMessagesFromOrganization: {
      http: {path: '/remove-device-messages-from-organization', verb: 'post'},
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'deviceId'},
        {arg: 'organizationId', type: 'string', required: true, description: 'organizationId'}
      ]
    },
    download: {
      accepts: [
        {arg: "id", required: true, type: "string", http: {source: "path"}},
        {arg: "type", required: true, type: "string", http: {source: "path"}},
        {arg: "tosend", required: true, type: "string", http: {source: "path"}},
        {arg: "req", type: "object", http: {source: "req"}},
        {arg: "res", type: "object", http: {source: "res"}}
      ],
      http: {
        path: "/download/:id/:type/:tosend",
        verb: "get"
      },
      returns: {type: "object", root: true}
    },
    getColumns: {
      accepts: [
        {arg: "id", required: true, type: "string", http: {source: "path"}},
        {arg: "type", required: true, type: "string", http: {source: "path"}},
        {arg: "req", type: "object", http: {source: "req"}},
        {arg: "res", type: "object", http: {source: "res"}}
      ],
      http: {
        path: "/download/:id/:type",
        verb: "get"
      },
      returns: {type: "object", root: true}
    },
    getMessagesFromSigfoxBackend: {
      accepts: [
        {arg: "id", type: "string", required: true, description: "Device Id"},
        {arg: "limit", type: "number", required: false, description: "Limit retrieved messages (max 100)"},
        {arg: "before", type: "number", description: "Before"},
        {arg: "req", type: "object", http: {source: "req"}}
      ],
      http: {
        path: "/:id/messages-from-sigfox-backend",
        verb: "get"
      },
      returns: {type: [], root: true}
    },
  },
})

class Device {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  private addDeviceMessagesToOrganization(deviceId: string, organizationId: string): void {
    // console.log('addDeviceMessagesToOrganization');
    const Message = this.model.app.models.Message;
    const Organization = this.model.app.models.Organization;
    Message.find({where: {deviceId: deviceId}, fields: {id: true, createdAt: true}}, (err: any, messages: any) => {
      if (!err && messages.length > 0) {
        Organization.findById(organizationId, (err: any, orga: any) => {
          if (!err) {
            const db = Message.dataSource.connector.db;
            const OrganizationMessage = db.collection('OrganizationMessage');
            OrganizationMessage.insertMany(messages.map((x: any) => ({
              messageId: x.id,
              deviceId: deviceId,
              createdAt: x.createdAt,
              organizationId: orga.id
            })), (err: any, result: any) => {
              if (err) console.error(err);
            });
          }
        });
      }
    });
  }

  public afterRemoteLinkOrganizations(ctx: any, data: any, next: Function): void {
    // console.log('device afterRemoteLinkOrganizations');
    this.addDeviceMessagesToOrganization(data.deviceId, data.organizationId);
    next();
  }

  private removeDeviceMessagesFromOrganization(deviceId: string, organizationId: string): void {
    const Message = this.model.app.models.Message;
    const Organization = this.model.app.models.Organization;
    Organization.findById(organizationId, (err: any, org: any) => {
      const db = Message.dataSource.connector.db;
      // Delete organization shared messages
      const OrganizationMessage = db.collection('OrganizationMessage');
      OrganizationMessage.deleteMany({deviceId: deviceId, organizationId: org.id},
        (err: Error, info: Object) => {
          if (err) console.error(err);
        });
      // Delete organization shared alerts
      const OrganizationAlert = db.collection('OrganizationAlert');
      OrganizationAlert.deleteMany({deviceId: deviceId, organizationId: org.id},
        (err: Error, info: Object) => {
          if (err) console.error(err);
        });
    });
  }

  public afterRemoteUnlinkOrganizations(ctx: any, data: any, next: Function): void {
    // console.log('device afterRemoteUnlinkOrganizations');
    this.removeDeviceMessagesFromOrganization(data.deviceId, data.organizationId);
    next();
  }

  public getMessagesFromSigfoxBackend(deviceId: string, limit: number, before: number, req: any, next: Function): void {
    // Models
    const Message = this.model.app.models.Message;
    const Geoloc = this.model.app.models.Geoloc;
    const Connector = this.model.app.models.Connector;

    const userId = req.accessToken.userId;

    if (!limit) limit = 100;

    Connector.findOne(
      {
        where: {
          userId,
          type: "sigfox-api",
        },
      },
      (err: any, connector: any) => {
        if (err) return next(err, null);
        else {
          if (connector) {
            const sigfoxApiLogin = connector.login;
            const sigfoxApiPassword = decrypt(connector.password);

            let reception: any[] = [];

            const credentials = new Buffer(sigfoxApiLogin + ":" + sigfoxApiPassword).toString("base64");

            this.model.app.dataSources.sigfox.getMessages(
              credentials,
              deviceId,
              (limit < 100) ? limit : 100,
              before ? before : new Date(),
            ).then((result: any) => {
              // console.log("Length: ", result.data.length);
              // console.log("Next: ", result.paging.next);
              result.data.forEach((messageInstance: any, msgCounter: number) => {
                reception = [];
                messageInstance.rinfos.forEach((o: any) => {
                  const rinfo: any = {
                    id: o.tap,
                    lat: o.lat,
                    lng: o.lng,
                    // RSSI: o.rssi,
                    linkQuality: messageInstance.linkQuality,
                    SNR: messageInstance.snr
                  };
                  reception.push(rinfo);
                });

                let message = new Message;
                message.id = messageInstance.device + messageInstance.time + messageInstance.seqNumber;
                message.userId = userId;
                message.deviceId = messageInstance.device;
                message.time = messageInstance.time;
                message.seqNumber = messageInstance.seqNumber;
                message.data = messageInstance.data;
                message.reception = reception;
                message.createdAt = new Date(messageInstance.time * 1000);
                message.updatedAt = new Date(messageInstance.time * 1000);
                Message.create(
                  message,
                  (err: any, messagePostProcess: any) => { // callback
                    if (err) console.log(err);
                    else if (messageInstance.computedLocation) {
                      // Build the Geoloc object
                      const geoloc = new Geoloc;
                      geoloc.id = message.id + 'sigfox';
                      geoloc.type = 'sigfox';
                      geoloc.location = new loopback.GeoPoint({
                        lat: messageInstance.computedLocation.lat,
                        lng: messageInstance.computedLocation.lng
                      });
                      geoloc.accuracy = messageInstance.computedLocation.radius;
                      geoloc.createdAt = messagePostProcess.createdAt;
                      geoloc.userId = messagePostProcess.userId;
                      geoloc.messageId = messagePostProcess.id;
                      geoloc.deviceId = messagePostProcess.deviceId;
                      // Find or create a new Geoloc
                      Geoloc.upsert(
                        geoloc,
                        (err: any, geolocInstance: any) => {
                          if (err) console.error(err);
                        });
                    }
                  });

                // Done
                if (msgCounter === result.data.length - 1) {
                  this.updateDeviceSuccessRate(messageInstance.device);
                  return next(null, result);
                }
              });
            }).catch((err: any) => {
              if (err.statusCode === "403") return next(err, "Your Sigfox API credentials are not allowed to do so.");
              else return next(err, null);
            });
          } else return next(err, "Please refer your Sigfox API connector first.");
        }
      });
  }

  public updateDeviceSuccessRate(deviceId: string) {
    // Model
    const Device = this.model;
    Device.findOne(
      {
        where: {id: deviceId},
        include: [{
          relation: "Messages",
          scope: {
            order: "createdAt DESC",
            limit: 100,
          },
        }],
      },
      function (err: any, device: any) {
        if (err) console.error(err);
        else {
          device = device.toJSON();
          let attendedNbMessages: number;
          attendedNbMessages = device.Messages[0].seqNumber - device.Messages[device.Messages.length - 1].seqNumber + 1;
          if (device.Messages[device.Messages.length - 1].seqNumber > device.Messages[0].seqNumber) {
            attendedNbMessages += 4095;
          }
          device.successRate = (((device.Messages.length / attendedNbMessages) * 100)).toFixed(2);

          Device.upsert(
            device,
            (err: any, deviceUpdated: any) => {
              if (err) console.error(err);
              else console.log("Updated device as: " + deviceUpdated);
            });
        }
      });
  }

  public download(deviceId: string, type: string, tosend: string, req: any, res: any, next: Function): void {
    // Model
    const Message = this.model.app.models.Message;
    const Device = this.model;


    if ((type !== "csv"
      && type !== "json")
      || typeof deviceId === "undefined") {
      res.send('Missing "type" ("csv" or "json"), "deviceId"');
    }

    console.log("TYPE VALUE",type);
    console.log("CAT VALUE", deviceId);
    console.log("TOSEND VALUE",tosend);

    Device.findOne(
      {
        where: {
          and: [
            { id: deviceId },
          ],
        },
        include: [{
          relation: "Messages",
          scope: {
            order: "createdAt DESC",
            include: [{
              relation: "Geolocs",
              scope: {
                limit: 5,
                order: "createdAt DESC",
              },
            }],
          },
        }],
      }, (err: any, device: any) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else if (device) {
          device = device.toJSON();
          console.log("name of device",device.name);


          let hasProperty = false;
          let nbProperty = 0;
          let propertyKey: any = [];
          let propertyValue: any = [];

          // Obtain the userId with the access token of ctx
          const userId = req.accessToken.userId;

          const today = moment().format('YYYYMMDD');
          const filename = deviceId + '_' + today + '.csv';
          res.setTimeout(600000);
          res.set("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
          res.set("Content-Type", "application/force-download");
          res.set("Content-Type", "application/octet-stream");
          res.set("Content-Type", "application/download");
          res.set("Content-Disposition", "attachment;filename=" + filename);
          res.set("Content-Transfer-Encoding", "binary");


          if (device.properties){

            device.properties.forEach((property: any) => {
              hasProperty = true;
              propertyKey[nbProperty] = property.key;
              propertyValue[nbProperty] = property.value;
              ++nbProperty;
            });
          }

          Message.find(
            {
              where: {
                and: [
                  // {userId: userId},
                  {deviceId},
                ],
              },
              include: ["Geolocs"],
              order: "createdAt DESC",
            }, (err: any, messages: any) => {
              if (err) {
                console.error(err);
                res.send(err);
                next();
              } else if (messages) {
                const data: any = [];
                let csv: any = [];
                let columns : any = [];
                const options: any = {
                  fields: [],
                };
      
                columns = tosend.split(',');
                //console.log("messages", messages)
                messages.forEach((message: any) => {
                  message = message.toJSON();
                  const obj: any = {};
                  const date = new Date(message.createdAt);

                  if (hasProperty) {
                    let nb = 0;
                    while (nb < nbProperty) {
                      obj[propertyKey[nb]] = propertyValue[nb];
                      nb++;
                    }
                  }
      
                  obj.Name = device.name;
                  obj.Time = moment(message.createdAt).format("HH:mm:ss");
                  obj.deviceId = message.deviceId;
                  obj.seqNumber = message.seqNumber;
                  obj.createdAt = moment(message.createdAt).format("DD-MMM-YY");
                  obj.timestamp = message.createdAt;
                  //obj.year = date.getFullYear();
                  //obj.month = date.getMonth() + 1;
                  //obj.day = date.getDate();
                  //obj.hours = date.getHours();
                  //obj.minutes = date.getMinutes();
                  //obj.seconds = date.getSeconds();
                  obj.data = message.data;
                  obj.ack = message.ack;
                  obj.data_downlink = message.data_downlink;
      
                  if (message.data_parsed) {
                    message.data_parsed.forEach((p: any) => {
                      obj[p.key] = p.value;
                    });
                  }
      
                  if (message.Geolocs) {
                    message.Geolocs.forEach((geoloc: any) => {
                      obj["lat_" + geoloc.type] = geoloc.location.lat;
                      obj["lng_" + geoloc.type] = geoloc.location.lng;
                      obj["accuracy_" + geoloc.type] = geoloc.accuracy;
                    });
                  }
      
                  if (message.reception) {
                    //Selection of the best RSSI value, with SNR and stationId associated
                    let nb = 1;
                    var lastRSSI : any;
                    message.reception.forEach((rec: any) => {
                      if (rec) {
                        if (obj["RSSI"] !== "undefined"){
                          if(nb === 1){
                            obj["RSSI"] = rec.RSSI;
                            lastRSSI = obj["RSSI"];
                            obj["stationId"] = rec.id;
                            obj["SNR"] = rec.SNR;
                          }
                          else {
                            if (rec.RSSI>lastRSSI){
                              obj["RSSI"] = rec.RSSI;
                              lastRSSI = obj["RSSI"];
                              obj["stationId"] = rec.id;
                              obj["SNR"] = rec.SNR;
                            }
                          }
                        }
                      }
                      nb++;
                    });
                  }
      
                  data.push(obj);
                });
                if (data.length > 0) {
                  try {
                    //csv = json2csv(data, options);
      
                    csv = json2csv(data, {fields: columns} );
                    console.log("Done CSV processing.");
                  } catch (err) {
                    console.error(err);
                  }
                }
                // res.status(200).send({data: csv});
                res.send(csv);
                //next();
              } else next(null, "Error occured - not allowed");
            });
        }
      }); 
  }

  public getColumns(deviceId: string, type: string, req: any, res: any, next: Function): void {
    // Model
    const Message = this.model.app.models.Message;
    const Device = this.model;
    console.log("deviceId", deviceId);
    if ((type !== "csv"
      && type !== "json")
      || typeof deviceId === "undefined") {
      res.send('Missing "type" ("csv" or "json"), "deviceId"');
    }
   
    Device.findOne(
      {
        where: {
          and: [
            { id: deviceId },
          ],
        },
        include: [{
          relation: "Messages",
          scope: {
            order: "createdAt DESC",
            include: [{
              relation: "Geolocs",
              scope: {
                limit: 5,
                order: "createdAt DESC",
              },
            }],
          },
        }],
      }, (err: any, device: any) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else if (device) {
          device = device.toJSON();
          console.log("name of device",device.name);
          
          let hasProperty = false;
          let nbProperty = 0;
          let propertyKey: any = [];
          let propertyValue: any = [];

          const options: any = {
            fields: [],
          };
          
          options.fields.push("createdAt");
          options.fields.push("Name");
          options.fields.push("Time")
          options.fields.push("deviceId");
          options.fields.push("seqNumber");
          options.fields.push("timestamp");
          //options.fields.push("year");
          //options.fields.push("month");
          //options.fields.push("day");
          //options.fields.push("hours");
          //options.fields.push("minutes");
          //options.fields.push("seconds");
          options.fields.push("data");
          options.fields.push("ack");
          options.fields.push("data_downlink");

          if (device.properties){

            device.properties.forEach((property: any) => {
              hasProperty = true;
              propertyKey[nbProperty] = property.key;
              propertyValue[nbProperty] = property.value;
              if (options.fields.indexOf(propertyKey[nbProperty]) === -1) {
                options.fields.push(propertyKey[nbProperty]);
              }
              ++nbProperty;
            });
          }

          Message.find(
            {
              where: {
                and: [
                  // {userId: userId},
                  {deviceId},
                ],
              },
              include: ["Geolocs"],
              order: "createdAt DESC",
            }, (err: any, messages: any) => {
              if (err) {
                console.error(err);
                res.send(err);
                next();
              } else if (messages) {
                messages.forEach((message: any) => {
                  message = message.toJSON();
      
                  if (message.data_parsed) {
                    message.data_parsed.forEach((p: any) => {
                      if (options.fields.indexOf(p.key) === -1) {
                        options.fields.push(p.key);
                      }
                    });
                  }
                  if (message.Geolocs) {
                    message.Geolocs.forEach((geoloc: any) => {
                      if (options.fields.indexOf("lat_" + geoloc.type) === -1) {
                        options.fields.push("lat_" + geoloc.type);
                        options.fields.push("lng_" + geoloc.type);
                        options.fields.push("accuracy_" + geoloc.type);
                      }
                    });
                  }
      
                  if (message.reception) {
      
                    message.reception.forEach((rec: any) => {
                      if (rec) {
                        if (options.fields.indexOf("stationId") === -1) {
                          options.fields.push("stationId");
                          options.fields.push("RSSI");
                          options.fields.push("SNR");
                        }
                      }
                    });
                  }
                });
                // res.status(200).send({data: csv});
                console.log("options fields avant res", options.fields)
                res.send(options.fields);
                //next();
              } else next(null, "Error occured - not allowed");
            });
        }});
    
  }

  public download1(deviceId: string, type: string, req: any, res: any, next: Function): void {
    // Model
    const Message = this.model.app.models.Message;
    console.log("deviceId", deviceId);
    if ((type !== "csv"
      && type !== "json")
      || typeof deviceId === "undefined") {
      res.send('Missing "type" ("csv" or "json"), "deviceId"');
    }


    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    const today = moment().format('YYYYMMDD');
    const filename = deviceId + '_' + today + '.csv';
    res.setTimeout(600000);
    res.set("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
    res.set("Content-Type", "application/force-download");
    res.set("Content-Type", "application/octet-stream");
    res.set("Content-Type", "application/download");
    res.set("Content-Disposition", "attachment;filename=" + filename);
    res.set("Content-Transfer-Encoding", "binary");

    Message.find(
      {
        where: {
          and: [
            // {userId: userId},
            {deviceId},
          ],
        },
        include: ["Geolocs"],
        order: "createdAt DESC",
      }, (err: any, messages: any) => {
        if (err) {
          console.error(err);
          res.send(err);
          next();
        } else if (messages) {
          const data: any = [];
          let csv: any = [];
          const options: any = {
            fields: [],
          };
          options.fields.push("seqNumber");
          options.fields.push("createdAt");
          options.fields.push("year");
          options.fields.push("month");
          options.fields.push("day");
          options.fields.push("hours");
          options.fields.push("minutes");
          options.fields.push("seconds");
          options.fields.push("data");
          options.fields.push("ack");
          options.fields.push("data_downlink");

          //console.log("messages", messages)

          messages.forEach((message: any) => {
            message = message.toJSON();
            const obj: any = {};
            const date = new Date(message.createdAt);

            obj.seqNumber = message.seqNumber;
            obj.createdAt = moment(message.createdAt).format("DD-MMM-YY HH:mm:ss");
            obj.year = date.getFullYear();
            obj.month = date.getMonth() + 1;
            obj.day = date.getDate();
            obj.hours = date.getHours();
            obj.minutes = date.getMinutes();
            obj.seconds = date.getSeconds();
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
                if (options.fields.indexOf("lat_" + geoloc.type) === -1) {
                  options.fields.push("lat_" + geoloc.type);
                  options.fields.push("lng_" + geoloc.type);
                  options.fields.push("accuracy_" + geoloc.type);
                }
                obj["lat_" + geoloc.type] = geoloc.location.lat;
                obj["lng_" + geoloc.type] = geoloc.location.lng;
                obj["accuracy_" + geoloc.type] = geoloc.accuracy;
              });
            }
            data.push(obj);
          });
          if (data.length > 0) {
            try {
              csv = json2csv(data, options);

              //csv = json2csv(data, {fields: columns} );
              console.log("Done CSV processing.");
            } catch (err) {
              console.error(err);
            }
          }
          // res.status(200).send({data: csv});
          res.send(csv);
          //next();
        } else next(null, "Error occured - not allowed");
      });
  }

  // Before delete device, remove category organizaton links
  public beforeDelete(ctx: any, next: Function): void {
    // Models
    const Device = this.model;
    const Geoloc = this.model.app.models.Geoloc;
    const Message = this.model.app.models.Message;
    const Alert = this.model.app.models.Alert;

    const deviceId = ctx.where.id;

    if (deviceId) {
      Device.findOne({where: {id: deviceId}, include: "Organizations"}, (err: any, device: any) => {
        // console.log(category);
        if (err) return next(err, null);
        else {
          if (device && device.Organizations) {
            const orgIds = device.toJSON().Organizations;
            orgIds.forEach((orga: any) => {
              device.Organizations.remove(orga.id, (err: any, result: any) => {
                if (!err) {
                  console.log("Unlinked device from organization (" + orga.name + ")");
                }
              });
            });
            const payload = {
              event: "device",
              content: device,
              action: "DELETE"
            };
            RabbitPub.getInstance().pub(payload, device.userId, orgIds.map((o: any) => o.id.toString()));
          }
          console.log("Unlinked device from organizations");
          return next();
        }
      });

      Message.destroyAll({deviceId}, (error: any, result: any) => {
        if (!error) console.log("Deleted all messages for device: " + deviceId);
      });
      Geoloc.destroyAll({deviceId}, (error: any, result: any) => {
        if (!error) console.log("Deleted all geolocs for device: " + deviceId);
      });
      Alert.destroyAll({deviceId}, (error: any, result: any) => {
        if (!error) console.log("Deleted all alerts for device: " + deviceId);
      });
    }
  }

  public afterDelete(ctx: any, next: Function): void {
    next();
  }

  public beforeSave(ctx: any, next: Function): void {
    const Device = this.model.app.models.Device;
    const Category = this.model.app.models.Category;

    if (ctx.data && ctx.data.id) {
      console.log("Device: Before Save: " + ctx.data.id);
      ctx.data.id = ctx.data.id.toUpperCase();
    } else if (ctx.instance && ctx.instance.id) {
      console.log("Device: Before Save: " + ctx.instance.id);
      ctx.instance.id = ctx.instance.id.toUpperCase();
      ctx.instance.createdAt = new Date();
    }
    const newDevice = ctx.data;
    const oldDevice = ctx.currentInstance;
    // If device is not being created, only updated
    if (!ctx.isNewInstance && newDevice && oldDevice) {
      // Device is being added to a category for the first time
      if (!oldDevice.categoryId && newDevice.categoryId) {
        Category.findById(newDevice.categoryId, {include: ["Organizations"]},
          (err: any, category: any) => {
            if (err) console.error(err);
            else if (category) {
              category = category.toJSON();
              if (category.Organizations) {
                // category is shared
                category.Organizations.forEach((org: any) => {
                  oldDevice.Organizations.add(org.id, {deviceId: newDevice.id}, () => {
                    Device.addDeviceMessagesToOrganization(newDevice.id, org.id);
                  });
                });
              }
            }
          });
      }
      // Device is being removed from a category
      else if (oldDevice.categoryId && newDevice.categoryId === '') {
        Category.findById(oldDevice.categoryId, {include: ["Organizations"]},
          (err: any, category: any) => {
            if (err) console.error(err);
            else if (category) {
              category = category.toJSON();
              if (category.Organizations) {
                // category is shared
                category.Organizations.forEach((org: any) => {
                  oldDevice.Organizations.remove(org.id, () => {
                    Device.removeDeviceMessagesFromOrganization(oldDevice.id, org.id);
                  });
                });
              }
            }
          });
      }
      // Device is being switched to another category
      else if (oldDevice.categoryId && newDevice.categoryId && (oldDevice.categoryId !== newDevice.categoryId)) {
        // Remove device from linked organizations belonging to old category
        Category.findById(oldDevice.categoryId, {include: ["Organizations"]},
          (err: any, category: any) => {
            if (err) console.error(err);
            else if (category) {
              category = category.toJSON();
              if (category.Organizations) {
                // category is shared
                category.Organizations.forEach((org: any) => {
                  oldDevice.Organizations.remove(org.id, () => {
                    Device.removeDeviceMessagesFromOrganization(oldDevice.id, org.id);
                  });
                });
              }
            }
          });
        Category.findById(newDevice.categoryId, {include: ["Organizations"]},
          (err: any, category: any) => {
            if (err) console.error(err);
            else if (category) {
              category = category.toJSON();
              if (category.Organizations) {
                // category is shared
                category.Organizations.forEach((org: any) => {
                  oldDevice.Organizations.add(org.id, {deviceId: newDevice.id}, () => {
                    Device.addDeviceMessagesToOrganization(newDevice.id, org.id);
                  });
                });
              }
            }
          });
      }
    }
    next();
  }

  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let device = ctx.instance;
    const payload = {
      event: "device",
      content: device,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload, device.userId, null);
    next();
  }


}

module.exports = Device;
