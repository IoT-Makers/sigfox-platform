var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('reception unit tests:', () => {
  it('Should create a reception instance', (done) => {
    api.post('/receptions').send({
      id: 'test',
      location: { lat: 100.100, lng: 100.100 }
    }).expect(200, done);
  });
});
