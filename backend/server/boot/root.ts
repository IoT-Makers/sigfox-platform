'use strict';

export = function (server: any) {
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
