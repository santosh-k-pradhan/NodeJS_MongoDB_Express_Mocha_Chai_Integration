//dependency for supertest
let app = require('../app');
let supertest = require('supertest');

//dependency for mocha and chai
var expect  = require('chai').expect;
var assert  = require('chai').assert;
var request = require('request');

//test cases using chai and mocha
describe('Todos list API Integration Tests using mocha and chai', function() {
    describe ('AVAILABLE APIs', function() {
        it('BASE URL TESTING AVAILABILITY TESTING', function(done){
            request('http://localhost:9200/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('BASE URL SUCCESS RESPONSE TESTING TESTING', function(done) {
            request('http://localhost:9200/' , function(error, response, body) {
                expect(body).to.equal('API routing SUCCESS');
                done();
            });
        });

        it('TASKS GET API TESTING SUCCESS TESTING', function(done){
            request('http://localhost:9200/tasks', function(error, response, body) {
                expect(response.statusCode).to.equal(200);                
                done();
            });
        });
    });

    describe ('NON AVAILABILITY API TESTING', function() {
        it('ANY APIs', function(done){
            request('http://localhost:9200/about', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });    
});

//test cases using only supertest
describe('Todos list API Integration Tests using supertest', function() {

    //Here, we are saying, make a get request to the /tasks route in our app. 
    //Once done, it is expected that the response status code should be 200 (i.e okay). 
    //This is will be true if we have a working route /tasks with a get request.
    //Also, we are saying the response body type should be an array.
    describe('#GET / tasks', function() {        
        it('should get all tasks', function(done) {
            supertest(app)
                .get('/tasks')
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    //expect(res.body).to.be.empty;
                    done(); 
                });
        });
    });

    describe('## Create task ', function() {
        it('should create a task', function(done) {
            supertest(app)
                .post('/tasks')
                .send({"name": "santosh","Created_date":Date.now(),"status":["pending"]})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    expect(res.statusCode).to.equal(200);
                    //expect(res.body.name).to.equal('integration test');
                    expect(res.body).to.be.an('object');
                    done();
                });
        });
    });
});
