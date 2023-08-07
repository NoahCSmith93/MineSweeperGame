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
let boardSize = 16
let numOfMines
let board

/* ---- Cached Elements ----*/

const boardEl = document.getElementById("board")
const messageEl = document.getElementById("message")
const controlsEl = document.getElementById("controls")

/* ---- Functions ----- */

function init() {
    board = []
    boardEl.innerHTML = ""
    createTiles()
    placeMines()
    render()
}

function startGame(event) {
    // Return if it was not a button that was clicked
    if (event.target.tagName !== "BUTTON") return
    // Allow the game to start by setting winState to null
    winState = null
    // Check for which difficulty was selected
    if (event.target.innerText.toLowerCase() === "beginner") {
        boardSize = 9
        numOfMines = 10
    } else {
        boardSize = 16
        numOfMines = 40
    }
    // Start and render the game
    init()
}

// Creates each individual tile on the board
// Stores them in the board array at an index matching their position
// Should only be called on page load and game start
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
            // If statement to prevent tiles from appearing clickable until the game has started
            if (winState === null) board[i][j].hide()
        }
    }
    // After all tiles are created, arrange them into a CSS grid with rows and columns === to boardSize
    boardEl.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`
    boardEl.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`
}

function placeMines() {
    // Code that randomly places mines based on board size
    // Check that the maximum number of mines hasn't been placed
    // Randomly choose a tile
    // Check that the chosen tile doesn't have a mine already
    // Set the corresponding tile object's mine property to true
    // While loop to repeat until the mine cap has been filled
}

function cascade(col, row) {
    // Code to cascade empty tiles
}

function renderMessage() {
    // Message should change to show the number of mines remaining while winState is null
    // Message should change to a win message on win and a loss message on loss
    if (winState === null) {
        messageEl.innerText = `Mines: ${numOfMines}`
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
    renderMessage()
    renderButton()
}

function handleClick(event) {
    // Do not respond to a click unless the game is active
    if (winState === null) {
        // Find the column array containing the event target
        const clickedCol = board.find(column => column.find(tile => tile.div === event.target))
        // Find the event target within the found array
        const clickedTile = clickedCol.find(tile => tile.div ===  event.target)
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
        // Display the # of adjacent mines as inner text if it's more than 0
        if (clickedTile.adjacentMines) clickedTile.div.innerText = `${clickedTile.adjacentMines}`
        // Otherwise cascade
        else cascade(clickedTile.col, clickedTile.row)
        // Check for winner after the click is handled, then update the board
        checkWinner()
        render()
    }
}

function countAdjacent(col, row) {
    return Math.floor(Math.random() * 9)
    // Code to count the adjacent number of mines for a given tile
}

function checkWinner() {
    // Code to check if all non-mine tiles have been revealed
}

/* ---- Event Listeners ----- */

boardEl.addEventListener("click", handleClick)
controlsEl.addEventListener("click", startGame)




init()