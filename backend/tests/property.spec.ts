var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('Property unit tests:', () => {
  it('Should create a Property instance', (done) => {
    api.post('/Properties').send({
      key: 'test',
      type: 'test',
      unit: 'test'
    }).expect(200, done);
  });
});
