const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

class Board {
    constructor(board = emptyBoard) {
        this.board = board
    }

    reset() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]
    }

    checkWinner() {
        let winner

        // Check Horizontal
        for (let y = 0; y < this.board.length; y++) {
            winner = true
            if (this.board[0][y] != '') {
                for (let x = 0; x < this.board.length; x++) {
                    const cell = this.board[x][y];
                    winner = cell === this.board[0][y]
                    if (!winner)
                        break
                }
                if (winner) {
                    return this.board[0][y]
                }
            }
        }

        // Check Vertical
        for (let x = 0; x < this.board.length; x++) {
            winner = true
            if (this.board[x][0] != '') {
                for (let y = 0; y < this.board.length; y++) {
                    const cell = this.board[x][y];
                    winner = cell === this.board[x][0]
                    if (!winner)
                        break
                }
                if (winner) {
                    return this.board[x][0]
                }
            }
        }

        // Check top left corner to right bottom corner diagonal
        if (this.board[0][0] != '') {
            winner = true
            for (let i = 0; i < this.board.length; i++) {
                const cell = this.board[i][i];
                winner = cell === this.board[0][0]
                if (!winner) {
                    break
                }
            }
            if (winner)
                return this.board[0][0]
        }

        // Check bottom left corner to right top corner diagonal
        if (this.board[0][2] != '') {
            winner = this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0]
            if (winner)
                return this.board[0][2]
        }

        return (this.board.flat(2).filter((cell) => cell == '').length != 0) ? null : 'tie'
    }

    isPlaying() {
        return this.checkWinner() == null && this.board.flat(2).filter((cell) => cell == '').length != 0
    }

    isAvailable(x, y) {
        return (x in _.range(3) && y in _.range(3)) ? this.board[x][y] == '' : false
    }

    put(player, x, y) {
        let available = this.isAvailable(x, y)
        if (available)
            this.board[x][y] = player.symbol
        console.log(this.board)
        return available
    }

    show() {
        // Divide in three to make the columns/rows and cells
        let w = width / 3
        let h = height / 3

        strokeWeight(4)

        // vertical lines separating each cells
        line(w, 0, w, height)
        line(w * 2, 0, w * 2, height)

        // horizontal lines separating each cells
        line(0, h, width, h)
        line(0, h * 2, width, h * 2)

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                let x = w * i + w / 2
                let y = h * j + h / 2
                if (cell === players[0].symbol) {
                    const xr = w / 4
                    line(x - xr, y - xr, x + xr, y + xr)
                    line(x - xr, y + xr, x + xr, y - xr)
                } else if (cell === players[1].symbol) {
                    ellipse(x, y, 50)
                    noFill()
                }

            }
        }
    }
}