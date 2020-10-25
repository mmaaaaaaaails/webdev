const time = document.querySelector('.main__time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focusss = document.getElementById('focusss');

const showAmPm = true;

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        day = today.getDate();

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}
                        <p class="main__info">${getWeekDay(today)}<span> , </span>${getMonthNow(today)} ${day}th</p>`;

    setTimeout(showTime, 1000);

}

function getWeekDay(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

function getMonthNow(date) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[date.getMonth()];
}

function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


function changeBackground() {
    let today = new Date(),
        hour = today.getHours();


    if(hour < 6) {
        document.body.style.backgroundImage = "url('./images/night.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good night,';
    } else if (hour < 12) {
        document.body.style.backgroundImage = "url('./images/morning.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good morning,';
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url('./images/afternoon.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good afternoon,';
    } else if (hour < 24) {
        document.body.style.backgroundImage = "url('./images/evening.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good evening,';
    }
}


function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = 'what is your name?';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

let nameFocus = '';

function hideName(e) {
    localStorage.setItem('name', e.target.innerText);
    nameStorage = localStorage.getItem('name');
    if (e.type === 'click') {
        name.textContent = '';
    }
}

function setName(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
    if (localStorage.getItem('name') === '') {
        localStorage.setItem('name', e.target.innerText);
        name.textContent = nameStorage;
        localStorage.removeItem('name');
    }
}


function getFocus() {
    if(localStorage.getItem('focus') === null) {
        focuss.textContent = 'Finish this task';
    } else {
        focuss.textContent = localStorage.getItem('focus');
    }
}

let focusStorage = '';

function hideFocus(e) {
    localStorage.setItem('focus', e.target.innerText);
    focusStorage = localStorage.getItem('focus');
    if (e.type === 'click') {
        focuss.textContent = '';
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focuss.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
    if (localStorage.getItem('focus') === '') {
        localStorage.setItem('focus', e.target.innerText);
        focuss.textContent = focusStorage;
        localStorage.removeItem('focus');
    }
}



const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

async function getQuote() {
    const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.quote.quoteText.length > 100) {
        getQuote();
    } else {
        blockquote.textContent = data.quote.quoteText;
    }
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', hideName);
focuss.addEventListener('keypress', setFocus);
focuss.addEventListener('blur', setFocus);
focuss.addEventListener('click', hideFocus);

getName();
getFocus();
changeBackground();
showTime();
