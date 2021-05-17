var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Organisation unit tests:', () => {
  it('Should create a Organisation instance', (done) => {
    api.post('/Organisations').send({
      name: 'test'
    }).expect(200, done);
  });
});
