const HAMBURGER = document.querySelector('.hamburger');
const MENU_LIST = document.querySelector('.nav__item');
const OVERLAY = document.querySelector('.overlay');

HAMBURGER.addEventListener('click', () => {
    HAMBURGER.classList.toggle('hamburger__rotate--active');
    MENU_LIST.classList.toggle('nav__item--active');
    OVERLAY.classList.toggle('overlay--active');
    document.body.style.overflow = 'hidden';

});

function hideMenu() {
document.addEventListener('click', (event) => {
    if (!event.target.closest('.hamburger__rotate--active')) {
            MENU_LIST.classList.remove('nav__item--active');
            HAMBURGER.classList.remove('hamburger__rotate--active');
            OVERLAY.classList.remove('overlay--active');
            document.body.style.overflow = 'visible';
        }
    });
}

hideMenu();
