'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id: "1234",
      gameId: "100000",
      comm: "CreateGame",
      userName: "Fannar",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/100000')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "100000",
                "event": "GameCreated",
                "userName": "Fannar",
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });

   // create game scenario
   it('Should create game', function (done) {
     given(user("YourUser").createsGame("GameIdOne").named("TheFirstGame"))
     .expect("GameCreated").withName("TheFirstGame").isOk(done);
   });

/*
   // join game scenario
   it('Should create a game and join opponent player', function (done) {
     given(user("YourUser").createsGame("GameIdTwo").named("TheSecondGame"))
     .and(user("OtherUser").joinsGame("GameIdTwo"))
     .expect("GameJoined").withName("TheSecondGame").isOk(done);
   });
*/

/*   it('Should play game until won or drawn', function (done) {
     given(user("YourUser").createsGame("GameIdOne").named("TheFirstGame"))
       .and(user("OtherUser").joinsGame("GameIdOne"))
       .and(user("YourUser").placesMove(0,0))
       .and(user("OtherUser").placesMove(1,1))
       .andSomeMoreMovesThatLeadToVictory
     .expect("GameDraw").byUser("OtherUser").isOk(done);
   });
*/

  // win scenario

  // draw scenario
   
});
