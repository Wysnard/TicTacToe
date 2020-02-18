let board

// player1 = X
// player2 = O

// Players' algorithms
// All Algorithms are in the players folder
let players = [new User('X'), new MiniMax('O')]

let currentPlayer

// Infinite generator which gives you the current player and pass to the next one
function* getCurrentPlayer() {
    while (1) {
        if (_.isEqual(currentPlayer, players[0])) {
            currentPlayer = players[1]
            yield players[0]
        } else {
            currentPlayer = players[0]
            yield players[1]
        }
    }
}

function setup() {
    createCanvas(400, 400)

    // Initialize the Board
    board = new Board()

    // Decide who start to play first
    currentPlayer = players[round(random(1))]
}

function mousePressed() {
    if (board.checkWinner() == null) {
        let [x, y] = currentPlayer.click(board)

        if (x in _.range(3) && y in _.range(3))
            if (board.put(currentPlayer, x, y))
                getCurrentPlayer().next()
    } else if (board.checkWinner() != null) {
        board.reset()
    }
}

function draw() {
    background(200)

    if (board.checkWinner() == null) {
        let [x, y] = currentPlayer.put(board)

        if (x in _.range(3) && y in _.range(3))
            if (board.put(currentPlayer, x, y))
                getCurrentPlayer().next()

        board.show()
    } else if (board.checkWinner() == 'tie') {
        fill(50)
        text("It is a tie!", 10, 30)
    } else if (board.checkWinner() != null) {
        fill(50)
        text(`The Winner is ${board.checkWinner()}`, 10, 30)
    }
}