import {Model} from "@mean-expert/model";
import {decrypt} from "../utils";
import {RabbitPub} from '../../../server/RabbitPub';

const nodemailer = require("nodemailer");
const Nexmo = require('nexmo');

/**
 * @module Alert
 * @description
 * Write a useful Alert Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: {name: "before save", type: "operation"},
    afterDelete: {name: "after delete", type: "operation"},
    afterSave: {name: "after save", type: "operation"},
  },
  remotes: {
    triggerByData: {
      returns: {arg: "result", type: "array"},
      http: {path: "/trigger-by-device", verb: "post"},
      accepts: [
        {arg: "data_parsed", type: "array", required: true, description: "The parsed data"},
        {arg: "device", type: "object", required: true, description: "The device object"},
        {arg: "req", type: "object", http: {source: "req"}},
      ],
    },
    triggerAlert: {
      returns: {arg: "result", type: "array"},
      http: {path: "/trigger-alert", verb: "post"},
      accepts: [
        {arg: "alert", type: "object", required: true},
        {arg: "device", type: "object", required: true},
        {arg: "alertMessage", type: "string", required: false},
        {arg: "location", type: "object", required: false},
        {arg: "test", type: "boolean", required: false},
      ],
    },
    test: {
      returns: {arg: "result", type: "array"},
      http: {path: "/test", verb: "post"},
      accepts: [
        {arg: "alertId", type: "string", required: true, description: "The alert ID"},
        {arg: "req", type: "object", http: {source: "req"}},
      ],
    },
  },
})

class Alert {

  // LoopBack model instance is injected in constructor
  constructor(public model: any) {
  }

  public beforeSave(ctx: any, next: Function): void {
    console.log("Alert: Before Save");
    next();
  }

  private test(alertId: string, req: any, next: Function): void {
    // Models
    const Alert = this.model.app.models.Alert;

    // Get userId
    const userId = req.accessToken.userId;
    if (!userId) {
      next(null, "Please login or use a valid access token.");
    }

    Alert.findOne({where: {id: alertId}, include: "Device"}, (err: any, alertInstance: any) => {
      alertInstance = alertInstance.toJSON();
      // this.triggerAlert(alertInstance, alertInstance.Device, 'Testing alert!', {lat: 48.880543, lng: 2.299845}, true);
      this.triggerAlert(alertInstance, alertInstance.Device, "Testing alert!", null, true);
    });
    next();
  }

  private triggerByData(data_parsed: any, device: any, req: any, next: Function): void {
    // Get userId
    const userId = req.accessToken.userId;
    if (!userId) {
      next(null, "Please login or use a valid access token.");
    } else if (!device.Alerts) {
      next(null, "No alerts set for this device.");
    }

    const alerts = device.Alerts;
    if (!alerts) return next('No alerts');
    // Loop in all the alerts
    alerts.forEach((alert: any, index: any) => {
      // Only check active alerts
      if (alert.active) {
        if (alert.value) {
          /**
           *  Triggering alerts from keys in "data_parsed"
           *  If the key being read is set for an alert and if it is activated
           */
            // Build the custom message
          let alertMessage = "";
          let strToMatch = "";
          if (alert.message) {
            try {
              strToMatch = JSON.stringify(alert.message);
            } catch (e) {
              strToMatch = alert.message;
            }
          }
          const regex = /\[(.*?)\]/g;
          let matched: any[] = [];
          let match;
          while ((match = regex.exec(strToMatch)) != null) {
            matched.push(match[1]);
          }
          data_parsed.forEach((p: any) => {
            if (alert.message) {
              try {
                for (let match of matched) {
                  if (match === p.key) {
                    strToMatch = strToMatch.replace("[" + match + "]", p.value.toString());
                    alertMessage = JSON.parse(strToMatch);
                  }
                }
              } catch (e) {
                // console.log('No need to search for a custom message formatting.');
              }
              if (alertMessage === "") {
                alertMessage = alert.message;
              }
            }
          });
          console.log(alertMessage);
          // Process conditions
          data_parsed.forEach((p: any) => {
            if (alert.key === p.key) {
              // Verify conditions for the alert to be triggered
              if (
                (alert.value.exact != null && p.value == alert.value.exact)
                || (alert.value.min != null && alert.value.max != null && p.value >= alert.value.min && p.value <= alert.value.max)
                || (alert.value.less != null && p.value < alert.value.less)
                || (alert.value.more != null && p.value > alert.value.more)
              ) {
                if (!alert.message) {
                  alertMessage = p.key.charAt(0).toUpperCase() + p.key.slice(1) + ": " + p.value + " " + p.unit;
                }
                // Trigger alert
                this.triggerAlert(alert, device, alertMessage);
              }
              return;
            }
          });
        }
      }
    });
    next(null, "Processed alerts.");
  }

  private triggerAlert(alert: any, device: any, alertMessage?: string, location?: any, test?: boolean) {
    // Models
    console.error(alertMessage);
    const Connector = this.model.app.models.Connector;
    const Alert = this.model.app.models.Alert;
    const AlertHistory = this.model.app.models.AlertHistory;

    Connector.findById(alert.connectorId,
      (err: any, connector: any) => {
        if (err) {
          console.error(err);
        } else if (connector) {
          if (connector.type === "office-365") {
            console.log("Office 365 Email alert!");
            // Set the connector user and pass
            const transporter = nodemailer.createTransport({
              type: "SMTP",
              host: "smtp.office365.com",
              secure: false,
              port: 587,
              auth: {
                user: connector.login,
                pass: decrypt(connector.password),
              },
            });
            const title = device.name ? device.name : device.id;
            let options = {
              to: "",
              from: "",
              subject: "",
              html: "",
            };

            if (!location) {
              options = {
                to: connector.recipient,
                from: connector.login,
                subject: "[Sigfox Platform] - Alert for " + title,
                html: "Hey! <p>An alert has been triggered for the device: <b>" + title + "</b></p><p>" + alertMessage + "</p>",
              };
            } else {
              options = {
                to: connector.recipient,
                from: connector.login,
                subject: "[Sigfox Platform] - Alert for " + title,
                html: "Hey! <p>An alert has been triggered for the device: <b>" + title + "</b></p><p>" + alertMessage + "</p><br>" +
                  '<a href=\"https://www.google.com/maps/place/' + location.lat + "," + location.lng + '/\">' +
                  '<img src=\"https://maps.googleapis.com/maps/api/staticmap?' +
                  "center=" + location.lat + "," + location.lng +
                  "&zoom=12" +
                  "&scale=1" +
                  "&size=600x300" +
                  "&maptype=roadmap" +
                  "&key=AIzaSyBFDtqOXHsFg-a60JWayUJmYumKQxn8G1o" +
                  "&format=png" +
                  "&visual_refresh=true" +
                  "&markers=size:mid%7Ccolor:0x792faa%7Clabel:Position%7C" + location.lat + "," + location.lng + '\" alt=\"Position\"></a>',
              };
            }
            transporter.sendMail(options, (err: any, mail: any) => {
              if (err) {
                console.error(err);
              } else {
                console.log("EmailOutlook sent!");
              }
            });
          } else if (connector.type === "webhook") {
            console.log("Webhook alert!");
            try {
              alertMessage = JSON.parse(alertMessage);
            } catch (e) {
              if (test) {
                alertMessage = JSON.parse('{"text": "This is a test message!"}');
              } else {
                alertMessage = JSON.parse('{"text": "Invalid JSON in webhook alert message!"}');
              }
            }
            this.model.app.dataSources.webhook.send(connector.url, connector.method, decrypt(connector.password), alertMessage).then((result: any) => {
              console.log("Webhook request sent!");
            }).catch((err: any) => {
              if (err) {
                console.error(err);
              }
            });
          } else if (connector.type === "free-mobile") {
            console.log("Free Mobile SMS alert!");
            this.model.app.dataSources.freeMobile.sendSMS(connector.login, decrypt(connector.password), alertMessage).then((result: any) => {
            }).catch((err: any) => {
              if (err) {
                console.error("Free Mobile error");
              } else {
                console.log("Free Mobile sent!");
              }
            });
          } else if (connector.type === "twilio") {
            console.log("Twilio SMS alert!");
            // TODO: implement twilio connector
          } else if (connector.type === "mqtt") {
            // console.log("MQTT alert!");
            // const client = new Client({host: connector.host, port: connector.port}, Adapter);
            // try {
            //   client.publish(connector.topic, alertMessage);
            // } catch (e) {
            //   console.error(e);
            // }
          } else if (connector.type === "nexmo-sms") {
            const nexmo = new Nexmo({
              apiKey: connector.login,
              apiSecret: decrypt(connector.password)
            });
            const from = 'Sigfox Platform';
            const to = connector.recipient;
            const text = alertMessage;
            nexmo.message.sendSms(from, to, text);
          }

          if (!test) {
            // Check if alert is one shot only, if yes: deactivate it
            if (alert.one_shot) {
              alert.active = false;
            }
            // Update the alert last trigger time
            alert.triggeredAt = new Date();
            Alert.upsert(
              alert,
              (err: any, alertInstance: any) => {
                if (err) {
                  console.error(err);
                } else {
                  // Save triggered alerts in AlertHistory
                  let alertClone = JSON.parse(JSON.stringify(alertInstance));
                  delete alertClone.id;
                  if (alertMessage)
                    alertClone.message = JSON.stringify(alertMessage);

                  AlertHistory.create(alertClone, (err: any, alert: any) => {
                    err?
                      console.error(err):
                      console.log("Created alert history");
                  });
                }
              });
          }
        }
      });
  }

  public afterDelete(ctx: any, next: Function): void {
    let alert = ctx.instance;
    if (alert) {
      // if the message is delete via a cascade, no instance is provided
      const payload = {
        event: "alert",
        content: alert,
        action: "DELETE"
      };
      RabbitPub.getInstance().pub(payload);
    }
    next();
  }


  public afterSave(ctx: any, next: Function): void {
    // Pub-sub
    let alert = ctx.instance;
    const payload = {
      event: "alert",
      content: alert,
      action: ctx.isNewInstance ? "CREATE" : "UPDATE"
    };
    RabbitPub.getInstance().pub(payload);
    next();
  }
}

module.exports = Alert;
