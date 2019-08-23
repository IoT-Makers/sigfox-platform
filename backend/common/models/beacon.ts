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
      accepts: [],
      returns: {type: 'string', root: true},
    },
    postBubbles: {
      http: {path: '/bubbles', verb: 'post'},
      accepts: [
        {
          arg: 'bubbleId',
          type: 'string',
          required: true,
          description: 'Bubble id',
          http: {source: 'query'},
        },
        {
          arg: 'lat',
          type: 'number',
          required: true,
          description: 'Bubble latitude',
          http: {source: 'query'},
        },
        {
          arg: 'lng',
          type: 'number',
          required: true,
          description: 'Bubble longitude',
          http: {source: 'query'},
        },
        {
          arg: 'txPower',
          type: 'number',
          required: true,
          description: 'Bubble longitude',
          http: {source: 'query'},
        },
        {
          arg: 'information',
          type: 'string',
          required: true,
          description: 'Bubble information',
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
      RabbitPub.getInstance().pub(payload);
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
    RabbitPub.getInstance().pub(payload);
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
            name: b.info,
            type: 'sigfox',
            level: 0,
          }));
        next(null, beacons);
      }
      // Beacon.find({}, (err: any, beacons: any) => {
      //   if (err) next('Error while getting beacons');
      //   else next(null, beacons);
      // });
    });
  }

  public deleteBubbles(next: Function): void {
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
    bubbleId: string,
    lat: number,
    lng: number,
    txPower: number,
    information: number,
    next: Function
  ): void {
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
            lat,
            lng,
            txPower,
            info: information,
          },
        ],
      },
      json: true,
    };

    request(options, (error: any, response: any, body: any) => {
      if (error || response.statusCode !== 200) next(null, response);
      else
        Beacon.upsert(
          {id: bubbleId, location: {lat, lng}, name: information},
          (err: any, beacon: any) => {
            if (err) next('Error while creating/updating beacon');
            else next(null, beacon);
          }
        );
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

  public deleteBubbleById(id: string, next: Function): void {
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
      else
        Beacon.destroyById(id, (err: any, beacon: any) => {
          if (err) next('Error while deleting beacon');
          else next(null, 'OK');
        });
    });
  }
}

module.exports = Beacon;
