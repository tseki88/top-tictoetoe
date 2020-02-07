const cells = document.querySelectorAll("li");


// gameBoard object, using module pattern as it is only needed once. (IIFE)
const gameBoard = (() => {
    // State
    const board = [];
    // Given there's ever only 2 players, using boolean for state
    let player1 = true;
    // fills the array with 9 empty strings
    const numberOfCells = 9;
    
    // Resets Board to Initial State
    const initializeBoard = () => {
        board.length = 0;
        for (let i = 0; i < numberOfCells; i++) {
            board.push("");
        }
        player1 = true;
        renderBoard();
    }

    // Renders updated data to DOM
    const renderBoard = () => {
        for (let i = 0; i < board.length; i++) {
            document.getElementById(`${i}`).innerText = board[i];
        }
    }

    // event handler to select the cell
    cells.forEach((e) => {
        e.addEventListener("click", () => {
            populateCell(e.id)
        })
    })
    
    // checks current player, populates cell with appropriate symbol
    const populateCell = (cellNumber) => {
        if (board[cellNumber] === "") {
            board[cellNumber] = (player1 ? "O" : "X");
            renderBoard();
            console.log(board);
            player1 = !player1;
            console.log(player1)
            checkWinner()
        }
    }

    return {
        initializeBoard,    
        board
    }
})();


// Initial Render
gameBoard.initializeBoard();

// Reset of Board
document.getElementById("reset").addEventListener("click", gameBoard.initializeBoard)


// returns player object
// Use factory functions as we need more than 1.
const Player = function(name, symbol) {
    let score = 0;
    return {name, symbol, score}
}

const player1 = Player("Steve", "O");
const player2 = Player("PC", "X");


const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// any of the win condition possibilities are the same symbol, end game and increase score by 1.
function checkWinner() {
    let winningSymbol = ""

    let isThereAWinner = winCondition.find(condition => {
        let box = gameBoard.board;
        if (box[condition[0]] === box[condition[1]] && box[condition[0]] === box[condition[2]] && box[condition[0]] !== "") {
            winningSymbol = box[condition[0]]
            return true;
        };
    })

    if (isThereAWinner) {       
        alert(`${winningSymbol} wins!`)
    }
}
