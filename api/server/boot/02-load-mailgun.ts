/**
 * This bootscript dynamically adds a mail service datasource to the Email loopback model
 * @param app
 */

module.exports = (app: any) => {

  const mailgunApiKey = process.env.MAILGUN_API_KEY;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;
  const mailgunRegion = process.env.MAILGUN_REGION;

  if (mailgunApiKey && mailgunDomain && mailgunRegion) {
    console.log('Using mailgun with: \n\tAPI key: ' + mailgunApiKey + ' | Domain: ' + mailgunDomain + ' | Region: ' + process.env.MAILGUN_REGION);

    const DataSource = require('loopback-datasource-juggler').DataSource;
    const dataSource = new DataSource('mailgun', {
      connector: 'loopback-connector-mailgun',
      apikey: mailgunApiKey,
      domain: mailgunDomain,
    });

    app.models.Email.attachTo(dataSource);
  } else {
    console.log('No email service provided.');
  }
};
