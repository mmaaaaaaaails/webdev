const time = document.querySelector('.time'),
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
        // month = today.getMonth();

    const amPM = hour >= 12 ? 'PM' : 'AM';

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPM : '' }
                        <p class="subtitle">${getWeekDay(today)}<span> , </span>${getMonthNow(today)} ${day}th</p>`;

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
        greeting.textContent = 'Good night';
    } else if (hour < 12) {
        document.body.style.backgroundImage = "url('./images/morning.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good morning';
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url('./images/afternoon.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good afternoon';
    } else if (hour < 24) {
        document.body.style.backgroundImage = "url('./images/evening.jpg')";
        document.body.style.backgroundSize = 'cover';
        greeting.textContent = 'Good evening';
    }
}


function getName() {
    if(localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
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
}


function getFocus() {
    if(localStorage.getItem('focusss') === null) {
        focusss.textContent = '[Enter focusss]';
    } else {
        focusss.textContent = localStorage.getItem('focusss');
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focusss.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focusss.addEventListener('keypress', setFocus);
focusss.addEventListener('blur', setFocus);

getName();
getFocus();
changeBackground();
showTime();
