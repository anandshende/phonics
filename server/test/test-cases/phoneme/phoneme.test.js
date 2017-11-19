var expect = require('expect');
var supertest = require('supertest');
var bodyParser = require('body-parser');
var compression = require('compression');


var app = require('../../../src/server').app;
app.use(compression);
app.use(bodyParser.urlencoded({ extended: false }));

var name = "ub"
describe('Phoneme Test', () => {
    it('should add phoneme', (done) => {
        supertest(app)
            .post('/phoneme')
            .type('json')
            .send({ name: name })
            .expect('1 row affected')
            .end(done);
    });

    it('should delete phoneme', (done) => {
        supertest(app)
            .delete('/phoneme/3')
            .expect('1 row affected')
            .end(done);
    });
});