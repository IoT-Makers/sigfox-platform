var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Connector unit tests:', () => {
  it('Should create a Connector instance', (done) => {
    api.post('/connectors').send({
      name: 'test'
    }).expect(200, done);
  });
});
