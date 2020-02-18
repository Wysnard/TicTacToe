class MiniMax extends Player {
    constructor(symbol = '') {
        super(symbol)
    }

    minimax(board, isMaximizing, depth = 0) {
        let result = board.checkWinner()
        if (result !== null) {
            let ret
            if (result === 'tie') {
                ret = 0
            } else {
                ret = (this.symbol === result) ? 1 : -1
            }
            return ret
        }
        // console.log(depth)

        if (isMaximizing) {
            let bestScore = -Infinity
            for (let x = 0; x < board.board.length; x++) {
                for (let y = 0; y < board.board[x].length; y++) {
                    if (board.isAvailable(x, y)) {
                        board.board[x][y] = this.symbol
                        let score = this.minimax(board, false, depth + 1)
                        board.board[x][y] = ''
                        bestScore = max(score, bestScore)
                    }
                }
            }
            return bestScore
        } else {
            let bestScore = Infinity
            for (let x = 0; x < board.board.length; x++) {
                for (let y = 0; y < board.board[x].length; y++) {
                    if (board.isAvailable(x, y)) {
                        board.board[x][y] = (this.symbol === 'X') ? 'O' : 'X'
                        let score = this.minimax(board, true, depth + 1)
                        board.board[x][y] = ''
                        bestScore = min(score, bestScore)
                    }
                }
            }
            return bestScore
        }
    }

    put(board) {
        let bestScore = -Infinity
        let bestMove = [-1, -1]
        for (let x = 0; x < board.board.length; x++) {
            for (let y = 0; y < board.board[x].length; y++) {
                if (board.isAvailable(x, y)) {
                    board.board[x][y] = this.symbol
                    let score = this.minimax(board, false)
                    board.board[x][y] = ''
                    if (score > bestScore) {
                        bestScore = score
                        bestMove = [x, y]
                    }
                }
            }
        }
        console.log(bestScore, bestMove)
        return bestMove
    }
}