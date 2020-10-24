const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focuss = document.getElementById('focuss');


const showAmPm = true;

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();


    const amPM = hour >= 12 ? 'PM' : 'AM';

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPM : ''}`;

    setTimeout(showTime, 1000);

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
    if(localStorage.getItem('focuss') === null) {
        focuss.value = '[Enter focuss]';
    } else {
        focuss.value = localStorage.getItem('focuss');
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focuss', e.target.value);
            focuss.blur();
        }
    } else {
        localStorage.setItem('focuss', e.target.value);
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focuss.addEventListener('keypress', setFocus);
focuss.addEventListener('blur', setFocus);

getName();
getFocus();
changeBackground();
showTime();
