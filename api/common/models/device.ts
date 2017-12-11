import {Model} from '@mean-expert/model';
import * as _ from 'lodash';

const moment = require('moment');

/**
 * @module Device
 * @description
 * Write a useful Device Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'}/*,
    access: {name: 'access', type: 'operation'}*/
  },
  remotes: {
    myRemote: {
      returns: {arg: 'result', type: 'array'},
      http: {path: '/my-remote', verb: 'get'}
    },
    timeSeries: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'Device ID'},
        {arg: 'dateBegin', type: 'string', default: moment().subtract(1, 'hours'), description: 'the starting date-time'},
        {arg: 'dateEnd', type: 'string', default: moment(), description: 'the ending date-time'}
      ],
      returns: {arg: 'result', type: 'array'},
      http: {path: '/dataStats', verb: 'get'}
    },
    deleteDeviceAndMessages: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
      http: {
        path: '/Messages',
        verb: 'delete'
      },
      returns: {root: true}
    },
    getMessagesFromSigfoxBackend: {
      accepts: [
        {arg: 'data', type: 'object', required: true, description: 'the userId and deviceId', http: { source: 'body' }}
      ],
      http: {
        path: '/:deviceId/messagesFromSigfoxBackend',
        verb: 'get'
      },
      returns: {type: [], root: true}
    }
  }
})

class Device {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  deleteDeviceAndMessages(deviceId: string, req: any, next: Function): void {
    // Obtain the userId with the access_token of ctx
    const userId = req.accessToken.userId;
    // Find device
    this.model.findOne(
      {
        where: {
          and: [
            {id: deviceId},
            {userId: userId}
          ]
        }
      }, (err: any, deviceInstance: any) => {
        if (err || !deviceInstance) {
          console.error('Device not found for suppression.');
          next(err, 'Device not found for suppression.');
        } else if (deviceInstance) {
          console.log('Deleting device ' + deviceId + ' and all its corresponding messages.');

          this.model.app.models.Message.destroyAll({deviceId: deviceId}, (err: any, result: any) => {
            if (!err) {
              this.model.destroyById(deviceId, (error: any, result: any) => {
                next(null, result);
              });
            } else {
              next(err, 'Error for messages suppression with device ID ' + deviceId);
            }
          });
        }
      });
  }

  /*access(ctx: any, next: Function): void {
    // Filter the request with the sent user Id
    ctx.query.where.userId = ctx.args.options.accessToken.userId;
    next();
  }*/

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Device: Before Save');
    next();
  }

  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }


  timeSeries(deviceId: string, dateBegin: string, dateEnd: string, next: Function): void {

    const result: any = {
      xAxis: [],
      yAxis: []
    };

    let messages: any;

    const arrayOfObject: Array<any> = [];

    this.model.app.models.Device.findById(
      deviceId,
      {
        include: [
          {
            relation: 'Messages',
            scope: {
              // fields: ['parsed_data'],
              where: {
                and: [
                  {createdAt: {gte: dateBegin}},
                  {createdAt: {lte: dateEnd}},
                  {parsed_data: {neq: null}}
                ]
              }
            }
          }]
      },
      (err: any, device: any) => {
        if (err || !device ) {
          console.log(err);
        } else {
          // console.log("device:", device);
          device = device.toJSON();

          messages = device.Messages;
          // console.log("messages", messages.length);


          messages.forEach((message: any, messageIndex: number) => {
            if (message.parsed_data) {
              result.xAxis.push(message.createdAt);
              message.parsed_data.forEach((data: any, dataIndex: number) => {
                data.timestamp = message.createdAt;
                arrayOfObject.push(data);

                // console.log(data.key);
              });
            }
          });

          result.yAxis = _.groupBy(arrayOfObject, 'key');
          // groupByKey = _.groupBy(arrayOfObject, "key");
          // console.log(groupByKey);

          // for (var key in groupByKey) {
          //   let obj: any;
          //   obj = {
          //     label: "",
          //     data: []
          //   };
          //   let info: any;
          //   info = {
          //     property: "",
          //     type: "",
          //     unit: ""
          //   };
          //   // check also if property is not inherited from prototype
          //   if (groupByKey.hasOwnProperty(key)) {
          //     obj.label = key;
          //     info.property = key;
          //     groupByKey[key].forEach((item: any) => {
          //       obj.data.push(item.value);
          //       info.type = item.type;
          //       info.unit = item.unit;
          //     });
          //
          //     result.yAxis.push(obj);
          //     result.info.push(info);
          //   }
          // }


          // result.yAxis = _.groupBy(result.yAxis, "key");


        }
        next(err, result);
      });
  }

  getMessagesFromSigfoxBackend(deviceId: string, next: Function): void {



  }


}

module.exports = Device;
