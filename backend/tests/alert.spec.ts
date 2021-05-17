var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Alert unit tests:', () => {
  it('Should create a Alert instance', (done) => {
    api.post('/alerts').send({
      type: 'test'
    }).expect(200, done);
  });
});
