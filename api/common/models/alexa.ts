import {Model} from '@mean-expert/model';

const loopback = require('loopback');
const Client = require('strong-pubsub');
const Adapter = require('strong-pubsub-mqtt');

/**
 * @module Alexa
 * @description
 * Write a useful Geoloc Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: { },
  remotes: {
    postIntents: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'body', type: 'object', required: true, description: 'Alexa request', http: { source: 'body'}}
      ],
      description: 'Give Amazon Alexa a device position response',
      http: {
        path: '/intents',
        verb: 'post'
      },
      returns: {arg: 'body', type: 'object', root: true, description: 'The response Alexa will say'},
    }
  }
})

class Alexa {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  postIntents(req: any, body: any, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;
    const Geoloc = this.model.app.models.Geoloc;

    // TODO: accept only Amazon Alexa req

    //console.log(body);

    let response: any = {};
    if (body.request.type === 'LaunchRequest') {
      response = {
        version: 1.0,
        response: {
          outputSpeech: {
            type: 'PlainText',
            text: 'Welcome to the Sigfox Platform!'
          },
          card: {
            type: 'Simple',
            title: 'Sigfox Platform',
            content: 'Welcome to the Sigfox Platform!'
          },
          reprompt: {
            outputSpeech: {
              type: 'PlainText',
              text: 'Welcome to the Sigfox Platform!'
            }
          },
          shouldEndSession: false
        },
        sessionAttributes: {}
      };
      next(null, response);
    } else if (body.request.type === 'IntentRequest' && body.request.intent.name === 'DeviceLocationIntent') {
      if (body.request.intent.slots.name && body.request.intent.slots.name.value) {
        const deviceName = body.request.intent.slots.name.value;

        response = {
          version: 1.0,
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: 'Error, no device found.'
            },
            card: {
              type: 'Simple',
              title: 'Sigfox Platform',
              content: 'Error, no device found.'
            },
            reprompt: {
              outputSpeech: {
                type: 'PlainText',
                text: 'Error, no device found.'
              }
            },
            shouldEndSession: true
          },
          sessionAttributes: {}
        };

        Device.findOne({where: {name: {regexp: '/' + deviceName + '/i'}}}, (err: any, deviceInstance: any) => {
          if (err) {
            console.error(err);
            next(null, response);
          } else if (deviceInstance) {
            Geoloc.findOne({where: {deviceId: deviceInstance.id}, order: 'createdAt DESC'}, (err: any, geolocInstance: any) => {
              if (err) {
                console.error(err);
                response.response.outputSpeech.text = 'Error, no geoloc found.';
                response.response.card.content = 'Error, no geoloc found.';
                response.response.reprompt.outputSpeech.text = 'Error, no geoloc found.';
                next(null, response);
              } else if (geolocInstance) {
                response.response.outputSpeech.text = 'Your device is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                response.response.card.content = 'Your device is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                response.response.reprompt.outputSpeech.text = 'Your device is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                next(null, response);
              } else {
                response.response.outputSpeech.text = 'Error, no geoloc found.';
                response.response.card.content = 'Error, no geoloc found.';
                response.response.reprompt.outputSpeech.text = 'Error, no geoloc found.';
                next(null, response);
              }
            });
          } else {
            response.response.outputSpeech.text = 'Error, no device found.';
            response.response.card.content = 'Error, no device found.';
            response.response.reprompt.outputSpeech.text = 'Error, no device found.';
            next(null, response);
          }
        });
      } else {
        response = {
          version: 1.0,
          response: {
            outputSpeech: {
              type: 'PlainText',
              text: 'Oups!'
            },
            card: {
              type: 'Simple',
              title: 'Sigfox Platform',
              content: 'Oups!'
            },
            reprompt: {
              outputSpeech: {
                type: 'PlainText',
                text: 'Oups!'
              }
            },
            shouldEndSession: true
          },
          sessionAttributes: {}
        };
        next(null, response);
      }
    } else {
      response = {
        version: 1.0,
        response: {
          outputSpeech: {
            type: 'PlainText',
            text: 'None of my business!'
          },
          card: {
            type: 'Simple',
            title: 'Sigfox Platform',
            content: 'None of my business!'
          },
          reprompt: {
            outputSpeech: {
              type: 'PlainText',
              text: 'None of my business!'
            }
          },
          shouldEndSession: true
        },
        sessionAttributes: {}
      };
      next(null, response);
    }
  }

  afterSave(ctx: any, next: Function): void {
    next();
  }
}

module.exports = Alexa;
