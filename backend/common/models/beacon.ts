import {Model} from '@mean-expert/model';
import {RabbitPub} from '../../server/RabbitPub';

const request = require('request');
const bubbleDbUrl = process.env.BUBBLE_DB_URL;
const bubbleDbApiKey = process.env.BUBBLE_DB_API_KEY;
const bubbleDbName = process.env.BUBBLE_DB_NAME;
const bubbleDbInfo = process.env.BUBBLE_DB_INFO;
const bubbleDbGroupId = process.env.BUBBLE_DB_GROUP_ID;

/**
 * @module Beacon
 * @description
 * Write a useful beacon Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: 'before save', type: 'operation'},
    afterDelete: {name: 'after delete', type: 'operation'},
    afterSave: {name: 'after save', type: 'operation'},
  },
  remotes: {
    getBubbles: {
      http: {path: '/bubbles', verb: 'get'},
      returns: {type: ['Beacon'], root: true},
    },
    deleteBubbles: {
      http: {path: '/bubbles', verb: 'delete'},
      accepts: [{arg: 'req', type: 'object', http: {source: 'req'}}],
      returns: {type: 'string', root: true},
    },
    postBubbles: {
      http: {path: '/bubbles', verb: 'post'},
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {
          arg: 'bubbleId',
          type: 'string',
          required: true,
          description: 'Bubble id',
          http: {source: 'query'},
        },
        {
          arg: 'info',
          type: 'string',
          required: true,
          description: 'Bubble info',
          http: {source: 'query'},
        },
        {
          arg: 'placeIds',
          type: ['string'],
          required: true,
          description: 'Bubble placeIds',
          http: {source: 'query'},
        },
        {
          arg: 'txPower',
          type: 'number',
          required: true,
          description: 'Bubble txPower',
          http: {source: 'query'},
        },
        {
          arg: 'location',
          type: 'object',
          required: true,
          description: 'Bubble location (lat and lng)',
          http: {source: 'query'},
        },
      ],
      returns: {type: ['Beacon'], root: true},
    },
    getBubbleBydId: {
      http: {path: '/bubbles/:id', verb: 'get'},
      accepts: [
        {arg: 'id', type: 'string', required: true, description: 'Bubble id'},
      ],
      returns: {type: 'Beacon', root: true},
    },
    deleteBubbleById: {
      http: {path: '/bubbles/:id', verb: 'delete'},
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'id', type: 'string', required: true, description: 'Bubble id'},
      ],
      returns: {type: 'string', root: true},
    },
  },
})
class Beacon {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  public beforeSave(ctx: any, next: Function): void {
    console.log('Beacon: Before Save');
    if (ctx.instance) {
      ctx.instance.createdAt = new Date();
      ctx.instance.id = ctx.instance.id.toUpperCase();
    }
    next();
  }

  public afterDelete(ctx: any, next: Function): void {
    let beacon = ctx.instance;
    if (beacon) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: 'beacon',
        content: beacon,
        action: 'DELETE',
      };
      RabbitPub.getInstance().pub(payload, beacon.userId.toString());
    }
    next();
  }

  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let beacon = ctx.instance;
    const payload = {
      event: 'beacon',
      content: beacon,
      action: ctx.isNewInstance ? 'CREATE' : 'UPDATE',
    };
    RabbitPub.getInstance().pub(payload, beacon.userId.toString());
    next();
  }

  public getBubbles(next: Function): void {
    // Models
    const Beacon = this.model;
    const options = {
      method: 'GET',
      url: bubbleDbUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': bubbleDbApiKey,
      },
    };

    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) next(null, response);
      else {
        body = JSON.parse(body);
        const beacons =
          body.entries &&
          body.entries.map((b: any) => ({
            id: b.bubbleId,
            location: {lat: b.lat, lng: b.lng},
            info: b.info,
            placeIds: b.placeIds,
            txPower: b.txPower,
          }));
        next(null, beacons);
      }
      // Beacon.find({}, (err: any, beacons: any) => {
      //   if (err) next('Error while getting beacons');
      //   else next(null, beacons);
      // });
    });
  }

  public deleteBubbles(req: any, next: Function): void {
    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Models
    const Beacon = this.model;
    const options = {
      method: 'DELETE',
      url: bubbleDbUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': bubbleDbApiKey,
      },
    };

    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) next(null, response);
      else
        Beacon.destroyAll({}, (err: any, result: any) => {
          if (err) next('Error while getting beacons');
          else next(null, result);
        });
    });
  }

  public postBubbles(
    req: any,
    bubbleId: string,
    info: number,
    placeIds: Array<string>,
    txPower: number,
    location: any,
    next: Function
  ): void {
    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Models
    const Beacon = this.model;

    const options = {
      method: 'POST',
      url: bubbleDbUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': bubbleDbApiKey,
      },
      body: {
        name: bubbleDbName,
        info: bubbleDbInfo,
        groupId: bubbleDbGroupId,
        entries: [
          {
            bubbleId,
            lat: location.lat,
            lng: location.lng,
            txPower,
            info,
            placeIds,
          },
        ],
      },
      json: true,
    };

    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode >= 204) next(null, response);
      else {
        Beacon.upsert(
          {userId, id: bubbleId, location, info, placeIds, txPower},
          (err: any, beacon: any) => {
            if (err) next('Error while upserting beacon');
            // this.publish(
            //   {userId, id: bubbleId, location, info, placeIds, txPower},
            //   'UPDATE'
            // );
            next(null, beacon);
          }
        );
      }
    });
  }

  public getBubbleBydId(id: string, next: Function): void {
    // Models
    const Beacon = this.model;

    const options = {
      method: 'GET',
      url: `${bubbleDbUrl}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': bubbleDbApiKey,
      },
    };

    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) next(null, response);
      else
        Beacon.findById(id, (err: any, beacon: any) => {
          if (err) next('Error while getting beacon');
          else next(null, beacon);
        });
    });
  }

  public deleteBubbleById(req: any, id: string, next: Function): void {
    // Obtain the userId with the access token of ctx
    const userId = req.accessToken.userId;

    // Models
    const Beacon = this.model;

    const options = {
      method: 'DELETE',
      url: `${bubbleDbUrl}/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': bubbleDbApiKey,
      },
    };
    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) next(null, response);
      else {
        Beacon.destroyById(id, (err: any, beacon: any) => {
          if (err) next('Error while deleting beacon');
          else next(null, 'OK');
        });
        // this.publish({userId, id}, 'DELETE');
      }
    });
  }

  // private publish(beacon: any, action: string) {
  //   const payload = {
  //     event: 'beacon',
  //     content: beacon,
  //     action: action,
  //   };
  //   RabbitPub.getInstance().pub(payload, beacon.userId.toString());
  // }
}

module.exports = Beacon;
