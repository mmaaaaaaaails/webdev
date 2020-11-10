export default class Cell {
    constructor(puzzle, index) {
        this.isEmpty = false;
        this.index = index;
        this.puzzle = puzzle;

        this.sound = true;

        this.width = this.puzzle.width / this.puzzle.gameField;
        this.height = this.puzzle.height / this.puzzle.gameField;
        this.el = this.createDiv();
        puzzle.el.append(this.el);

        if (this.index === this.puzzle.gameField * this.puzzle.gameField - 1) {
            this.isEmpty = true;
            return;
        }

        this.setImage();
    }

    createDiv() {
        const fragment = document.createElement('div');
        fragment.className = 'fragment';
        fragment.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
        fragment.style.width = `${this.width}px`;
        fragment.style.height = `${this.height}px`;

        fragment.onclick = () => {
            if (this.sound) {
                const audio = new Audio('assets/audio/button20.wav');
                audio.currentTime = 0;
                audio.play();
            }
            const currentCellIndex = this.puzzle.findPosition(this.index);
            const emptyCellIndex = this.puzzle.findEmpty();
            const { x, y } = this.getXy(currentCellIndex);
            const { x: emptyX, y: emptyY } = this.getXy(emptyCellIndex);
            if ((x === emptyX || y === emptyY) && (
                Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)) {
                this.puzzle.swapCells(currentCellIndex, emptyCellIndex);
            }
        };

        return fragment;
    }

    setImage() {
        const { x, y } = this.getXy(this.index);
        const left = this.width * x;
        const top = this.height * y;
        this.el.style.backgroundImage = `url(${this.puzzle.imgSrc})`;
        this.el.style.backgroundPosition = `-${left}px -${top}px`;
    }

    setPosition(index) {
        const { left, top } = this.getPositionFromIndex(index);
        this.el.style.left = `${left}px`;
        this.el.style.top = `${top}px`;
    }

    getPositionFromIndex(index) {
        const { x, y } = this.getXy(index);
        return {
            left: this.width * x,
            top: this.height * y,
        };
    }

    getXy(index) {
        return {
            x: index % this.puzzle.gameField,
            y: Math.floor(index / this.puzzle.gameField),
        };
    }
}
