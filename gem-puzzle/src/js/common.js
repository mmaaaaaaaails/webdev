import Cell from './cell';

export default class GemPuzzle {
    constructor(el, imgSrc, width, gameField) {
        this.parentEl = el;
        this.imgSrc = imgSrc;
        this.width = width;
        this.gameField = gameField;
        this.cells = [];
        this.shuffling = false;
        this.numberOfMovements = 0;

        // this.onFinished = () => {};
        this.onSwap = () => {};

        this.init();
        const img = new Image();
        img.onload = () => {
            this.height = (img.height * this.width) / img.width;
            this.el.style.width = `${this.width}px`;
            this.el.style.height = `${this.height}px`;

            this.setup();
        };
        img.src = this.imgSrc;
    }

    init() {
        this.el = this.createWrapper();
        this.parentEl.append(this.el);
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
        this.cells[i].setPosition(j, i);
        this.cells[j].setPosition(i);
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
    }

    isAssembled() {
        for (let i = 0; i < this.gameField * this.gameField; i += 1) {
            if (i !== this.cells[i].index) {
                if (i === 6 && this.cells[i].index === 8 && this.cells[i + 1].index === i + 1) {
                    return true;
                }
            }
            return false;
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
