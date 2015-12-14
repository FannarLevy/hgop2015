var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    moveCount : 0,
    board: [['','',''],
            ['','',''],
            ['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
      gameState.moveCount++;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          name: cmd.name

        }];
      }
    },

    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },

    "PlaceMove": function(cmd){
      // Check is move has already been placed
      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }
      // Valid move, mark board with player site token
      else{
        gameState.board[cmd.x][cmd.y] = cmd.side;
        gameState.moveCount++;
      }

      // Check for vertical winnig move
      for (var i = 0; i < 3; i++) {
        if( (gameState.board[i][0] === cmd.side) && (gameState.board[i][1] === cmd.side) && (gameState.board[i][2] === cmd.side) ) {
          return [{
            id: cmd.id,
            event: "GameWon",
            userName: cmd.userName,
            name:gameState.gameCreatedEvent.name,
            x:cmd.x,
            y:cmd.y,
            side:cmd.side,
            timeStamp: cmd.timeStamp
          }]
        }     
      }      

      // Check for horizontal winnig move
      for (var n = 0; n < 3; n++) {
        if( (gameState.board[0][n] === cmd.side) && (gameState.board[1][n] === cmd.side) && (gameState.board[2][n] === cmd.side) )
        {
          return [{
            id: cmd.id,
            event: "GameWon",
            userName: cmd.userName,
            name:gameState.gameCreatedEvent.name,
            x:cmd.x,
            y:cmd.y,
            side:cmd.side,
            timeStamp: cmd.timeStamp
          }]
        }     
      } 

      // Check for diagonal winnig move
      if(   ( (gameState.board[0][0] === cmd.side) && (gameState.board[1][1] === cmd.side) && (gameState.board[2][2] === cmd.side) ) || ( (gameState.board[0][2] === cmd.side) && (gameState.board[1][1] === cmd.side) && (gameState.board[2][0] === cmd.side) )) {
        return [{
          id: cmd.id,
          event: "GameWon",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }

     // Check for draw
     if (gameState.moveCount === 9) {
        return [{
          id: cmd.id,
          event: "GameDraw",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
     }
      
     // Valid move
     return [{
       id: cmd.id,
       event: "MoveMade",
       userName: cmd.userName,
       name:gameState.gameCreatedEvent.name,
       x:cmd.x,
       y:cmd.y,
       side:cmd.side,
       timeStamp: cmd.timeStamp
      }]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
