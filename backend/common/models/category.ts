import { Model } from "@mean-expert/model";
import { RabbitPub } from '../../server/RabbitPub';

const moment = require("moment");
const json2csv = require("json2csv").parse;

/**
 * @module Category
 * @description
 * Write a useful Category Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: "before save", type: "operation" },
    beforeDelete: { name: "before delete", type: "operation" },
    afterDelete: { name: "after delete", type: "operation" },
    afterSave: { name: "after save", type: "operation" },
    afterRemoteLinkOrganizations: { name: "prototype.__link__Organizations", type: "afterRemote" },
    afterRemoteUnlinkOrganizations: { name: "prototype.__unlink__Organizations", type: "afterRemote" }
  },
  remotes: {
    download: {
      accepts: [
        { arg: "categoryId", required: true, type: "string", http: { source: "path" } },
        { arg: "type", required: true, type: "string", http: { source: "path" } },
        { arg: "req", type: "object", http: { source: "req" } },
        { arg: "res", type: "object", http: { source: "res" } }
      ],
      http: {
        path: "/download/:categoryId/:type",
        verb: "get"
      },
      returns: { type: "object", root: true }
    },
    downloadFromOrganization: {
      accepts: [
        { arg: "organizationId", required: true, type: "string", http: { source: "path" } },
        { arg: "categoryId", required: true, type: "string", http: { source: "path" } },
        { arg: "type", required: true, type: "string", http: { source: "path" } },
        { arg: "req", type: "object", http: { source: "req" } },
        { arg: "res", type: "object", http: { source: "res" } }
      ],
      http: {
        path: "/download/:organizationId/:categoryId/:type",
        verb: "get"
      },
      returns: { type: "object", root: true }
    },
  },
})

class Category {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    console.log("Category: Before Save");
    if (ctx.instance) ctx.instance.createdAt = new Date();
    next();
  }

  public afterRemoteLinkOrganizations(ctx: any, data: any, next: Function): void {
    // console.log("category.ts afterRemoteLinkOrganizations");
    const Device = this.model.app.models.Device;
    Device.find({ where: { categoryId: data.categoryId } },
      (err: any, devices: any) => {
        if (err) console.error(err);
        else if (devices) {
          devices.forEach((device: any) => {
            device.Organizations.add(data.organizationId, { deviceId: device.id }, () => {
              Device.addDeviceMessagesToOrganization(device.id, data.organizationId);
            });
          });
        }
      });
    next();
  }

  public afterRemoteUnlinkOrganizations(ctx: any, data: any, next: Function): void {
    // console.log("category.ts afterRemoteUnlinkOrganizations");
    const Device = this.model.app.models.Device;
    Device.find({ where: { categoryId: ctx.instance.id } },
      (err: any, devices: any) => {
        if (err) console.error(err);
        else if (devices) {
          devices.forEach((device: any) => {
            device.Organizations.remove(ctx.args.fk, { deviceId: device.id }, () => {
              Device.removeDeviceMessagesFromOrganization(device.id, ctx.args.fk);
            });
          });
        }
      });
    next();
  }

  // Before delete category, remove category organization links
  public beforeDelete(ctx: any, next: Function): void {
    // Models
    const Category = this.model;
    Category.findOne({ where: { id: ctx.where.id }, include: "Organizations" }, (err: any, category: any) => {
      // console.log(category);
      if (!err) {
        if (category && category.Organizations) {
          category.toJSON().Organizations.forEach((orga: any) => {
            category.Organizations.remove(orga.id, (err: any, result: any) => {
              if (!err) {
                console.log("Unlinked category from organization (" + orga.name + ")");
              }
            });
          });
        }
        next(null, "Unlinked category from organization");
      } else next(err);
    });
  }

  public download(categoryId: string, type: string, req: any, res: any, next: Function) {
    // Model
    const Category = this.model;
    const Device = this.model.app.models.Device;

    if ((type !== "csv"
      && type !== "json")
      || typeof categoryId === "undefined") {
      res.send('Missing "type" ("csv" or "json"), "categoryId"');
    }

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    Category.findOne(
      {
        where: {
          and: [
            { userId },
            { id: categoryId },
          ],
        },
        include: ["Devices"],
      }, (err: any, category: any) => {
        if (err) {
          console.error(err);
          res.send(err);
        } else if (category) {
          category = category.toJSON();

          const today = moment().format('YYYYMMDD');
          const filename = category.name + '_' + today + '.csv';
          res.setTimeout(600000);
          res.set("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
          res.set("Content-Type", "application/force-download");
          res.set("Content-Type", "application/octet-stream");
          res.set("Content-Type", "application/download");
          res.set("Content-Disposition", "attachment;filename=" + filename);
          res.set("Content-Transfer-Encoding", "binary");

          const data: any = [];
          const data2: any = [];
          let csv: any = [];
          const options: any = {
            fields: [],
          };
          const options2: any = {
            fields2: [],
          };
          const options3: any = {
            fields3: [],
          };

          options.fields.push("createdAt");
          options.fields.push("Name");
          options.fields.push("Time")
          options.fields.push("deviceId");
          options.fields.push("seqNumber");
          options.fields.push("timestamp");
          //options.fields.push("year"); //
          //options.fields.push("month"); //
          //options.fields.push("day"); //
          //options.fields.push("hours"); //
          //options.fields.push("minutes"); //
          //options.fields.push("seconds"); //
          options.fields.push("data");
          options.fields.push("ack");
          options.fields.push("data_downlink");
          //[options.fields[0], options.fields[1]] = [options.fields[1], options.fields[0]];


          let nbProcessedDevices = 0;
          category.Devices.forEach((device: any, i: number) => {
            let hasProperty = false;
            let nbProperty = 0;
            let propertyKey: any = [];
            let propertyValue: any = [];
            Device.findOne(
              {
                where: {
                  and: [
                    { userId },
                    { id: device.id },
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

                  console.log("device properties", device.properties);

                  device.properties.forEach((property: any) => {
                    console.log("property key and value:" + property.key + ":" + property.value);
                    hasProperty = true;
                    propertyKey[nbProperty] = property.key;
                    propertyValue[nbProperty] = property.value;
                    if (options.fields.indexOf(propertyKey[nbProperty]) === -1) {
                      options.fields.push(propertyKey[nbProperty]);

                      console.log(" 1/ tab key and value " + propertyKey[nbProperty] + ":" + propertyValue[nbProperty])

                    }
                    ++nbProperty;
                  });

                  device.Messages.forEach((message: any) => {
                    const obj: any = {};
                    console.log("device.properties !!!!! ", device.properties);
                    console.log("device name --->", device.name);

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
                    //obj.year = new Date(message.createdAt).getFullYear();
                    //obj.month = new Date(message.createdAt).getMonth() + 1;
                    //obj.day = new Date(message.createdAt).getDate();
                    //obj.hours = new Date(message.createdAt).getHours();
                    //obj.minutes = new Date(message.createdAt).getMinutes();
                    //obj.seconds = new Date(message.createdAt).getSeconds();
                    obj.data = message.data;
                    obj.ack = message.ack;
                    obj.data_downlink = message.data_downlink;



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


                    if (message.data_parsed) {
                      message.data_parsed.forEach((p: any) => {
                        if (options.fields.indexOf(p.key) === -1) {
                          options.fields.push(p.key);
                        }
                        obj[p.key] = p.value;

                      });
                    }

                    if (obj["lat_gps"] || obj["lat"] || obj["lat_sigfox"]) {
                      console.log("contenu de lat_gps", obj["lat_gps"]);
                      if (options.fields.indexOf("all_lat") === -1) {
                        options.fields.push("all_lat");
                      }
                      if (obj["lat_gps"]) {
                        obj["all_lat"] = obj["lat_gps"];
                      }
                      else if (obj["lat_sigfox"]) {
                        obj["all_lat"] = obj["lat_sigfox"]
                      }
                      else if (obj["lat"]) {
                        obj["all_lat"] = obj["lat"]
                      }

                    }
                    if (obj["lng_gps"] || obj["lng"] || obj["lng_sigfox"]) {
                      console.log("contenu de lng_gps", obj["lng_gps"]);
                      if (options.fields.indexOf("all_llng") === -1) {
                        options.fields.push("all_lng");
                      }
                      if (obj["lng_gps"]) {
                        obj["all_lng"] = obj["lng_gps"];
                      }
                      else if (obj["lng_sigfox"]) {
                        obj["all_lng"] = obj["lng_sigfox"]
                      }
                      else if (obj["lng"]) {
                        obj["all_lng"] = obj["lng"]
                      }

                    }

                    if (message.reception) {

                      let nb = 1;
                      message.reception.forEach((rec: any) => {
                        console.log("____rec value is:", rec);
                        if (rec) {
                          if (options.fields.indexOf("stationId" + "_" + nb) === -1) {
                            options.fields.push("stationId" + "_" + nb);
                            options.fields.push("RSSI" + "_" + nb);
                            options.fields.push("SNR" + "_" + nb);
                          }
                          obj["stationId" + "_" + nb] = rec.id;
                          obj["RSSI" + "_" + nb] = rec.RSSI;
                          obj["SNR" + "_" + nb] = rec.SNR;

                        }

                        ++nb;
                      });

                    }
                    data.push(obj);
                  });
                  ++nbProcessedDevices;

                  // If all devices are treated
                  if (data.length > 0 && nbProcessedDevices === category.Devices.length) {

                    let nb = 0;
                    let n = 1;
                    let nb2 = 0;
                    options2.fields2.push("createdAt", "ID", "Name", "Sex", "Age", "Time", "all_lat", "all_lng", "UTM", "Area", "EVENT", "deviceId", "Notes", "gps_acq", "sat", "hdop", "speed", "battery", "seqNumber", "timestamp");
                    // check for fields in options.fields not existent in LRT options2.fields2
                    while (n < options.fields.length) {
                      if (options2.fields2.indexOf(options.fields[n]) === -1) {
                        if (options.fields[n].startsWith("RSSI")) {
                          options2.fields2.push(options.fields[n]);
                        }
                        else {
                          options3.fields3.push(options.fields[n]);
                        }
                      }
                      n++;
                    }

                    while (nb < options2.fields2.length) {
                      options.fields[nb] = options2.fields2[nb];
                      nb++;

                    } options.fields.splice(options2.fields2.length, options.fields.length - options2.fields2.length);

                    while (nb2 < options3.fields3.length) {
                      options.fields.push(options3.fields3[nb2]);
                      nb2++;

                    }

                    try {
                      csv = json2csv(data, options);
                      console.log("Done CSV processing.");
                    } catch (err) {
                      console.error(err);
                    }
                    // res.status(200).send({data: csv});
                    res.send(csv);
                    // next();
                  }
                } else if (i === category.Devices.length - 1) next(null, "Device does not belong to user - not allowed");
              });
          });

        } else next(null, "Error occured - not allowed");
      });
  }

  public downloadFromOrganization(organizationId: string, categoryId: string, type: string, req: any, res: any, next: Function) {
    // Model
    const Organization = this.model.app.models.Organization;
    const Device = this.model.app.models.Device;

    if (
      (type !== "csv" && type !== "json")
      || typeof categoryId === "undefined"
      || typeof organizationId === "undefined"
    ) res.send('Missing "type" ("csv" or "json"), "categoryId"');

    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    Organization.findOne(
      {
        where: {
          id: organizationId,
        },
        include: [{
          relation: "Categories",
          scope: {
            order: "createdAt DESC",
            where: { id: categoryId },
            limit: 1,
            include: [{
              relation: "Devices",
              scope: {
                limit: 100,
                order: "updatedAt DESC",
              },
            }],
          },
        }],
      }, (err: any, organization: any) => {
        organization = organization.toJSON();
        if (err) {
          console.error(err);
          res.send(err);
        } else if (organization && organization.Categories.length >= 1) {
          const category = organization.Categories[0];
          const devices = category.Devices;

          const today = moment().format('YYYYMMDD');
          const filename = category.name + '_' + today + '.csv';
          res.setTimeout(600000);
          res.set("Cache-Control", "max-age=0, no-cache, must-revalidate, proxy-revalidate");
          res.set("Content-Type", "application/force-download");
          res.set("Content-Type", "application/octet-stream");
          res.set("Content-Type", "application/download");
          res.set("Content-Disposition", "attachment;filename=" + filename);
          res.set("Content-Transfer-Encoding", "binary");

          const data: any = [];
          let csv: any = [];
          const options: any = {
            fields: [],
          };
          options.fields.push("deviceId");
          options.fields.push("seqNumber");
          options.fields.push("createdAt");
          options.fields.push("year"); //
          options.fields.push("month"); //
          options.fields.push("day"); //
          options.fields.push("hours"); //
          options.fields.push("minutes"); //
          options.fields.push("seconds"); //
          options.fields.push("data");
          options.fields.push("ack");
          options.fields.push("data_downlink");

          let nbProcessedDevices = 0;
          devices.forEach((device: any, i: number) => {
            Device.findOne(
              {
                where: {
                  id: device.id,
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
                } else {
                  device = device.toJSON();
                  device.Messages.forEach((message: any) => {
                    const obj: any = {};

                    obj.deviceId = message.deviceId;
                    obj.seqNumber = message.seqNumber;
                    obj.createdAt = moment(message.createdAt).format("DD-MMM-YY HH:mm:ss");
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
                  ++nbProcessedDevices;
                  // If all devices are treated
                  if (data.length > 0 && nbProcessedDevices === devices.length) {
                    try {
                      csv = json2csv(data, options);
                      console.log("Done CSV processing.");
                    } catch (err) {
                      console.error(err);
                    }
                    // res.status(200).send({data: csv});
                    res.send(csv);
                    // next();
                  }
                }
              });
          });
        } else next(null, "Error occured - not allowed");
      });
  }

  public afterDelete(ctx: any, next: Function): void {
    let category = ctx.instance;
    if (category) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: "category",
        content: category,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
    }
    next();
  }


  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let category = ctx.instance;
    const payload = {
      event: "category",
      content: category,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload);
    next();
  }
}

module.exports = Category;
