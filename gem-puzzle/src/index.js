// import './js/common';
import './assets/css/main.css';
import './assets/scss/main.scss';
import GemPuzzle from './js/common';

const puzzles = document.createElement('section');
puzzles.id = 'puzzles';
document.body.append(puzzles);

const gemPuzzle = new GemPuzzle(
    document.querySelector('#puzzles'),
    './assets/img/enemy.jpg',
    400,
);
