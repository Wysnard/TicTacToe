class User extends Player {
    constructor(symbol = '') {
        super(symbol)
    }

    click() {
        let x = ceil(map(mouseX, 0, width, 0, 3)) - 1
        let y = ceil(map(mouseY, 0, height, 0, 3)) - 1

        return [x, y]
    }
}