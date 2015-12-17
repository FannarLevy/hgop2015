var tictactoeCommandHandler = require('./tictactoeCommandHandler');



  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"2435",
      event:"GameCreated",
      name:"test game",
      userName: "Fannar",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"2435",
      event:"GameJoined",
      userName: "Isak",
      otherUserName: "Fannar",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('drawn if the last move is not a winnig move', function(){
    it('should draw the game',function(){
      given.push({
        id:"2435",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:1,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:0,
        y:1,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:2,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:1,
        y:2,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Isak",
        name:"test game",
        x:1,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"2435",
        event:"MoveMade",
        userName:"Fannar",
        name:"test game",
        x:2,
        y:0,
        side:'O',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"2435",
        comm:"PlaceMove",
        userName:"Isak",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"2435",
        event:"GameDraw",
        userName:"Isak",
        name:"test game",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
  });


