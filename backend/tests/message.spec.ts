var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Message unit tests:', () => {
  it('Should create a Message instance', (done) => {
    api.post('/Messages').send({
      data: 'test'
    }).expect(200, done);
  });
});
