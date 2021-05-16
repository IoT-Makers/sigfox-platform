var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Geoloc unit tests:', () => {
  it('Should create a Geoloc instance', (done) => {
    api.post('/geolocs').send({
      type: 'test',
      lat: 12345,
      lng: 12345,
      precision: 12345
    }).expect(200, done);
  });
});
