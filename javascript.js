function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        row = []; //turns each row into an array
        for(let j = 0; j < columns; j++){
            row.push(boxFactory()); //puts a box in every spot of the array, for each row
        }
        board.push(row);
    }
    const getBoard = () => board; //lets me access it later

    const play = (row, column, symbol) => {
        //im gonna need to:
        //check if the game is over,
        //check if the box is taken
        //make sure its the right players turn maybe??
        //and then fill the box with the player's symbol
        if((board[row])[column].getValue() == 0){
            (board[row])[column].addSymbol(symbol);
        }

    }
    const printBoard = () => {
        //put some way to print the board to the console here
        //should help with troubleshooting and figuring eveyrthing out
        //before i start building the visuals
        console.log(`${board[0][0].getValue()}, ${board[0][1].getValue()}, ${board[0][2].getValue()}`);
        console.log(`${board[1][0].getValue()}, ${board[1][1].getValue()}, ${board[1][2].getValue()}`);
        console.log(`${board[2][0].getValue()}, ${board[2][1].getValue()}, ${board[2][2].getValue()}`);
    }
    return {getBoard, play, printBoard};
}

//making boxes
const boxFactory = () => {
    let value = 0;

    const addSymbol = (symbol) => {
        value = symbol;
    }

    const getValue = () => value;
    

    return {
        addSymbol,
        getValue,
    }
}
//controlling the actual game
function GameController(p1 = "Player One", p2 = "Player Two"){
    const board = GameBoard();

    const players = [
        {
            name: p1,
            symbol: 1
        },
        {
            name: p2,
            symbol: 2
        }
    ];

    let activePlayer = players[0];

    const changeTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => {
        activePlayer;
    }

    const newRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`)
    }

    const playRound = (row, column) => {
        //place player's symbol in the box
        roundOver = false;
        while(roundOver == false) {
            if((board.getBoard()[row])[column].getValue() == 0){
                console.log(
                    `placing ${activePlayer.symbol} in box (${row}, ${column})`
                );
                board.play(row, column, activePlayer.symbol);
                roundOver = true;
            }
        }

        // check for winner, idk how to do that at all yet

        //switch turns if game isn't over
        changeTurn();
        newRound();
    }

    //initializing game
    newRound();

    return {
        playRound,
        getActivePlayer
    };
}

//create the actual game
const game = GameController();