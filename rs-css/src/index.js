import './js/modal';
import './js/hamburger';
import './assets/css/main.css';
import './assets/scss/main.scss';

const enter = document.querySelector('.redactor__button');
const input = document.querySelector('.redactor__input');
const laptop = document.querySelectorAll('.table__laptop');
const redactor = document.querySelector('.redactor');

function sortElements() {
    laptop.forEach((element) => element.classList.add('table__laptop--well'));
}

function startAnimation() {
    redactor.classList.add('redactor__move');
    setTimeout(() => {
        redactor.classList.remove('redactor__move');
    }, 100);
}

function clickHandler() {
    enter.addEventListener('click', () => {
        if (input.value === 'laptop') {
            sortElements();
        } else {
            startAnimation();
        }
    });
}

function keyDownHandler() {
    document.addEventListener('keydown', (element) => {
        if (input.value === 'laptop' && element.code === 'Enter') {
            enter.classList.add('redactor__button--active');
            sortElements();
        } else if (element.code === 'Enter') {
            startAnimation();
        }
    });
}

function keyUpHandler() {
    document.addEventListener('keyup', (element) => {
        if (element.code === 'Enter') {
            enter.classList.remove('redactor__button--active');
        }
    });
}

clickHandler();
keyDownHandler();
keyUpHandler();
