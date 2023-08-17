//making boxes
const boxFactory = () => {
    let value = 0;

    const addSymbol = (symbol) => {
        value = symbol;
    }

    const getValue = () => {
        return value;
    }
    

    return {
        addSymbol,
        getValue,
    }
}
//the gameboard

const playerFactory = (name, symbol) => {
    const getName = () =>{
        console.log(name);
        return name;
    }
    const getSymbol = () =>{
        return symbol;
    }
    return{
        getName,
        getSymbol
    }
}
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
    const getBoard = () => {
        return board;
    }
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
    const clear = () => {
        for(let i = 2; i >= 0; i--){
            for(let j = 0; j < columns; j++){
                board[i].pop();
            }
            board.pop();
        }
        for(let i = 0; i < rows; i++){
            row = []; //turns each row into an array
            for(let j = 0; j < columns; j++){
                row.push(boxFactory()); //puts a box in every spot of the array, for each row
            }
            board.push(row);
        }
    }
    return {getBoard, play, printBoard, clear};
}
const p1 = playerFactory("Player One", 'X');
const p2 = playerFactory("Player Two", "O");
const dia = document.querySelector('.endgame');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
//controlling the actual game
function GameController(p1, p2){
    const board = GameBoard();
    const players = [
        p1,
        p2
    ];

    let activePlayer = players[0];

    const changeTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => {
        return activePlayer;
    }


    const newRound = () => {
        board.printBoard();
        console.log(`${activePlayer.getName()}'s turn`)
        if(activePlayer.getSymbol() == 'X'){
            left.setAttribute('style', 'background-color: gold');
            right.setAttribute('style', 'background-color: white');
        }
        if(activePlayer.getSymbol() == 'O'){
            left.setAttribute('style', 'background-color: white');
            right.setAttribute('style', 'background-color: gold');
        }
    }
    const boardShare = () =>{
        return board;
    }
    const checkWin = function(){
        gameWon = false;
        boardArr = board.getBoard();
        if(boardArr[0][0].getValue() == boardArr[0][1].getValue() && boardArr[0][1].getValue() == boardArr[0][2].getValue() && boardArr[0][0].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[0][0].getValue() == boardArr[1][0].getValue() && boardArr[1][0].getValue() == boardArr[2][0].getValue() && boardArr[0][0].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[1][0].getValue() == boardArr[1][1].getValue() && boardArr[1][1].getValue() == boardArr[1][2].getValue() && boardArr[1][0].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[2][0].getValue() == boardArr[2][1].getValue() && boardArr[2][1].getValue() == boardArr[2][2].getValue() && boardArr[2][0].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[0][1].getValue() == boardArr[1][1].getValue() && boardArr[1][1].getValue() == boardArr[2][1].getValue() && boardArr[0][1].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[0][2].getValue() == boardArr[1][2].getValue() && boardArr[1][2].getValue() == boardArr[2][2].getValue() && boardArr[0][2].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[0][0].getValue() == boardArr[1][1].getValue() && boardArr[1][1].getValue() == boardArr[2][2].getValue() && boardArr[0][0].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        if(boardArr[0][2].getValue() == boardArr[1][1].getValue() && boardArr[1][1].getValue() == boardArr[2][0].getValue() && boardArr[0][2].getValue() != 0){
            gameWon = true;
            console.log('wow you won!');
        }
        return gameWon;
    }
    const playRound = (row, column) => {
        //place player's symbol in the box
        if (board.getBoard()[row][column].getValue() == 0){
            console.log(
                `placing ${activePlayer.getSymbol()} in box (${row}, ${column})`
            );
            board.play(row, column, activePlayer.getSymbol());
    
            // check for winner, idk how to do that at all yet
    
            //switch turns if game isn't over
            if(!checkWin()){
                changeTurn();
                newRound();
            }
            if(checkWin()){
                wl = document.querySelector('.winlose');
                wl.textContent = `${activePlayer.getName()} (${activePlayer.getSymbol()}) wins!`
                dia.showModal();
            }
            
        }
        
    }

    //initializing game
    newRound();

    return {
        playRound,
        getActivePlayer,
        boardShare,
        checkWin
    };
}
resetbtn = document.querySelector('.reset');
resetbtn.addEventListener('click', function(){
    dia.close();
    const board = game.boardShare();
    boxes.forEach((box) => {
        box.textContent = '';
    })
    board.clear();
    
})
// //create the actual game
const game = GameController(p1,p2);
// //ok i tihnk i need to keep track of whether or not a space is taken from outside the class structure which is annoying but not too bad.


boxSymbol = function(box, symbol){
    if(!game.checkWin())
        if(box.textContent == ""){
            const txt = document.createTextNode(symbol);
            box.appendChild(txt);
        }
    
}
boxes = document.querySelectorAll('.box');
clr = document.querySelector('.clrbtn');
clr.addEventListener('click', function(){
    const board = game.boardShare();
    boxes.forEach((box) => {
        box.textContent = '';
    })
    board.clear();
})

aa.addEventListener('click', function(){
    boxSymbol(aa, game.getActivePlayer().getSymbol());
    game.playRound(0,0);
})
ab.addEventListener('click', function(){
    boxSymbol(ab, game.getActivePlayer().getSymbol());
    game.playRound(0,1);
})
ac.addEventListener('click', function(){
    boxSymbol(ac, game.getActivePlayer().getSymbol());
    game.playRound(0,2);
})
ba.addEventListener('click', function(){
    boxSymbol(ba, game.getActivePlayer().getSymbol());
    game.playRound(1,0);
})
bb.addEventListener('click', function(){
    boxSymbol(bb, game.getActivePlayer().getSymbol());
    game.playRound(1,1);
})
bc.addEventListener('click', function(){
    boxSymbol(bc, game.getActivePlayer().getSymbol());
    game.playRound(1,2);
})
ca.addEventListener('click', function(){
    boxSymbol(ca, game.getActivePlayer().getSymbol());
    game.playRound(2,0);
})
cb.addEventListener('click', function(){
    boxSymbol(cb, game.getActivePlayer().getSymbol());
    game.playRound(2,1);
})
cc.addEventListener('click', function(){
    boxSymbol(cc, game.getActivePlayer().getSymbol());
    game.playRound(2,2);
})
