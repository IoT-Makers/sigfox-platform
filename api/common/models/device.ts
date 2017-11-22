import {Model} from '@mean-expert/model';
import * as _ from 'lodash';

let moment = require('moment');

/**
 * @module Device
 * @description
 * Write a useful Device Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'}
  },
  remotes: {
    myRemote: {
      returns: {arg: 'result', type: 'array'},
      http: {path: '/my-remote', verb: 'get'}
    },
    graphData: {
      accepts: [
        {arg: 'deviceId', type: 'string', required: true, description: 'Device ID'},
        {
          arg: 'dateBegin',
          type: 'string',
          description: 'the starting date-time'
        },
        {arg: 'dateEnd', type: 'string', description: 'the ending date-time'}
      ],
      returns: {arg: 'result', type: 'array'},
      http: {path: '/dataStats', verb: 'get'}
    }
  }
})

class Device {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Device: Before Save');
    next();
  }

  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }


  graphData(deviceId: string, dateBegin: string, dateEnd: string, next: Function): void {

    console.log("begin", dateBegin);
    console.log("end", dateEnd);

    let result: any = {
      xAxis: [],
      yAxis: []
    };

    let messages: any;

    let arrayOfObject: Array<any> = [];
    let groupByTimestamp: any;
    let groupByKey: any;


    this.model.app.models.Device.findById(
      deviceId,
      {
        include: [
          {
            relation: 'Messages',
            scope: {
              //fields: ['parsed_data'],
              where: {
                and: [
                  {createdAt: {gte: dateBegin ? moment(dateBegin) : new Date(0)}},
                  {createdAt: {lte: dateEnd ? moment(dateEnd) : new Date() }},
                  {parsed_data: {neq: null}}
                ]
              }
            }
          }]
      },
      (err: any, device: any) => {
        if (err || !device ) {
          console.log(err);
          return;
        } else {
          //console.log("device:", device);
          device = device.toJSON();

          messages = device.Messages;
          //console.log("messages", messages.length);


          messages.forEach((message: any, messageIndex: number) => {
            if (message.parsed_data) {
              result.xAxis.push(message.createdAt);
              message.parsed_data.forEach((data: any, dataIndex: number)=> {
                data.timestamp = message.createdAt;
                arrayOfObject.push(data);

                //console.log(data.key);
              });
            }
          });

          groupByKey = _.groupBy(arrayOfObject, "key");
          //console.log(groupByKey);

          for (var key in groupByKey) {
            let obj: any;
            obj = {
              label: "",
              data: []
            };
            // check also if property is not inherited from prototype
            if (groupByKey.hasOwnProperty(key)) {
              obj.label = key;
              groupByKey[key].forEach((item: any) => {
                obj.data.push(item.value);
              });

              result.yAxis.push(obj);
            }
          }


          // result.yAxis = _.groupBy(result.yAxis, "key");


        }
        next(err, result);
      });
  }


}

module.exports = Device;
