import './assets/css/main.css';
import './assets/scss/main.scss';
import GemPuzzle from './js/gemPuzzle';

const header = document.createElement('header');
header.className = 'header';
document.body.append(header);

const move = document.createElement('span');
move.innerHTML = 'moves: 0';
move.className = 'header__move';
header.append(move);

const puzzlesContainer = document.createElement('section');
puzzlesContainer.id = 'puzzles';
document.body.append(puzzlesContainer);
const puzzles = document.querySelector('#puzzles');

const gemPuzzle = new GemPuzzle({
    element: puzzles,
    imageSource: './assets/img/woman.jpg',
    width: 400,
    gameField: 2,
});

function createElementTime() {
    const time = document.createElement('time');
    time.innerHTML = '00:00:00';
    time.className = 'header__time';
    header.append(time);
}

function getTime(ms) {
    return new Date(ms).toISOString().split(/T|\./)[1];
}

function showTime() {
    const period = document.querySelector('.header__time');
    period.started = new Date();
    period.update = (ms) => {
        period.innerHTML = getTime(ms);
    };
    setInterval(() => period.update(new Date() - period.started), 500);
}

function getButtonGame() {
    const newGame = document.createElement('button');
    newGame.className = 'header__button';
    newGame.innerHTML = 'New game';
    header.append(newGame);

    const buttonGame = document.querySelector('.header__button');
    buttonGame.addEventListener('click', () => {
        gemPuzzle.shuffle();
        move.innerHTML = 'moves: 0';
        gemPuzzle.numberOfMovements = 0;
        clearInterval(showTime());
    });
}

function countMove() {
    gemPuzzle.onSwap = (movements) => {
        move.innerHTML = `moves: ${movements}`;
    };
}

function showPopup() {
    const popup = document.createElement('div');
    popup.className = 'modal modal__hide';
    document.body.append(popup);

    const popupContent = document.createElement('div');
    popupContent.className = 'modal__content';
    popup.append(popupContent);

    const popupClose = document.createElement('span');
    popupClose.className = 'modal__close';
    popupClose.innerHTML = '&times;';
    popupContent.append(popupClose);

    const popupInfo = document.createElement('div');
    popupInfo.className = 'modal__info';
    popupContent.append(popupInfo);

    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal__close');
    const modalInfo = document.querySelector('.modal__info');
    modal.style.display = 'block';

    gemPuzzle.onFinished = (movements) => {
        modalInfo.innerHTML = `Hooray! You solved this puzzle in <span class="modal__numbers-move">${movements}</span> moves`;
        modal.classList.add('modal__open');
        clearInterval(showTime());
        modalClose.addEventListener('click', () => {
            modal.classList.remove('modal__open');
            gemPuzzle.shuffle();
            move.innerHTML = 'moves: 0';
            gemPuzzle.numberOfMovements = 0;
            clearInterval(showTime());
        });
    };
}

function showFullImage() {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    document.body.append(footer);

    const button = document.createElement('button');
    button.className = 'footer__button';
    footer.append(button);

    const fullImage = document.createElement('a');
    fullImage.href = './assets/img/woman.jpg';
    fullImage.innerHTML = 'Full Image';
    fullImage.target = '_blank';
    fullImage.className = 'footer__link';
    button.append(fullImage);
}

createElementTime();
getButtonGame();
countMove();
showPopup();
showTime();
showFullImage();
