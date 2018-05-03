'use strict';
const loopback = require('loopback');

module.exports = (app: any) => {

  const Beacon = app.models.Beacon;
  Beacon.destroyAll(null, (error: any, result: any) => {
    if (error) {
      console.error(error);
    } else {
      const beacons = [
        {id: '00001', type: 'sigfox', location: new loopback.GeoPoint({lat: 48.883584, lng: 2.302417}) },
        {id: '00003', type: 'sigfox', location: new loopback.GeoPoint({lat: 48.883160, lng: 2.302553}) }
      ];
      beacons.forEach((beacon) => {
        Beacon.create(beacon, (err: any, beacon: any) => {
          if (err) {
            console.error(err);
          }
          // (created) ? console.log('created: ', createdObject)
          //   : console.log('found: ', createdObject);
        });
      });
    }
  });
};
