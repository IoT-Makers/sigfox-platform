'use strict';
const loopback = require('loopback');

module.exports = (app: any) => {

  const Beacon = app.models.Beacon;
  let countBeacons = 0;

  Beacon.count((err: any, result: any) => {
    countBeacons = result;
    if (countBeacons === 0) {
      const beacons = [
        {id: '00001', type: 'sigfox', location: new loopback.GeoPoint({lat: 48.883229, lng: 2.302267}) },
        {id: '00002', type: 'sigfox', location: new loopback.GeoPoint({lat: 48.883294, lng: 2.302361}) },
        {id: '00003', type: 'sigfox', location: new loopback.GeoPoint({lat: 48.883118, lng: 2.302536}) }
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
