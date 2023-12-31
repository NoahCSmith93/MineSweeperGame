/* ---- Classes ----- */

// Class for creating object tiles
// Each one contains a row and column identifier, gamestate properties, and a new HTML div
class Tiles {
    constructor(col, row) {
        this.col = col
        this.row = row
        this.hidden = true
        this.mine = false
        this.div = document.createElement("div")
    }
    hide() {
        this.div.classList.add("hidden")
    }
    unhide() {
        if (this.hidden === true) hiddenTileCounter--
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
let hiddenTileCounter
let mineArr
let flagsPlaced
let flaggedMines

/* ---- Cached Elements ----*/

const boardEl = document.getElementById("board")
const messageEl = document.getElementById("message")
const buttonsEl = document.getElementById("difficulty")
const mineImg = document.createElement("img")
mineImg.src = "Images/Mine.png"
mineImg.src = "Images/Mine.png"
const flagImg = document.createElement("img")
flagImg.src = "Images/Flag.png"
const restartEl = document.getElementById("restart")

/* ---- Functions ----- */

function init() {
    board = []
    mineArr = []
    flagsPlaced = 0
    flaggedMines = 0
    boardEl.innerHTML = ""
    hiddenTileCounter = boardSize * boardSize
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
// Randomly places mines based on board size
// Should only be called on game start
function placeMines() {
    
    //Track the number of mines remaining
    let minesRemaining = numOfMines
    // Check that the maximum number of mines hasn't been placed
    while (minesRemaining > 0) {
    // Randomly choose a tile
    let randomCol = Math.floor(Math.random() * boardSize)
    let randomRow = Math.floor(Math.random() * boardSize)
    // Check that the chosen tile doesn't have a mine already
        if (!board[randomCol][randomRow].mine) {
            // Set the corresponding tile object's mine property to true
            board[randomCol][randomRow].mine = true
            // Put the mine image inside the HTML div
            mineArr.push(board[randomCol][randomRow].div)
            // While loop to repeat until the mine cap has been filled
            minesRemaining--
        }
    }
}

// When an empty (adjacentMines value of 0) tile is clicked it should cascade to surrounding tiles
// All non-mine tiles should be revealed
// cascade should be called again on any additional empty tiles
function cascade(col, row) {
    // Track the empty tiles revealed to iterate over for recursion
    const revealedEmptyTiles = []
    let colOffset = -1
    // Loop over each column from W to E
    for (let i = 0; i < 3; i++) {
        let rowOffset = -1
        // Only run if the column index is valid
        if ((col + colOffset) > -1 && (col + colOffset) < board.length){
            // Loop over each tile in each column from N to S
            for (let i = 0; i < 3; i++) {
                // Only run if the row index is valid
                if ((row + rowOffset) > -1 && (row + rowOffset) < board.length) {
                    const currentTile = board[col + colOffset][row + rowOffset]
                    // Only reveal the tile if it does not have a mine
                    if (currentTile.mine === false) {
                        currentTile.adjacentMines = countAdjacent(currentTile.col, currentTile.row)
                        // Update innerText for revealed tiles that have mines adjacent
                        // Prevent infinite recursion by only tracking newly revealed empty tiles
                        if (currentTile.adjacentMines) {
                            currentTile.div.innerText = currentTile.adjacentMines
                            currentTile.div.classList.add(`mine${currentTile.adjacentMines}`)
                        } else if (currentTile.hidden === true) {
                                revealedEmptyTiles.push(currentTile)
                            }
                        currentTile.unhide()
                    }
                }
                // Increment the offset to check the next tile
                rowOffset++
            }
        }
        // Increment the offset after each tile in the column is checked to check the next row
        colOffset++
    }
    revealedEmptyTiles.forEach(tile => {
        cascade(tile.col, tile.row)
    })
}

function renderMessage() {
    // Message should change to show the number of mines remaining while winState is null
    // Message should change to a win message on win and a loss message on loss
    if (winState === null) {
        messageEl.innerText = "Mines: " + (numOfMines - flagsPlaced)
    } else if (winState === "w") {
        messageEl.innerText = "You won! Play again?"
    } else if (winState === "l") {
        messageEl.innerText = "You lost! Play again?"
    } else {
        messageEl.innerText = "Choose your difficulty:"
    }
}

// Displays the images for all the mines on a loss
// Only runs when winState === "l"
function renderMines() {
    if (winState === "l") {
        // Iterate through the array containing all the divs with mines
        mineArr.forEach(mine => {
            // Append the mine image inside each mine div
            mine.appendChild(mineImg.cloneNode(true))
        })
        // Stop the remaining hidden tiles from appearing clickable
        forceUnclickable()
    }
}

// Hides the buttons while the game is active
function renderButton() {
    // Buttons should be hidden as long as winState is null
    if (winState === null) {
        buttonsEl.style.display = "none"
        restartEl.classList.remove("hidden")
    } else {
        buttonsEl.style.display = ""
        restartEl.classList.add("hidden")
    }
}

function render() {
    renderMessage()
    renderMines()
    renderButton()
}

function handleClick(event) {
    // Variable to store the div that was right clicked
    let clickedDiv
    // If statement that sets clickedDiv to the proper div even if the click happened on an image
    // Also returns if the click did not happen on a div or img
    if (event.target.tagName === "IMG") {
        clickedDiv = event.target.closest("div")
    } else if (event.target.tagName === "DIV") {
        clickedDiv = event.target
    } else return
    // Do not respond to a click unless the game is active
    if (winState === null) {
        // Find the column array containing the event target
        const clickedCol = board.find(column => column.find(tile => tile.div === clickedDiv))
        // Find the event target within the found array
        const clickedTile = clickedCol.find(tile => tile.div === clickedDiv)
        // Check if the tile is a mine, and return with a loss if it is
        if (clickedTile.mine === true) {
            winState = "l"
            clickedTile.div.style.backgroundColor = "red"
            render()
            return
        }
        // Reveal the tile
        clickedTile.unhide()
        // Count the adjacent mines and assign them to the object
        clickedTile.adjacentMines = countAdjacent(clickedTile.col, clickedTile.row)
        // Display the # of adjacent mines as inner text if it's more than 0
        if (clickedTile.adjacentMines) {
            clickedTile.div.innerText = `${clickedTile.adjacentMines}`
            clickedTile.div.classList.add(`mine${clickedTile.adjacentMines}`)
        }
        // Otherwise cascade
        else cascade(clickedTile.col, clickedTile.row)
        // Check for winner after the click is handled, then update the board
        checkWinner()
        render()
    }
}

// Counts the adjacent number of mines for a clicked tile
function countAdjacent(col, row) {
    // Store the number of mines found outside the loop to be returned later
    let adjacentMineCount = 0
    // Loop over each column from W to E
    let colOffset = -1
    for (let i = 0; i < 3; i++) {
        let rowOffset = -1
        // Only run if the column index is valid
        if ((col + colOffset) > -1 && (col + colOffset) < board.length){
            // Loop over each tile in each column from N to S
            for (let i = 0; i < 3; i++) {
                // Only run if the row index is valid
                if ((row + rowOffset) > -1 && (row + rowOffset) < board.length) {
                    // If the checked tile has a mine, increase the count
                    if (board[col + colOffset][row + rowOffset].mine === true) {
                        adjacentMineCount++
                    }
                }
                // Increment the offset to check the next tile
                rowOffset++
            }
        }
        // Increment the offset after each tile in the column is checked to check the next row
        colOffset++
    }
    // Return the total
    return adjacentMineCount
}

// Checks if all non-mine tiles have been revealed
function checkWinner() {
    // hiddenTileCounter is decremented each time a tile's unhide() method is called
    // When the # of hidden tiles === the # of mines then only mines are left and the game is won
    if (hiddenTileCounter === numOfMines) {
        winState = "w"
        forceUnclickable()
    } else if (flaggedMines === numOfMines && flaggedMines === flagsPlaced) {
        winState = "w"
        forceUnclickable()
    }
}

function forceUnclickable() {
    board.forEach(column => {
        column.forEach(tile => {
            tile.div.classList.remove("hidden")
        })
    })
}

function changeFlag(event) {
    // Stop default context menu from appearing
    event.preventDefault()
    // Don't allow flag placement if the game is over
    if (winState) return
    // Variable to store the div that was right clicked
    let clickedDiv
    // If statement that sets clickedDiv to the proper div even if the click happened on an image
    // Also returns if the click did not happen on a div or img
    if (event.target.tagName === "IMG") {
        clickedDiv = event.target.closest("div")
    } else if (event.target.tagName === "DIV") {
        clickedDiv = event.target
        // Prevent an error that would turn the whole board into one flagged tile if an intersection was right clicked
        if (clickedDiv.id === "board") return
    } else return
    // Return if the tile has already been revealed
    if (clickedDiv.classList.contains("unhidden")) return
    // If statement that adds the flag if there isn't one and removes it if there is
    if (clickedDiv.innerHTML) {
        clickedDiv.innerHTML = ""
        flagsPlaced--
    } else {
        clickedDiv.appendChild(flagImg.cloneNode(true))
        flagsPlaced++
    }
    if (mineArr.includes(clickedDiv)) {
        flaggedMines++
    }
    checkWinner()
    render()
}

function restart(event) {
    if (event.target.tagName !== "BUTTON") return
    winState = "restart"
    init()
}

/* ---- Event Listeners ----- */

boardEl.addEventListener("click", handleClick)
buttonsEl.addEventListener("click", startGame)
boardEl.addEventListener("contextmenu", changeFlag)
restartEl.addEventListener("click", restart)




init()