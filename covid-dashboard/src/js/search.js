import {
    dataCountries,
    countryDeathList,
    countryRecoveredList,
    universalList,
} from './table';

const cross = document.querySelector('.search__cross');
const searchArea = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__btn');
let searchProperty = false;

function setProperty() {
    searchProperty = true;
    universalList.forEach((item) => {
        item.classList.add('hide');
    });
    countryDeathList.forEach((item) => {
        item.classList.add('hide');
    });
    countryRecoveredList.forEach((item) => {
        item.classList.add('hide');
    });
}

function searchCountry() {
    for (let i = 0; i < dataCountries.length; i += 1) {
        if (searchArea.value.toLowerCase() === dataCountries[i].country.toLowerCase()
        || searchArea.value.toLowerCase() === dataCountries[i].countryInfo.iso2.toLowerCase()
        || searchArea.value.toLowerCase() === dataCountries[i].countryInfo.iso3.toLowerCase()) {
            setProperty();
            universalList[i].classList.remove('hide');
            countryDeathList[i].classList.remove('hide');
            countryRecoveredList[i].classList.remove('hide');
        }
    }
}

function chooseCountry() {
    cross.addEventListener('click', () => {
        universalList.forEach((item) => item.classList.remove('hide'));
        countryDeathList.forEach((item) => item.classList.remove('hide'));
        countryRecoveredList.forEach((item) => item.classList.remove('hide'));
        searchArea.value = '';
    });

    searchButton.addEventListener('click', () => {
        searchCountry();
    });

    function checkEnter(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            searchCountry();
        }
    }

    searchArea.addEventListener('keydown', checkEnter, false);

    for (let i = 0; i < dataCountries.length; i += 1) {
        universalList[i].addEventListener('click', () => {
            setProperty();
            universalList[i].classList.remove('hide');
            countryDeathList[i].classList.remove('hide');
            countryRecoveredList[i].classList.remove('hide');
        });
        countryDeathList[i].addEventListener('click', () => {
            setProperty();
            universalList[i].classList.remove('hide');
            countryDeathList[i].classList.remove('hide');
            countryRecoveredList[i].classList.remove('hide');
        });
        countryRecoveredList[i].addEventListener('click', () => {
            setProperty();
            universalList[i].classList.remove('hide');
            countryDeathList[i].classList.remove('hide');
            countryRecoveredList[i].classList.remove('hide');
        });
    }
}

export { chooseCountry, searchProperty, searchArea };
