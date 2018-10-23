/**
 * This bootscript is used to upgrade the application during boot-up!
 * @param app
 */

module.exports = (app: any) => {
  app.models.user.updateAll(null, {connected: false});
};
