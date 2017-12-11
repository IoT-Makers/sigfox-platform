var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('DevAccessToken unit tests:', () => {
    it('Should create a DevAccessToken instance', (done: Function) => {
        api.post('/dev-access-tokens').send({}).expect(200, done);
    });
});
