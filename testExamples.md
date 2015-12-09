#Event based unit test specification for a TicTacToe game

Format of the events is:
Given [ event preconditions]
When  [ action performed to trigger event ]
Then  [ resulting events ]

TicTacToe board is represented as an 3x3 array
-------------------------
| [0,0] | [0,1] | [0,2] |
-------------------------
| [1,0] | [1,1] | [1,2] |
-------------------------
| [2,0] | [2,1] | [2,2] |

Two player are involved:
player X
player O
 

##Allowed events are
**Game events:**
- gameCreated       = start of new game
- gameReady         = start of new game
- gameWon           = current player wins the game
- gameLost          = other player wins the game
- gameDraw          = no winning move possible
- gameCompleted     = no further moves allowed
- gamePlacedCount   = number of token placement performe int current game

**Player events:**
- playerActive      = set the active player
- playerPlacedToken = player marked a square with their token
- playerNotifyIllegalMove = notify that the move is illegal


##Game
Player X start the match when game is created
Given [ ]
When  [ gameCreated ]
Then  [ playerActive(player X) ]

Switch active player when token has been placed
Given [ ]
When  [ playerPlacedToken(player X) ]
Then  [ playerActive(player O) ]

Switch active player when token has been placed
Given [ ]
When  [ playerPlacedToken(player O) ]
Then  [ playerActive(player X) ]

Game completed
Given [ ]
When  [ gameWon() || gameLost() || gameDraw() ]
Then  [ gameCompleted(true) ]


##Wining scenarios

Horizontal win
Given [ playerPlacedToken(0,0,X), playerPlacedToken(0,1,X) ]
When  [ playerPlacedToken(0,2,X) ]
Then  [ gameWon(player X) ]

Vertical win
Given [ playerPlacedToken(0,0,X), playerPlacedToken(1,0,X) ]
When  [ playerPlacedToken(0,2,X) ]
Then  [ gameWon(player X) ]

Diagonal win
Given [ playerPlacedToken(0,0,X), playerPlacedToken(1,1,X) ]
When  [ playerPlacedToken(2,2,X) ]
Then  [ gameWon(player X)]

##Draw scenarios

Given [ gamePlacedCount(9) ]
When  [ gameCompleted(false) ]
Then  [ gameDraw() ]

##Illegal scenarios

Token already placed
Given [ playerPlacedToken(0,0,X) ]
When  [ playerPlacedToken(0,0,O) ]
Then  [ playerNotifyIllegalMove() ]

Token already placed
Given [ playerPlacedToken(2,2,X) ]
When  [ playerPlacedToken(2,2,X) ]
Then  [ playerNotifyIllegalMove() ]


