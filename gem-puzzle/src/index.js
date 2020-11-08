// import './js/common';
import './assets/css/main.css';
import './assets/scss/main.scss';
import GemPuzzle from './js/common';

const wrapper = document.createElement('div');
wrapper.id = 'wrapper';
document.body.append(wrapper);

const gemPuzzle = new GemPuzzle(
    document.querySelector('#wrapper'),
    './assets/img/enemy.jpg',
    600,
);
