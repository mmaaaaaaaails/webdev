export default class Cell {
    constructor(puzzle, index) {
        this.index = index;
        this.puzzle = puzzle;
        this.width = this.puzzle.width / this.puzzle.gameField;
        this.height = this.puzzle.height / this.puzzle.gameField;
        this.el = this.createDiv();
        puzzle.el.append(this.el);
    }

    createDiv() {
        const div = document.createElement('div');
        const left = this.width * (this.index % this.puzzle.gameField);
        const top = this.height * (Math.floor(this.index / this.puzzle.gameField));

        div.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
        div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        div.style.border = '1px solid #FFF';
        div.style.position = 'absolute';
        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;

        div.style.backgroundPosition = `-${left}px -${top}px`;

        return div;
    }

    setPosition(index) {
        const { left, top } = this.getPositionFromIndex(index);
        this.el.style.left = `${left}px`;
        this.el.style.top = `${top}px`;
    }

    getPositionFromIndex(index) {
        return {
            left: this.width * (index % this.puzzle.gameField),
            top: this.height * (Math.floor(index / this.puzzle.gameField)),
        };
    }
}
