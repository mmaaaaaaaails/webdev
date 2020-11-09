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
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.style.margin = '0 auto';
        div.style.marginTop = '30px';
        return div;
    }

    setup() {
        for (let i = 0; i < this.gameField * this.gameField - 1; i += 1) {
            this.cells.push(new Cell(this, i));
        }
        this.shuffle();
        console.log(this.cells);
    }

    shuffle() {
        for (let i = this.cells.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];
            this.cells[i].setPosition(i);
            this.cells[j].setPosition(j);
        }
    }
}
