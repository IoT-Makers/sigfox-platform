import {Model} from '@mean-expert/model';

/**
 * @module Alert
 * @description
 * Write a useful Alert Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: { },
  remotes: {
    triggerByDevice: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/trigger-by-device', verb: 'post' },
      accepts: [
        {arg: 'data_parsed', type: 'array', required: true, description: 'The parsed data'},
        {arg: 'device', type: 'Device', required: true, description: 'The device object'},
        {arg: 'req', type: 'object', http: {source: 'req'}}
      ],
    }
  }
})

class Alert {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  private triggerByDevice(data_parsed: Array<any>, device: any, req: any, next: Function): void {
    // Models
    const Connector = this.model.app.models.Connector;
    const Email = this.model.app.models.Email;
    const Alert = this.model.app.models.Alert;
    const AlertHistory = this.model.app.models.AlertHistory;

    // Get userId
    const userId = req.accessToken.userId;
    if (!userId) {
      next(null, 'Please login or use a valid access token.');
    }
    if (!device.Alerts) {
      next(null, 'No alerts set for this device.');
    }

    const alerts = device.Alerts;

    // Loop in all the alerts
    alerts.forEach((alert: any, index: any) => {
      // Only check active alerts
      if (alert.active) {
        if (alert.geofence) {
          /**
           *  Triggering alerts from "geoloc"
           *  If the key being read is set for an alert and if it is activated
           */
          /*if (alert.key === 'geoloc_sigfox' || alert.key === 'geoloc_gps') {
          }*/
          // Save triggered alerts in AlertHistory
          AlertHistory.upsert(alert, (err: any, alert: any) => {
          });
        } else if (alert.value) {
          /**
           *  Triggering alerts from "data_parsed"
           *  If the key being read is set for an alert and if it is activated
           */
          data_parsed.forEach((p: any) => {
            if (alert.key === p.key) {
              // Verify conditions for the alert to be triggered
              if (
                (alert.value.exact && p.value === alert.value.exact)
                || (alert.value.min && alert.value.max && p.value >= alert.value.min && p.value <= alert.value.max)
                || (alert.value.less && p.value < alert.value.less)
                || (alert.value.more && p.value > alert.value.more)
              ) {
                // Trigger alert
                Connector.findById(alert.connectorId,
                  (err: any, connector: any) => {
                    if (err) {
                      console.error(err);
                    } else if (connector) {
                      let alertMessage = alert.message;
                      if (!alert.message)
                        alertMessage = p.key.charAt(0).toUpperCase() + p.key.slice(1) + ': ' + p.value + ' ' + p.unit;

                      if (connector.type === 'office-365') {
                        console.log('Office 365 Email alert!');
                        // Set the connector user and pass
                        this.model.app.models.Email.dataSource.connector.transports[0].transporter.options.auth = {
                          user: connector.login,
                          pass: connector.password
                        };
                        const title = device.name ? device.name : device.id;
                        Email.send({
                          to: connector.recipient,
                          from: connector.login,
                          subject: '[Sigfox Platform] - Alert for ' + title,
                          text: alertMessage,
                          html: 'Hey! <p>An alert has been triggered for the device: <b>' + title + '</b></p><p>' + alert.message + '</p>'
                        }, function (err: any, mail: any) {
                          if (err) console.error(err);
                          else console.log('Email sent!');
                        });
                      }

                      else if (connector.type === 'webhook') {
                        console.log('Webhook alert!');
                        this.model.app.dataSources.webhook.send(connector.url, connector.method, connector.password, alertMessage).then((result: any) => {
                        }).catch((err: any) => {
                          if (err) console.error('Webhook request error');
                          else console.log('Webhook request sent!');
                        });
                      }

                      else if (connector.type === 'free-mobile') {
                        console.log('Free Mobile SMS alert!');
                        this.model.app.dataSources.freeMobile.sendSMS(connector.login, connector.password, alertMessage).then((result: any) => {
                        }).catch((err: any) => {
                          if (err) console.error('Free Mobile error');
                          else console.log('Free Mobile sent!');
                        });
                      }

                      else if (connector.type === 'twilio') {
                        console.log('Twilio SMS alert!');
                        // TODO: implement twilio connector
                      }

                      else if (connector.type === 'mqtt') {
                        console.log('MQTT alert!');
                        const Client = require('strong-pubsub');
                        const Adapter = require('strong-pubsub-mqtt');
                        const client = new Client({host: connector.host, port: connector.port}, Adapter);
                        client.publish(connector.topic, alertMessage);
                      }

                      // Check if alert is one shot only, if yes: deactivate it
                      if (alert.one_shot) alert.active = false;
                      // Update the alert last trigger time
                      alert.last_trigger = new Date();
                      Alert.upsert(
                        alert,
                        (err: any, alert: any) => {
                          if (err) {
                            console.error(err);
                          } else {
                            console.log('Updated alert as: ', alert);
                          }
                        });
                      // Alert has been triggered, removing it from array
                      alerts.splice(index, 1);

                      // Save triggered alerts in AlertHistory
                      AlertHistory.upsert(alert, (err: any, alert: any) => {
                      });
                    }
                  });
              }
            }
          });
        }
      }
    });
    next(null, 'Processed alerts.');
  }
}

module.exports = Alert;
