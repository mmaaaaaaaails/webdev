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

const puzzles = document.createElement('section');
puzzles.id = 'puzzles';
document.body.append(puzzles);

const gemPuzzle = new GemPuzzle(
    document.querySelector('#puzzles'),
    './assets/img/enemy.jpg',
    400,
    2,
);

const newGame = document.createElement('button');
newGame.className = 'header__button';
newGame.innerHTML = 'New game';
header.append(newGame);

const bntGame = document.querySelector('.header__button');
bntGame.addEventListener('click', () => {
    gemPuzzle.shuffle();
    move.innerHTML = 'moves: 0';
    gemPuzzle.numberOfMovements = 0;
});

gemPuzzle.onSwap = (movements) => {
    move.innerHTML = `moves: ${movements}`;
};

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

const popupInfo = document.createElement('p');
popupInfo.className = 'modal__info';
popupContent.append(popupInfo);

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const modalInfo = document.querySelector('.modal__info');
modal.style.display = 'block';

gemPuzzle.onFinished = (movements) => {
    modalInfo.innerHTML = `Hooray! You solved the puzzle in ${movements} moves.`;
    modal.classList.add('modal__open');
    modalClose.addEventListener('click', () => {
        modal.classList.remove('modal__open');
        gemPuzzle.shuffle();
        move.innerHTML = 'moves: 0';
        gemPuzzle.numberOfMovements = 0;
    });
};
