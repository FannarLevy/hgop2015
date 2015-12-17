var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when place a move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"1234",
      event:"GameCreated",
      name:"test game",
      userName: "Fannar",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"12345",
      event:"GameJoined",
      userName: "Isak",
      otherUserName: "Fannar",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"12345",
        comm:"PlaceMove",
        userName : "Isak",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"12345",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe("on previous move", function(){
    it('placing move in a field already set should be illegal',function(){
      given.push({
        id:"12345",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"12345",
        comm:"PlaceMove",
        userName : "Isak",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12345",
        event:"IllegalMove",
        userName:"Isak",
        name:"test game",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });


  describe("switch players after move", function(){
    it('place a move after the other player has made his move',function(){
      given.push({
        id:"4567",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:1,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"4567",
        comm:"PlaceMove",
        userName : "Fannar",
        x:2,
        y:2,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"4567",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:2,
        y:2,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

});
