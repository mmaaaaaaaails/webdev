const time = document.querySelector('.content__time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    city = document.querySelector('.weather__city');


function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        day = today.getDate();
        time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}
                        <p class="content__info">${getWeekDay(today)}<span> , </span>${getMonthNow(today)} ${day}th</p>`;
        if (min === 00 && sec === 00) {
            getImage();
        }
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

// click image

const baseNight = './assets/images/night/';
const baseMorning = './assets/images/morning/';
const baseDay = './assets/images/day/';
const baseEvening = './assets/images/evening/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const imagesAll = './assets/images/';
const partDay = ['night/', 'day/', 'morning/', 'evening/'];


const shuffle = (arr) => {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
};

shuffle(images);
// shuffle(partDay);

function viewBgImage(data) {
    const body = document.querySelector('body');
    const src = data;
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => {
        body.style.backgroundImage = `url(${src})`;
    };
}

const mainBtn = document.querySelector('.main__btn');
mainBtn.addEventListener('click', () => {
    getImage();
    mainBtn.classList.toggle('btn__rotate--active');
});


let i = 0;
function getImage() {
    const index = i % images.length;
    const imageSrc = baseDay + images[index];
    viewBgImage(imageSrc);
    i++;
    mainBtn.disabled = true;
    setTimeout(function() { mainBtn.disabled = false; }, 1000);
}

function changeBackground() {
    let today = new Date(),
        hour = today.getHours();

    if(hour < 6) {
        document.body.style.backgroundImage = `url('./assets/images/night/${images[1]}')`;
        greeting.textContent = 'Good night,';
    } else if (hour < 12) {
        document.body.style.backgroundImage = `url('./assets/images/morning/${images[1]}')`;
        greeting.textContent = 'Good morning,';
    } else if (hour < 18) {
        document.body.style.backgroundImage = `url('./assets/images/day/${images[1]}')`;
        greeting.textContent = 'Good afternoon,';
    } else if (hour < 24) {
        document.body.style.backgroundImage = `url('./assets/images/evening/${images[1]}')`;
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

function getCity() {
    if(localStorage.getItem('city') === null) {
        city.textContent = 'city';
    } else {
        city.textContent = localStorage.getItem('city');
        getWeather();
    }
}

let cityStorage = '';

function hideCity(e) {
    localStorage.setItem('city', e.target.innerText);
    cityStorage = localStorage.getItem('city');
    if (e.type === 'click') {
        city.textContent = '';
    }
}

city.onblur = function () {
    localStorage.setItem("city", city.textContent);
    getWeather();
};

function setCity(e) {
    if (e.code === 'Enter') {
        localStorage.setItem("city", e.target.innerText);
        getWeather();
        city.blur();
    }
}


const blockquote = document.querySelector('blockquote');
const btn = document.querySelector('.btn__quote');

async function getQuote() {
    const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.quote.quoteText.length > 70) {
        getQuote();
    } else {
        blockquote.textContent = data.quote.quoteText;
    }
}


document.addEventListener('DOMContentLoaded', getQuote);

btn.addEventListener('click', () => {
    getQuote();
    btn.classList.toggle('btn__rotate--active');
});

// weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const humidity = document.querySelector('.weather__humidity');
const wind = document.querySelector('.weather__wind');

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=b2a6be783f202c5ed82810713fdbd194&units=metric`;
    const res = await fetch(url);

    if (res.ok) {
        const data = await res.json();

        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;

        document.addEventListener('DOMContentLoaded', getWeather);
        city.addEventListener('keypress', setCity);
        city.textContent = localStorage.getItem('city');

    } else {
        weatherDescription.textContent = 'Сity not found!';
        weatherIcon.className = '';
        temperature.textContent = '';
        humidity.textContent = '';
        wind.textContent = '';
    }


}


const loadingScreen = document.getElementById("cube-loader");
document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "complete") {
        loadingScreen.classList.add("transparent");
        setTimeout(() => {
            loadingScreen.remove();
        }, 2000);
    }
});


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', hideName);
focuss.addEventListener('keypress', setFocus);
focuss.addEventListener('blur', setFocus);
focuss.addEventListener('click', hideFocus);
city.addEventListener('blur', setCity);
city.addEventListener('click', hideCity);

getWeather();
getName();
getFocus();
changeBackground();
showTime();
