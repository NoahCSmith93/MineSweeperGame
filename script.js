// Psuedocode 

// Initialize the board to a fresh state
// Generate random values for each tile, including setting mine locations
    // each tile should have two simultaneous states
    // one state will determine its value, either blank (0), a mine, or the number of adjacent mines
    // the other state will determine its display state, either hidden or revealed

// Handle the player clicking on a tile
    // Determine if the tile is a mine or not
    // Reveal the tile
    // Reveal the surrounding tiles with a value of 0
    // Reveal the edge tiles with non-mine value

// Check for a win or loss
    // if the last clicked tile was a mine, return a loss
    // if there are only mine tiles left covered, return a win

// Allow the player to play again with a button


class Tiles {
    constructor(col, row) {
        this.row = row
        this.col = col
        this.hidden = true
        this.mine = false
        this.div = document.createElement("div")
    }
}

let winState
let boardSize
let board


function init() {
    winState = null
    boardSize = 16
    board = []
    createTiles()
    render()
}

function createTiles() {
    for (let i = 0; i < boardSize; i++) {
        board.push([])
    }
    // console.log("This is board after createTiles:", board)
}

function renderBoard() {
    board.forEach((column) => {
        column
    })
}

function renderMessage() {

}

function renderButton() {

}

function render() {
    renderBoard()
    renderMessage()
    renderButton()
}




init()