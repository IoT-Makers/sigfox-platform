import {Model} from '@mean-expert/model';

const AlexaSdk = require('ask-sdk');

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
  private skill: any;

  constructor(public model: any) {
    // Models
    //const Device = this.model.app.models.Device;

    const LaunchRequestHandler = {
      canHandle(handlerInput: any) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
      },
      handle(handlerInput: any) {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Welcome', speechText)
          .getResponse();
      }
    };

    const DeviceLocationIntentHandler = {
      canHandle(handlerInput: any) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'DeviceLocationIntent';
      },
      handle(handlerInput: any) {
        const speechText = 'CUSTOM';
        console.log(handlerInput);
        /*Device.findOne({where: {name: {regexp: '/' + deviceName + '/i'}}}, (err: any, deviceInstance: any) => {
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
                return new Promise((resolve: any, reject: any) => {
                  this.model.app.dataSources.googlePlace.locate(process.env.GOOGLE_API_KEY, geolocInstance.location.lat, geolocInstance.location.lng, geolocInstance.accuracy).then((result: any) => {
                    response.response.outputSpeech.text = 'Your ' + deviceInstance.name + ' is at: ' + result.results[0].vicinity;
                    response.response.card.content = 'Your ' + deviceInstance.name + ' is at: ' + result.results[0].vicinity;
                    response.response.reprompt.outputSpeech.text = 'Your ' + deviceInstance.name + ' is at: ' + result.results[0].vicinity;
                    next(null, response);
                    resolve(true);
                  }).catch((err: any) => {
                    console.error(err);
                    response.response.outputSpeech.text = 'Your ' + deviceInstance.name + ' is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                    response.response.card.content = 'Your ' + deviceInstance.name + ' is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                    response.response.reprompt.outputSpeech.text = 'Your ' + deviceInstance.name + ' is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                    next(null, response);
                    reject(false);
                  });
                });
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
        });*/

        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Device location', speechText)
          .getResponse();
      }
    };

    const HelpIntentHandler = {
      canHandle(handlerInput: any) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
      },
      handle(handlerInput: any) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(speechText)
          .withSimpleCard('Hello World', speechText)
          .getResponse();
      },
    };

    const CancelAndStopIntentHandler = {
      canHandle(handlerInput: any) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
      },
      handle(handlerInput: any) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard('Goodbye', speechText)
          .getResponse();
      },
    };

    const SessionEndedRequestHandler = {
      canHandle(handlerInput: any) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
      },
      handle(handlerInput: any) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
      },
    };

    const ErrorHandler = {
      canHandle() {
        return true;
      },
      handle(handlerInput: any, error: any) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
          .speak('Sorry, I can\'t understand the command. Please say again.')
          .reprompt('Sorry, I can\'t understand the command. Please say again.')
          .getResponse();
      },
    };

    this.skill = AlexaSdk.SkillBuilders
      .custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        DeviceLocationIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  }

  postIntents(req: any, body: any, next: Function): void {
    // Models
    const Device = this.model.app.models.Device;
    const Geoloc = this.model.app.models.Geoloc;

    // TODO: accept only Amazon Alexa req
    //console.log(body);
    /*let response: any = {};
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
                return new Promise((resolve: any, reject: any) => {
                  this.model.app.dataSources.googlePlace.locate(process.env.GOOGLE_API_KEY, geolocInstance.location.lat, geolocInstance.location.lng, geolocInstance.accuracy).then((result: any) => {
                    response.response.outputSpeech.text = 'Your ' + deviceInstance.name + ' is at: ' + result.results[0].vicinity;
                    response.response.card.content = 'Your ' + deviceInstance.name + ' is at: ' + result.results[0].vicinity;
                    response.response.reprompt.outputSpeech.text = 'Your ' + deviceInstance.name + ' is at: ' + result.results[0].vicinity;
                    next(null, response);
                    resolve(true);
                  }).catch((err: any) => {
                    console.error(err);
                    response.response.outputSpeech.text = 'Your ' + deviceInstance.name + ' is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                    response.response.card.content = 'Your ' + deviceInstance.name + ' is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                    response.response.reprompt.outputSpeech.text = 'Your ' + deviceInstance.name + ' is here: ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                    next(null, response);
                    reject(false);
                  });
                });
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
    }*/

    this.skill.invoke(body).then((responseBody: any) => {
      next(null, responseBody);
    }).catch((error: any) => {
      console.log(error);
      next(error, 'Error during the request');
    });

  }

  afterSave(ctx: any, next: Function): void {
    next();
  }
}

module.exports = Alexa;
