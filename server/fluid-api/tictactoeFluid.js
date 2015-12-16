var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;



function given(userApi) {

console.log()
console.log()
console.log(userApi)
console.log()
console.log()


  var commands = [];

  var _expectedEvents=[{
    "id": "1234",
    "gameId": userApi._command.gameId,
    "event": "EventName",
    "userName": userApi._command.userName,
    "name": userApi._command.gameId,
    "timeStamp": "2014-12-02T11:29:29"
  }];
  var _currentEvent = 0;
  var expectApi = {
    withName: function (gameName) {
console.log("Running function withName")
      _expectedEvents[_currentEvent].name = gameName;
      return expectApi;
    },
    expect: function (eventName) {
console.log("Running function expect")
      _expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },
    and: function (commandEntry) {
console.log("Running function and")
//      _expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },
    isOk: function (done) {
console.log("Running function isOk")
      var req = request(acceptanceUrl);
      req
        .post('/api/createGame')
        .type('json')
        .send(userApi._command)
        .end(function (err, res) {
          if (err) return done(err);
          request(acceptanceUrl)
            .get('/api/gameHistory/' + userApi._command.gameId)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body).eql(
                _expectedEvents);
              done();
            });
        });
      return expectApi;
    },
  };

  return expectApi;
}

/*
{ _command: 
   { id: '1234',
     gameId: 'GameId1',
     comm: 'CreateGame',
     userName: 'YourUser',
     name: 'TheFirstGame',
     timeStamp: '2014-12-02T11:29:29' },
  createsGame: [Function],
  named: [Function],
  withId: [Function] }
*/

function user(userName) {
  var userApi = {

    _command: undefined,

    createsGame: function (gameId) {
      userApi._command = {
        id: "1234",
        gameId: gameId,
        comm: "CreateGame",
        userName: userName,
        name: gameId,
        timeStamp: "2014-12-02T11:29:29"
      };
      return userApi;
    },

    named: function (gameName) {
      userApi._command.name = gameName;
//      console.log(userApi);
      return userApi;
    },

    withId: function(gameId){
      userApi._command.gameId = gameId;
      return userApi;
    },

    joinsGame: function (gameId) {
      userApi._command = {
        id: "5678",
        gameId: gameId,
        comm: "JoinGame",
        userName: userName,
        //name: gameId,
        timeStamp: "2014-12-02T11:29:29"
      };
//      console.log(userApi);
      return userApi;
    }
    

  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
