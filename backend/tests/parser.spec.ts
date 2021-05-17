var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Parser unit tests:', () => {
  it('Should create a Parser instance', (done) => {
    api.post('/Parsers').send({
      name: 'test'
    }).expect(200, done);
  });
});
