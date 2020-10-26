
const HAMBURGER = document.querySelector('.hamburger');
const MENU_LIST = document.querySelector('.menu__lists');
const LOGO = document.querySelector('.header__logo');
const OVERLAY = document.querySelector('.overlay');
const FOOTER = document.querySelector('.footer');

HAMBURGER.addEventListener('click', () => {
    HAMBURGER.classList.toggle('hamburger__rotate--active');
    MENU_LIST.classList.toggle('menu__lists--active');
    LOGO.classList.toggle('header__logo--active');
    OVERLAY.classList.toggle('overlay--active');
    document.body.style.overflow = 'hidden';

});

function hideMenu() {
document.addEventListener('click', (event) => {
    if (!event.target.closest('.hamburger__rotate--active')) {
            MENU_LIST.classList.remove('menu__lists--active');
            LOGO.classList.remove('header__logo--active');
            HAMBURGER.classList.remove('hamburger__rotate--active');
            OVERLAY.classList.remove('.overlay--active');
            document.body.style.overflow = 'visible';
        }
    });
}

hideMenu();

// slider

const buttonsArrow = document.querySelectorAll('.buttons__arrow');
const ourFriendsBlock = document.getElementById('our-friends__block');
const slider = ourFriendsBlock.querySelectorAll('.slider');
let currentSlide = 0;

buttonsArrow.forEach(element => {
    element.addEventListener('click', () => {
        ourFriendsBlock.querySelectorAll('.slider').forEach(element => element.classList.remove('slider--active'));

        if(currentSlide < slider.length - 1) {
            currentSlide ++;
            slider[currentSlide].classList.add('slider--active');
        } else {
            currentSlide = 0;
            slider[currentSlide].classList.add('slider--active');
        }
    });
});
