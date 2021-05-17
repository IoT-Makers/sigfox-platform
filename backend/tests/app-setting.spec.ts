var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('AppSetting unit tests:', () => {
  it('Should create a AppSetting instance', (done) => {
    api.post('/AppSettings').send({
      key: 'test',
      value: 'test'
    }).expect(200, done);
  });
});
