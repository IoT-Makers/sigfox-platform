var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Beacon unit tests:', () => {
  it('Should create a beacon instance', (done) => {
    api.post('/Beacons').send({
      type: 'test',
      location: { lat: 100.100, lng: 100.100 },
      createdAt: 'Thu May 03 2018 09:54:37 GMT+0200 (Paris, Madrid (heure d’été))'
    }).expect(200, done);
  });
});
