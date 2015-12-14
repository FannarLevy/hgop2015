var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when move wins the game', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"4567",
      event:"GameCreated",
      name:"test game",
      userName: "Fannar",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"4567",
      event:"GameJoined",
      userName: "Isak",
      otherUserName: "Fannar",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on player x making a move that connects 3 x in in the first column', function(){
    it('should win the game for player x',function(){
      given.push({
        id:"4567",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:0,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"4567",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:1,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"4567",
        comm:"PlaceMove",
        userName:"Isak",
        x:0,
        y:2,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"4567",
        event:"GameWon",
        userName:"Isak",
        name:"test game",
        x:0,
        y:2,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      }];
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
  });

  describe('on player o making a move that connects 3 o in the third row', function(){
    it('should win the game for player o',function(){
      given.push({
        id:"8989",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:0,
        y:2,
        side:'o',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"8989",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:1,
        y:2,
        side:'o',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"8989",
        comm:"PlaceMove",
        userName:"Fannar",
        x:2,
        y:2,
        side:'o',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"8989",
        event:"GameWon",
        userName:"Fannar",
        name:"test game",
        x:2,
        y:2,
        side:'o',
        timeStamp: "2015.12.02T11:30:50"
      }];
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
  });

  describe('on player x making a move that connects 3 x from corner to corner', function(){
    it('should win the game for player o',function(){
      given.push({
        id:"4134",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:0,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"4134",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:2,
        y:2,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"4134",
        comm:"PlaceMove",
        userName:"Isak",
        x:1,
        y:1,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"4134",
        event:"GameWon",
        userName:"Isak",
        name:"test game",
        x:1,
        y:1,
        side:'x',
        timeStamp: "2015.12.02T11:30:50"
      }];
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
  });

});
