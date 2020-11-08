export default class Cell {
    constructor(puzzle, index) {
        this.index = index;
        this.puzzle = puzzle;
        this.el = this.createDiv();
        puzzle.el.append(this.el);
    }

    createDiv() {
        const div = document.createElement('div');
        div.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
        div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        div.style.position = 'absolute';
        const blockWidth = this.puzzle.width / this.puzzle.gameField;
        div.style.width = `${blockWidth}px`;
        const blockHeight = this.puzzle.height / this.puzzle.gameField;
        div.style.height = `${blockHeight}px`;

        const left = blockWidth * (this.index % this.puzzle.gameField);
        const top = blockHeight * (Math.floor(this.index / this.puzzle.gameField));

        div.style.left = `${left}px`;
        div.style.top = `${top}px`;

        div.style.backgroundPosition = `-${left}px -${top}px`;

        return div;
    }
}
