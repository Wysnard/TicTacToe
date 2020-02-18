class Random extends Player {
    constructor(symbol = '') {
        super(symbol)
    }

    put(board) {
        let available = []
        for (let x = 0; x < board.board.length; x++) {
            for (let y = 0; y < board.board[x].length; y++) {
                const cell = board.board[x][y];
                if (board.isAvailable(x, y))
                    available.push([x, y])
            }
        }
        if (available.length == 0)
            return [-1, -1]
        let selected = available[floor(random(available.length))]
        return selected
    }
}