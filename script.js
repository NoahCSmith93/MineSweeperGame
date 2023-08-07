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

// Class for creating object tiles
// Each one contains a row and column identifier, gamestate properties, and a new HTML div
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

const boardEl = document.getElementById("board")

// const testTile = new Tiles(0, 0)
// console.log("This is the testTile", testTile)
// console.log("This is the boardEl", boardEl)
// testTile.div.innerText = "Look at me"
// boardEl.appendChild(testTile.div)

function init() {
    winState = null
    boardSize = 16
    board = []
    createTiles()
    render()
}

function createTiles() {
    // For loop creates an empty array for each column
    // Uses boardSize to determine # of columns
    for (let i = 0; i < boardSize; i++) {
        board.push([])
        // Nested for loop creates boardSize # of Tiles objects in each column array
        // each Tiles object contains a div that gets appended to the HTML board
        // column and row identifiers inside the object are set using the iterators
        for (let j = 0; j < boardSize; j++) {
            board[i].push(new Tiles(i, j))
            boardEl.appendChild(board[i][j].div)
        }
    }
    // After all tiles are created, arrange them into a CSS grid with rows and columns === to boardSize
    boardEl.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`
    boardEl.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
    console.log("This is board after createTiles:", board)
    console.log("This is the first tile after createTiles:", board[0][0])
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