'use strict';

import {encrypt} from '../../common/models/utils';

/**
 * This bootscript is used to upgrade the application during boot-up !
 * @param app
 */

module.exports = (app: any) => {

  const Organization = app.models.Organization;
  Organization.find({}, (err: any, organizations: any) => {
    organizations.forEach((organization: any) => {
      if (organization.ownerId) {
        organization.updateAttributes({userId: organization.ownerId, ownerId: null}, (err: any, organizationUpdated: any) => {
          console.log('Updated organization as: ', organizationUpdated);
        });
      }
    });
  });

  const runScript = false;

  if (runScript) {
    const Connector = app.models.Connector;
    Connector.find({}, (err: any, connectors: any) => {
      connectors.forEach((connector: any) => {
        connector.updateAttributes({password: encrypt(connector.password)}, (err: any, connectorUpdated: any) => {
          console.log('Updated connector as: ', connectorUpdated);
        });
      });
    });
  }
};
