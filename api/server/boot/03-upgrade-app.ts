'use strict';

import {encrypt} from '../../common/models/utils';


/****
 * This bootscript is used to upgrade the application during boot-up !
 * @param app
 */

module.exports = (app: any) => {

  const runOnce = false;

  const Connector = app.models.Connector;

  if (runOnce) {
    Connector.find({}, (err: any, connectors: any) => {
      connectors.forEach((connector: any) => {
        connector.updateAttributes({password: encrypt(connector.password)}, (err: any, connectorInstance: any) => {
          console.log('Connected connector as: ', connectorInstance);
        });
      });
    });
  }
};
