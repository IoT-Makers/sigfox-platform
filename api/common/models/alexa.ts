import {Model} from '@mean-expert/model';

const AlexaSdk = require('ask-sdk');
const moment = require('moment');

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

    let messages = {
      WELCOME: '',
      WHAT_DO_YOU_WANT: '',
      ERROR: '',
      UNKNOWN_DEVICE: '',
      UNKNOWN_GEOLOCATION: '',
      SUCCESS_GEOLOCATION: '',
      ERROR_GOOGLE: '',
      GOODBYE: '',
      UNHANDLED: '',
      HELP: '',
      STOP: ''
    };

    const messages_US = {
      WELCOME: 'Welcome to the Sigfox Platform! You can ask for a device geolocation by saying: "find", followed by a device name. Which device do you wish to find?',
      WHAT_DO_YOU_WANT: 'What do you want to ask?',
      ERROR: 'Uh Oh. Looks like something went wrong.',
      UNKNOWN_DEVICE: 'This device name is unknown to me. Please try again.',
      UNKNOWN_GEOLOCATION: 'This device has no geolocation. Please try again.',
      SUCCESS_GEOLOCATION: 'CUSTOM MESSAGE',
      ERROR_GOOGLE: 'CUSTOM MESSAGE',
      GOODBYE: 'Bye! Thanks for using the Sigfox Platform Skill!',
      UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
      HELP: 'You can use this skill by asking something like: find sensit?',
      STOP: 'Bye! Thanks for using the Sigfox Platform Skill!'
    };

    const messages_FR = {
      WELCOME: 'Bienvenue sur la Sigfox Platform! Vous pouvez demander la géolocalisation d\'un objet en disant: "trouve", suivit par le nom de l\'objet. Quel objet voulez-vous trouver ?',
      WHAT_DO_YOU_WANT: 'Que voulez-vous demander ?',
      ERROR: 'Oups. On dirait qu\'une erreur est survenue.',
      UNKNOWN_DEVICE: 'Ce nom d\'objet m\'est inconnu. Merci de réessayer.',
      UNKNOWN_GEOLOCATION: 'Cet objet n\'a pas de géolocalisation. Merci de réessayer.',
      SUCCESS_GEOLOCATION: 'CUSTOM MESSAGE',
      ERROR_GOOGLE: 'CUSTOM MESSAGE',
      GOODBYE: 'Au revoir! Merci d\'avoir utilisé la skill Sigfox Platform!',
      UNHANDLED: 'Cette skill ne supporte pas cela. Merci de demander quelque chose d\'autre.',
      HELP: 'Vous pouvez utiliser cette skill en demandant quelque chose comme: trouve sensit?',
      STOP: 'Au revoir! Merci d\'avoir utilisé la skill Sigfox Platform!'
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

                const deviceName = deviceInstance.name;

                Geoloc.findOne({where: {deviceId: deviceInstance.id}, order: 'createdAt DESC'}, (err: any, geolocInstance: any) => {
                  if (err) {
                    console.error(err);
                    reject(handlerInput.responseBuilder
                      .speak(messages.UNKNOWN_GEOLOCATION)
                      .withSimpleCard('Error', messages.UNKNOWN_GEOLOCATION)
                      .reprompt(messages.UNKNOWN_GEOLOCATION)
                      .getResponse());
                  } else if (geolocInstance) {
                    let language = 'en';
                    if (handlerInput.requestEnvelope.request.locale === 'fr-FR') {
                      language = 'fr';
                    }
                    app.dataSources.google.geocode(process.env.GOOGLE_API_KEY, geolocInstance.location.lat, geolocInstance.location.lng, language)
                      .then((result: any) => {
                        let deviceAddress = result.results[0].formatted_address;
                        const deviceAccuracy = geolocInstance.accuracy;
                        if (deviceAccuracy < 300) {
                          if (handlerInput.requestEnvelope.request.locale === 'fr-FR') {
                            messages.SUCCESS_GEOLOCATION = `${deviceName} est à: ${deviceAddress}, avec une précision de: ${deviceAccuracy} mètres.`;
                          } else {
                            messages.SUCCESS_GEOLOCATION = `${deviceName} is located at: ${deviceAddress}, with an accuracy of: ${deviceAccuracy} meters.`;
                          }
                        } else {
                          if (handlerInput.requestEnvelope.request.locale === 'fr-FR') {
                            for (let ac = 0; ac < result.results[0].address_components.length; ac++) {
                              const component = result.results[0].address_components[ac];
                              if (component.types.includes('locality') || component.types.includes('sublocality')) {
                                deviceAddress = 'à ' + component.long_name;
                                break;
                              } else if (component.types.includes('administrative_area_level_1')) {
                                deviceAddress = 'en ' + component.long_name;
                                break;
                              } else if (component.types.includes('country')) {
                                deviceAddress = 'en ' + component.long_name;
                                break;
                              }
                            }
                            moment.locale('fr');
                            messages.SUCCESS_GEOLOCATION = `${deviceName} est ${deviceAddress}, ${moment(geolocInstance.createdAt).fromNow()}.`;
                          } else {
                            for (let ac = 0; ac < result.results[0].address_components.length; ac++) {
                              const component = result.results[0].address_components[ac];
                              if (component.types.includes('locality') || component.types.includes('sublocality')) {
                                deviceAddress = 'at ' + component.long_name;
                                break;
                              } else if (component.types.includes('administrative_area_level_1')) {
                                deviceAddress = 'in ' + component.long_name;
                                break;
                              } else if (component.types.includes('country')) {
                                deviceAddress = 'in ' + component.long_name;
                                break;
                              }
                            }
                            moment.locale('en');
                            messages.SUCCESS_GEOLOCATION = `${deviceName} is located ${deviceAddress}, ${moment(geolocInstance.createdAt).fromNow()}.`;
                          }
                        }
                        resolve(handlerInput.responseBuilder
                          .speak(messages.SUCCESS_GEOLOCATION)
                          .withSimpleCard(this.deviceName, messages.SUCCESS_GEOLOCATION)
                          .withShouldEndSession(false)
                          .getResponse());
                      })
                      .catch((err: any) => {
                        console.error(err);
                        messages.ERROR_GOOGLE = `${deviceName} could not be geolocated because of a request error, check you have set the Google API environment variable.`;
                        if (handlerInput.requestEnvelope.request.locale === 'fr-FR') {
                          messages.ERROR_GOOGLE = `${deviceName} n\'a pas pu être géolocalisé car une erreur est survenue lors du géocodage inverse. Merci de vérifier que la variable d'environnement de Google API est renseignée.`;
                        }
                        resolve(handlerInput.responseBuilder
                          .speak(messages.ERROR_GOOGLE)
                          .withSimpleCard(deviceName, messages.ERROR_GOOGLE)
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

    const LocalizationInterceptor = {
      process(handlerInput: any) {
        if (handlerInput.requestEnvelope.request.locale === 'fr-FR') {
          messages = messages_FR;
        } else {
          messages = messages_US;
        }
        return;
      }
    };

    this.skill = AlexaSdk.SkillBuilders
      .custom()
      .addRequestInterceptors(LocalizationInterceptor)
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
