const es = require('event-stream');

/**
 * This bootscript is used to load event streams
 * @param app
 */

module.exports = (app: any) => {
  const Message = app.models.Message;
  Message.createChangeStream((err: any, changes: any) => {
    //changes.pipe(es.stringify()).pipe(process.stdout);
    changes.pipe(es.stringify());
  });
};
