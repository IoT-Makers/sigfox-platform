import {Model} from '@mean-expert/model';

/**
 * @module Message
 * @description
 * Write a useful Message Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    putMessage: {
      accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'data', type: 'object', required: true, http: { source: 'body' }}
      ],
      http: {
        path: '/sigfox',
        verb: 'put'
      },
      returns: {type: 'Message', root: true}
    }
  }
})

class Message {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) { }

  putMessage(req: any, data: any, next: Function): void {

    // Obtain the userId with the access_token of ctx
    const userId = req.accessToken.userId;
    // Create a new message object
    let message = new this.model;
    message = data;
    // Store the userId in the message
    message.userId = userId;
    // Get useful parameters that have to be removed from the message
    const duplicate = message.duplicate;
    const deviceNamePrefix = message.deviceNamePrefix;
    const parserId = message.parserId;
    const categoryId = message.categoryId;


    if (!message.deviceId || !message.time || !message.seqNumber)
      next('Missing "deviceId", "time" and "seqNumber"', message);
    // Set the createdAt time
    message.createdAt = new Date(message.time * 1000);


    // Sanitize message to be saved - get rid of useless information
    delete message.duplicate;
    delete message.deviceNamePrefix;
    delete message.parserId;
    delete message.categoryId;


    // Create a new device object
    const device = new this.model.app.models.Device;
    device.id = message.deviceId;
    device.userId = userId;
    if (deviceNamePrefix)
      device.name = deviceNamePrefix + '_' + message.deviceId;
    if (parserId)
      device.parserId = parserId;
    if (categoryId)
      device.categoryId = categoryId;


    // Check if the device exists
    this.model.app.models.Device.findOrCreate(
      {where: {id: data.deviceId}}, // find
      device, // create
      (err: any, deviceInstance: any, created: boolean) => { // callback
        if (err) {
          console.error('Error creating device.', err);
          next(err, data);
        } else {
          if (created)
            console.log('Created new device.');
          else
            console.log('Found an existing device.');


          // If message is a duplicate
          if (duplicate) {
            this.model.findOne({
              where: {
                and: [
                  {deviceId: data.deviceId},
                  {time: data.time},
                  {seqNumber: data.seqNumber}
                ]
              }
            }, (err: any, messageInstance: any) => {
              if (err) {
                console.error(err);
                next(err, data);
              } else {
                if (messageInstance) {
                  console.log('Found the corresponding message and storing reception in it.');
                  messageInstance.reception.push(data.reception[0]);
                  this.model.upsert(
                    messageInstance,
                    (err: any, messageInstance: any) => {
                      if (err) {
                        console.error(err);
                        next(err, messageInstance);
                      } else {
                        console.log('Updated message as: ', messageInstance);
                        next(null, messageInstance);
                      }
                    });

                } else {
                  // No corresponding message found
                  const err = 'Error - No corresponding message found, did you first receive a message containing duplicate = false?';
                  console.error(err);
                  next(err, data);
                }
              }
            });
          } // if(duplicate)


          // If message contains Sigfox geoloc
          else if (message.geoloc) {
            // Build the formatted geoloc object
            const geolocSigfox = new this.model.app.models.Geoloc;
            geolocSigfox.type = message.geoloc[0].type;
            geolocSigfox.lat = message.geoloc[0].lat;
            geolocSigfox.lng = message.geoloc[0].lng;
            geolocSigfox.precision = message.geoloc[0].precision;
            // Store the formatted geoloc in the message to be saved
            message.geoloc[0] = geolocSigfox;
            // Now checking where Sigfox geoloc is in the location array so it can be updated
            let entryGeoloc_sigfox = false;
            if (!deviceInstance.location)
              deviceInstance.location = [];
            deviceInstance.location.forEach((geoloc: any, index: number) => {
              if (geoloc.type === 'sigfox') {
                deviceInstance.location[index] = geolocSigfox; // Replace Sigfox geoloc with new one
                entryGeoloc_sigfox = true;
              }
            });
            if (!entryGeoloc_sigfox)
              deviceInstance.location.push(geolocSigfox);

            // Update the device
            this.model.app.models.Device.upsert(
              deviceInstance,
              (err: any, deviceInstance: any) => {
                if (err) {
                  console.log(err);
                  next(err, data);
                } else {
                  console.log('Updated device with latest Sigfox geoloc');
                }
              });


            this.model.findOrCreate(
              {
                where: {
                  and: [
                    {deviceId: message.deviceId},
                    {time: message.time},
                    {seqNumber: message.seqNumber}
                  ]
                }
              },
              message,
              (err: any, messageInstance: any, created: boolean) => { // callback
                if (err) {
                  console.log(err);
                  next(err, data);
                } else {
                  if (created) {
                    console.log('Created new message.');

                    next(null, message);

                  } else {
                    console.log('Found an existing message.');

                    if (!messageInstance.geoloc)
                      messageInstance.geoloc = [];
                    messageInstance.geoloc.push(geolocSigfox);

                    // Update the device
                    this.model.upsert(
                      messageInstance,
                      (err: any, messageInstance: any) => {
                        if (err) {
                          console.log(err);
                          next(err, data);
                        } else {
                          console.log('Updated message with latest Sigfox geoloc.');

                          next(null, messageInstance);
                        }
                      });
                  }
                }
              });


          } // else if(data.geoloc)


          // Parse message, create message, send result to backend with downlink payload or not
          else {
            if ((deviceInstance.parserId || parserId) && message.data) {
              this.model.app.models.Parser.findById(
                deviceInstance.parserId || parserId,
                (err: any, parserInstance: any) => {
                  if (err) {
                    console.log(err);
                    next(err, data);
                  } else if (parserInstance) {
                    // Here we will decode the Sigfox payload and search for geoloc to be extracted and store in the Message
                    // @TODO: run it in another container because it can crash the app if something goes wrong...
                    const fn = Function('payload', parserInstance.function);
                    const parsed_data = fn(message.data);
                    const geoloc = new this.model.app.models.Geoloc;
                    message.parsed_data = parsed_data;

                    // Check if the parsed data contains a "geoloc" key and store it in the message property to be stored
                    parsed_data.forEach((o: any) => {
                      if (o.key === 'geoloc')
                        geoloc.type = o.value;
                      else if (o.key === 'lat')
                        geoloc.lat = o.value;
                      else if (o.key === 'lng')
                        geoloc.lng = o.value;
                      else if (o.key === 'precision')
                        geoloc.precision = o.value;
                    });

                    if (geoloc.type) {
                      console.warn('There is geoloc in the parsed data: storing it in message & updating device location.');
                      if (!message.geoloc)
                        message.geoloc = [];
                      message.geoloc.push(geoloc);
                      // Update the device location geoloc array
                      const device = {
                        id: data.deviceId,
                        userId: userId,
                        location: [geoloc]
                      };
                      this.model.app.models.Device.upsert(
                        device,
                        (err: any, deviceInstance: any) => {
                          if (err) {
                            console.log(err);
                            next(err, data);
                          } else {
                            console.log('Updated device as: ', deviceInstance);
                          }
                        });
                    }

                    this.createMessageAndSendResponse(message, next, this.model);
                  }
                });
            } // if (deviceInstance.parserId || parserId)

            else {
              this.createMessageAndSendResponse(message, next, this.model);
            }
          }
        }
      });
  }


  private createMessageAndSendResponse(message: any, next: Function, messageModel: any) {
    // Creating new message
    this.model.create(
      message,
      (err: any, messageInstance: any) => {
        if (err) {
          console.error(err);
          next(err, messageInstance);
        } else {
          console.log('Created message as: ', messageInstance);
          // Ack from BIDIR callback
          if (message.ack) {
            let result;
            this.model.app.models.Device.findOne({where: {id: message.deviceId}}, function (err: any, device: any) {
              if (device.dl_payload) {
                // Save a message containing the downlink payload sent back to the device
                const downlinkMessage = message;
                delete downlinkMessage.reception;
                delete downlinkMessage.geoloc;
                delete downlinkMessage.data;
                downlinkMessage.downlinkData = device.dl_payload;
                messageModel.create(
                  downlinkMessage,
                  (err: any, messageInstance: any) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('Created new message with its downlink data as: ', messageInstance);
                    }
                  });
                result = {
                  [message.deviceId]: {
                    downlinkData: device.dl_payload
                  }
                };
              } else {
                result = {
                  [message.deviceId]: {
                    noData: true
                  }
                };
              }
              // ack is true
              next(null, result);
            });
          } else {
            // ack is false
            next(null, messageInstance);
          }
        }
      });
  }


// Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Message: Before Save');
    next();
  }

// Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = Message;
