import Cell from './cell';

export default class GemPuzzle {
    constructor({
        element, imageSource, width, gameField,
    }) {
        this.parentEl = element;
        this.imageSource = imageSource;
        this.width = width;
        this.gameField = gameField;
        this.cells = [];
        this.shuffling = false;
        this.numberOfMovements = 0;

        this.onFinished = () => {};
        this.onSwap = () => {};

        this.init();

        const img = new Image();
        img.onload = () => {
            this.height = (img.height * this.width) / img.width;
            this.element.style.width = `${this.width}px`;
            this.element.style.height = `${this.height}px`;

            this.setup();
        };
        img.src = this.imageSource;
    }

    init() {
        this.element = this.createWrapper();
        this.parentEl.append(this.element);
    }

    createWrapper() {
        const container = document.createElement('div');
        container.className = 'container';
        return container;
    }

    setup() {
        for (let i = 0; i < this.gameField * this.gameField; i += 1) {
            this.cells.push(new Cell(this, i));
        }
        this.shuffle();
    }

    shuffle() {
        this.shuffling = true;
        for (let i = this.cells.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapCells(i, j);
        }
        this.shuffling = false;
    }

    swapCells(i, j) {
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
        this.cells[i].setPosition(i);
        this.cells[j].setPosition(j);
        if (!this.shuffling && this.isAssembled()) {
            if (this.onFinished && typeof this.onFinished === 'function') {
                this.onFinished(this.numberOfMovements);
            }
        }
    }

    isAssembled() {
        const positionFragmentSix = 6;
        const positionFragmentEight = 8;
        for (let i = 0; i < this.cells.length; i += 1) {
            if (i !== this.cells[i].index) {
                if (i === positionFragmentSix && this.cells[i].index === positionFragmentEight
                    && this.cells[i + 1].index === i + 1) {
                    return true;
                }
                return false;
            }
        }
        return true;
    }

    findPosition(ind) {
        return this.cells.findIndex((cell) => cell.index === ind);
    }

    findEmpty() {
        return this.cells.findIndex((cell) => cell.isEmpty);
    }
}
