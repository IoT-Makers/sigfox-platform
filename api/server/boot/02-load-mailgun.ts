/**
 * This bootscript dynamically adds a mail service datasource to the Email loopback model
 * @param app
 */

module.exports = (app: any) => {

  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;

  if (mailgunApiKey && mailgunDomain) {
    console.log('Loading mailgun with: ' + mailgunApiKey + ' | ' + mailgunDomain);

    const DataSource = require('loopback-datasource-juggler').DataSource;
    const dataSource = new DataSource('mailgun', {
      connector: 'loopback-connector-mailgun',
      apikey: mailgunApiKey,
      domain: mailgunDomain
    });

    app.models.Email.attachTo(dataSource);
  } else {
    console.log('No email service provided.');
  }
};
