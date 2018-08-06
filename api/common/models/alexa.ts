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

    const messages = {
      WELCOME: 'Welcome to the Sigfox Platform! You can ask for a device geolocation by saying: "find", followed by a device name. Which device do you wish to find?',
      WHAT_DO_YOU_WANT: 'What do you want to ask?',
      ERROR: 'Uh Oh. Looks like something went wrong.',
      UNKNOWN_DEVICE: 'This device name is unknown to me. Please try again.',
      UNKNOWN_GEOLOCATION: 'This device has no geolocation. Please try again.',
      GOODBYE: 'Bye! Thanks for using the Sigfox Platform Skill!',
      UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
      HELP: 'You can use this skill by asking something like: find sensit?',
      STOP: 'Bye! Thanks for using the Sigfox Platform Skill!'
    };

    const LaunchRequestHandler = {
      canHandle(handlerInput: any) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
      },
      handle(handlerInput: any) {
        return handlerInput.responseBuilder.speak(messages.WELCOME)
          .reprompt(messages.WHAT_DO_YOU_WANT)
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

        const slot = handlerInput.requestEnvelope.request.intent.slots.DeviceName;
        if (slot && slot.value) {

          const deviceName = slot.value;

          return new Promise((resolve, reject) => {
            Device.findOne({where: {name: {regexp: '/' + deviceName + '/i'}}, order: 'updatedAt DESC'}, (err: any, deviceInstance: any) => {
              if (err) {
                console.error(err);
                reject(handlerInput.responseBuilder
                  .speak(messages.UNKNOWN_DEVICE)
                  .withSimpleCard('Error', messages.UNKNOWN_DEVICE)
                  .reprompt(messages.UNKNOWN_DEVICE)
                  .getResponse());
              } else if (deviceInstance) {
                Geoloc.findOne({where: {deviceId: deviceInstance.id}, order: 'createdAt DESC'}, (err: any, geolocInstance: any) => {
                  if (err) {
                    console.error(err);
                    reject(handlerInput.responseBuilder
                      .speak(messages.UNKNOWN_GEOLOCATION)
                      .withSimpleCard('Error', messages.UNKNOWN_GEOLOCATION)
                      .reprompt(messages.UNKNOWN_GEOLOCATION)
                      .getResponse());
                  } else if (geolocInstance) {
                    app.dataSources.googlePlace.locate(process.env.GOOGLE_API_KEY, geolocInstance.location.lat, geolocInstance.location.lng)
                      .then((result: any) => {
                        const speechText = deviceInstance.name + ' is located at: ' + result.results[0].formatted_address + ', with an accuracy of: ' + geolocInstance.accuracy + ' meters';
                        resolve(handlerInput.responseBuilder
                          .speak(speechText)
                          .withSimpleCard(deviceInstance.name, speechText)
                          .withShouldEndSession(false)
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
                    reject(handlerInput.responseBuilder
                      .speak(messages.UNKNOWN_GEOLOCATION)
                      .withSimpleCard(deviceInstance.name, messages.UNKNOWN_GEOLOCATION)
                      .reprompt(messages.UNKNOWN_GEOLOCATION)
                      .getResponse());
                  }
                });
              } else {
                resolve(handlerInput.responseBuilder
                  .speak(messages.UNKNOWN_DEVICE)
                  .withSimpleCard(deviceName, messages.UNKNOWN_DEVICE)
                  .reprompt(messages.UNKNOWN_DEVICE)
                  .getResponse());
              }
            });
          });
        } else {
          return handlerInput.responseBuilder
            .speak(messages.UNHANDLED)
            .reprompt(messages.UNHANDLED)
            .getResponse();
        }
      }
    };

    const HelpIntentHandler = {
      canHandle(handlerInput: any) {
        const { request } = handlerInput.requestEnvelope;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
      },
      handle(handlerInput: any) {
        return handlerInput.responseBuilder
          .speak(messages.HELP)
          .reprompt(messages.HELP)
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

    const CancelIntentHandler = {
      canHandle(handlerInput: any) {
        const { request } = handlerInput.requestEnvelope;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent';
      },
      handle(handlerInput: any) {
        return handlerInput.responseBuilder
          .speak(messages.GOODBYE)
          .getResponse();
      },
    };

    const StopIntentHandler = {
      canHandle(handlerInput: any) {
        const { request } = handlerInput.requestEnvelope;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';
      },
      handle(handlerInput: any) {
        return handlerInput.responseBuilder
          .speak(messages.STOP)
          .getResponse();
      },
    };

    const UnhandledIntentHandler = {
      canHandle() {
        return true;
      },
      handle(handlerInput: any) {
        return handlerInput.responseBuilder
          .speak(messages.UNHANDLED)
          .reprompt(messages.UNHANDLED)
          .getResponse();
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
        SessionEndedRequestHandler,
        CancelIntentHandler,
        StopIntentHandler,
        UnhandledIntentHandler,
      )
      .addErrorHandlers(ErrorHandler)
      .withApiClient(new AlexaSdk.DefaultApiClient())
      .create();
  }

  postIntents(req: any, body: any, next: Function): void {

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
