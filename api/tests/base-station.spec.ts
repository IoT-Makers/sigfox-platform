var should    = require('chai').should();
var supertest = require('supertest');
var api       = supertest('http://localhost:3000/api');

describe('BaseStation unit tests:', () => {
    it('Should create a BaseStation instance', (done: Function) => {
        api.post('/BaseStations').send({}).expect(200, done);
    });
});
