module.exports = (app: any) => {

  const runScript = false;

  if (runScript) {
    const Beacon = app.models.Beacon;
    Beacon.destroyAll(null, (error: any, result: any) => {
      if (error) {
        console.error(error);
      } else {
        const beacons_paris = [
          {id: '11101', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 48.883584, lng: 2.302417})},
          {id: '11103', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 48.883160, lng: 2.302553})}
        ];
        beacons_paris.forEach((beacon) => {
          Beacon.create(beacon, (err: any, beacon: any) => {
            if (err) {
              console.error(err);
            }
          });
        });

        const beacons_toulouse = [
          {id: '00001', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 43.543559, lng: 1.511003})},
          {id: '00002', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 43.543758, lng: 1.511194})},
          {id: '00003', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 43.543785, lng: 1.511163})},
          {id: '00004', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 43.543743, lng: 1.511243})},
          {id: '00005', type: 'sigfox', location: new app.loopback.GeoPoint({lat: 43.543769, lng: 1.511215})}
        ];
        beacons_toulouse.forEach((beacon) => {
          Beacon.create(beacon, (err: any, beacon: any) => {
            if (err) {
              console.error(err);
            }
          });
        });
      }
    });
  }
};
