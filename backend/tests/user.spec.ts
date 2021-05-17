var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('user unit tests:', () => {
  it('Should create a user instance', (done) => {
    api.post('/users').send({}).expect(200, done);
  });
});
