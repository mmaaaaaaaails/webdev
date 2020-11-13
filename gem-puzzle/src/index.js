// import './js/common';
import './assets/css/main.css';
import './assets/scss/main.scss';
import GemPuzzle from './js/common';

const header = document.createElement('header');
header.className = 'header';
document.body.append(header);

const move = document.createElement('span');
move.innerHTML = 'moves: 0';
move.className = 'header__move';
header.append(move);

const newGame = document.createElement('button');
newGame.className = 'header__button';
newGame.innerHTML = 'New game';
header.append(newGame);
const bntGame = document.querySelector('.header__button');
bntGame.addEventListener('click', (e) => {
    console.log(e);
});

const puzzles = document.createElement('section');
puzzles.id = 'puzzles';
document.body.append(puzzles);

const gemPuzzle = new GemPuzzle(
    document.querySelector('#puzzles'),
    './assets/img/enemy.jpg',
    400,
    3,
);

gemPuzzle.onSwap = (movements) => {
    move.innerHTML = `moves: ${movements}`;
};
