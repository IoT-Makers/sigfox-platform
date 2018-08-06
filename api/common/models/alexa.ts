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
        /*const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const deviceSlot = handlerInput.requestEnvelope.request.intent.slots.DeviceName;
        let deviceName;
        if (deviceSlot && deviceSlot.value) {
          deviceName = deviceSlot.value;
        }*/


        // Models
        const app = require('../../server/server');
        const Device = app.models.Device;
        const Geoloc = app.models.Geoloc;

        if (handlerInput.requestEnvelope.request.intent.slots.name && handlerInput.requestEnvelope.request.intent.slots.name.value) {

          const deviceName = handlerInput.requestEnvelope.request.intent.slots.name.value;

          return new Promise((resolve, reject) => {
            Device.findOne({where: {name: {regexp: '/' + deviceName + '/i'}}, order: 'updatedAt DESC'}, (err: any, deviceInstance: any) => {
              if (err) {
                console.error(err);
                const speechText = 'Error while finding device.';
                reject(handlerInput.responseBuilder
                  .speak(speechText)
                  .withSimpleCard('Error', speechText)
                  .getResponse());
              } else if (deviceInstance) {
                Geoloc.findOne({where: {deviceId: deviceInstance.id}, order: 'createdAt DESC'}, (err: any, geolocInstance: any) => {
                  if (err) {
                    console.error(err);
                    const speechText = 'Error while finding geoloc.';
                    reject(handlerInput.responseBuilder
                      .speak(speechText)
                      .withSimpleCard('Error', speechText)
                      .getResponse());
                  } else if (geolocInstance) {
                    app.dataSources.googlePlace.locate(process.env.GOOGLE_API_KEY, geolocInstance.location.lat, geolocInstance.location.lng)
                      .then((result: any) => {
                        const speechText = deviceInstance.name + ' is at ' + result.results[0].formatted_address + ' with an accuracy of ' + geolocInstance.accuracy + ' meters';
                        resolve(handlerInput.responseBuilder
                          .speak(speechText)
                          .withSimpleCard(deviceInstance.name, speechText)
                          .getResponse());
                      })
                      .catch((err: any) => {
                        console.error(err);
                        const speechText = deviceInstance.name + ' is here ' + geolocInstance.location.lat + ', ' + geolocInstance.location.lng;
                        resolve(handlerInput.responseBuilder
                          .speak(speechText)
                          .withSimpleCard(deviceInstance.name, speechText)
                          .getResponse());
                      });
                  } else {
                    const speechText = 'No geoloc found.';
                    reject(handlerInput.responseBuilder
                      .speak(speechText)
                      .withSimpleCard(deviceInstance.name, speechText)
                      .getResponse());
                  }
                });
              } else {
                const speechText = 'No device found.';
                resolve(handlerInput.responseBuilder
                  .speak(speechText)
                  .withSimpleCard(deviceName, speechText)
                  .getResponse());
              }
            });
          });
        } else {
          const speechText = 'Hummm, no service for this request.';
          return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Error', speechText)
            .getResponse();
        }
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
