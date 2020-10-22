
const HAMBURGER = document.querySelector('.hamburger');
const MENU_LIST = document.querySelector('.menu__lists');
const LOGO = document.querySelector('.header__logo');
const MAIN = document.querySelector('.main');
const FOOTER = document.querySelector('.footer');

HAMBURGER.addEventListener('click', () => {
    HAMBURGER.classList.toggle('hamburger__rotate--active');
    MENU_LIST.classList.toggle('menu__lists--active');
    LOGO.classList.toggle('header__logo--active');
    MAIN.classList.toggle('main--active');
    FOOTER.classList.toggle('footer--active');
    document.body.style.overflow = 'hidden';
});

function hideMenu() {
document.addEventListener('click', (event) => {
    if (!event.target.closest('.hamburger__rotate--active')) {
            MENU_LIST.classList.remove('menu__lists--active');
            LOGO.classList.remove('header__logo--active');
            HAMBURGER.classList.remove('hamburger__rotate--active');
            MAIN.classList.remove('main--active');
            FOOTER.classList.remove('footer--active');
            document.body.style.overflow = 'visible';
        }
    });
}

hideMenu();
