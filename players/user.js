class User extends Player {
    constructor(symbol = '') {
        super(symbol)
    }

    put(board) {
        return [-1, -1]
    }

    click() {
        let x = ceil(map(mouseX, 0, width, 0, 3)) - 1
        let y = ceil(map(mouseY, 0, height, 0, 3)) - 1

        return [x, y]
    }
}