import Cell from './cell';

export default class GemPuzzle {
    constructor(el, imgSrc, width) {
        this.parentEl = el;
        this.imgSrc = imgSrc;
        this.width = width;
        this.gameField = 4;
        this.cells = [];

        this.init();
        const img = new Image();
        img.onload = () => {
            console.log(img.width, img.height);
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
        console.log(this.cells);
    }

    shuffle() {
        for (let i = this.cells.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            this.swapCells(i, j);
        }
    }

    swapCells(i, j) {
        [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
        this.cells[i].setPosition(i);
        this.cells[j].setPosition(j);
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
