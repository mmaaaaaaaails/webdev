import './js/modal';
import './assets/css/main.css';
import './assets/scss/main.scss';

const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('change');
});
