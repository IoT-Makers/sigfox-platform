var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('AlertHistory unit tests:', () => {
  it('Should create a AlertHistory instance', (done) => {
    api.post('/alert-histories').send({}).expect(200, done);
  });
});
