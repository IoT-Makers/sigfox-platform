var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('organization unit tests:', () => {
  it('Should create a organization instance', (done) => {
    api.post('/organizations').send({
      name: 'test'
    }).expect(200, done);
  });
});
