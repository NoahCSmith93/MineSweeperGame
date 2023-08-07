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

/* ---- Classes ----- */

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
    hide() {
        this.div.classList.add("hidden")
    }
    unhide() {
        this.hidden = false
        this.div.classList.remove("hidden")
        this.div.classList.add("unhidden")
    }
}

/* ---- Variables ----- */

let winState
let boardSize
let mines
let board

/* ---- Cached Elements ----*/

const boardEl = document.getElementById("board")
const messageEl = document.getElementById("message")
const buttonEl = document.getElementById("play")

// const testTile = new Tiles(0, 0)
// console.log("This is the testTile", testTile)
// console.log("This is the boardEl", boardEl)
// testTile.div.innerText = "Look at me"
// boardEl.appendChild(testTile.div)

/* ---- Functions ----- */

function init() {
    boardSize = 16
    mines = 40
    board = []
    boardEl.innerHTML = ""
    createTiles()
    placeMines()
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
            board[i][j].hide()
        }
    }
    // After all tiles are created, arrange them into a CSS grid with rows and columns === to boardSize
    boardEl.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`
    boardEl.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
    // console.log("This is board after createTiles:", board)
    // console.log("This is the last tile after createTiles:", board[boardSize-1][boardSize-1])
}

function placeMines() {
    // Code that randomly places mines based on board size
    // Check that the maximum number of mines hasn't been placed
    // Randomly choose a tile
    // Check that the chosen tile doesn't have a mine already
    // Set the corresponding tile object's mine property to true
    // While loop to repeat until the mine cap has been filled
}

function renderBoard() {
    // Code to render the board
}

function renderMessage() {
    // Message should change to show the number of mines remaining while winState is null
    // Message should change to a win message on win and a loss message on loss
    if (winState === null) {
        messageEl.innerText = `Mines: ${mines}`
    } else if (winState === "w") {
        messageEl.innerText = "You won! Play again?"
    } else if (winState === "l") {
        messageEl.innerText = "You lost! Play again?"
    }
}

function renderButton() {
    // Code for hiding the buttons while the game is active
    // Buttons should be hidden as long as winState is null
}

function render() {
    renderBoard()
    renderMessage()
    renderButton()
}

function handleClick(event) {
    // Find the column array containing the event target
    const clickedCol = board.find(column => column.find(tile => tile.div === event.target))
    // Find the event target within the found array
    const clickedTile = clickedCol.find(tile => tile.div ===  event.target)
    console.log("This is the object containing the click target", clickedCol.find(tile => tile.div === event.target))
    // Check if the tile is a mine, and return with a loss if it is
    if (clickedTile.mine === true) {
        winState = "l"
        render()
        return
    }
    // Reveal the tile
    clickedTile.unhide()
    // Count the adjacent mines and assign them to the object
    clickedTile.adjacentMines = countAdjacent(clickedTile.col, clickedTile.row)
}

function countAdjacent(col, row) {
    //Code to count the adjacent number of mines for a given tile
}

/* ---- Event Listeners ----- */

boardEl.addEventListener("click", handleClick)
buttonEl.addEventListener("click", init)




init()