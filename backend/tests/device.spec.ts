var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Device unit tests:', () => {
  it('Should create a Device instance', (done) => {
    api.post('/Devices').send({
      name: 'test'
    }).expect(200, done);
  });
});
