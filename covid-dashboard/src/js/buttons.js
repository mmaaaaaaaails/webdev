import {
    dataCountries,
    countryDeathList,
    countryRecoveredList,
    universalList,
} from './table';

import { searchProperty } from './search';

const deathsTotal = document.querySelector('#total_death');
const deathsNew = document.querySelector('#new_death');
const deathsRelative = document.querySelector('#relative_death');
const newDeathsRelative = document.querySelector('#relative_new_death');

const recoveredTotal = document.querySelector('#total_recovered');
const recoveredNew = document.querySelector('#new_recovered');
const recoveredRelative = document.querySelector('#relative_recovered');
const newRecoveredRelative = document.querySelector('#relative_new_recovered');

const universalCases = document.querySelector('#universal_cases');
const universalDeaths = document.querySelector('#universal_deaths');
const universalRecovered = document.querySelector('#universal_recovered');
let universalProperty = 'cases';

const universalTotal = document.querySelector('#total_cases');
const universalNew = document.querySelector('#new_cases');
const universalRelative = document.querySelector('#relative_cases');
const newUniversalRelative = document.querySelector('#relative_new_cases');

const universalButtons = [universalTotal, universalNew, universalRelative, newUniversalRelative];

function sortAll() {
    for (let i = 0; i < countryDeathList.length; i += 1) {
        countryDeathList[i].innerHTML = `<span class='death__number'>
                                            ${dataCountries[i].deaths.toLocaleString('ru-RU')}
                                            <span class='death__end'>deaths</span>
                                            </span>
                                        <span class='death__country'>${dataCountries[i].country}</span>`;
        countryRecoveredList[i].innerHTML = `<span class='recovered__number'>
                                                ${dataCountries[i].cases.toLocaleString('ru-RU')}
                                                <span class='recovered__end'>cases</span>
                                                <span class='recovered__amount'>
                                                    ${dataCountries[i].recovered.toLocaleString('ru-RU')} recovered
                                                </span>
                                            </span>
                                            <span class='recovered__country'>
                                                ${dataCountries[i].country}
                                            </span>`;
    }
}

function addEvents() {
    universalCases.addEventListener('click', () => {
        universalProperty = 'cases';
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b.cases - a.cases);
            sortAll();
        }
        universalButtons.forEach((button) => {
            button.classList = 'cases__button';
        });
        for (let i = 0; i < universalList.length; i += 1) {
            universalList[i].innerHTML = `<span class='cases__number'>${dataCountries[i].cases.toLocaleString('ru-RU')}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    universalDeaths.addEventListener('click', () => {
        universalProperty = 'deaths';
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b.deaths - a.deaths);
            sortAll();
        }
        universalButtons.forEach((button) => {
            button.classList = 'death__button';
        });
        for (let i = 0; i < universalList.length; i += 1) {
            universalList[i].innerHTML = `<span class='cases__number'>${dataCountries[i].deaths.toLocaleString('ru-RU')}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    universalRecovered.addEventListener('click', () => {
        universalProperty = 'recovered';
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b.recovered - a.recovered);
            sortAll();
        }
        universalButtons.forEach((button) => {
            button.classList = 'recovered__button';
        });
        for (let i = 0; i < universalList.length; i += 1) {
            universalList[i].innerHTML = `<span class='cases__number'>${dataCountries[i].recovered.toLocaleString('ru-RU')}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    universalTotal.addEventListener('click', () => {
        let universal = 'cases';
        if (universalProperty === 'recovered') {
            universal = 'recovered';
        }
        if (universalProperty === 'deaths') {
            universal = 'deaths';
        }
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b[universal] - a[universal]);
            sortAll();
        }
        for (let i = 0; i < universalList.length; i += 1) {
            universalList[i].innerHTML = `<span class='cases__number'>${dataCountries[i][universal].toLocaleString('ru-RU')}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    universalNew.addEventListener('click', () => {
        let universal = 'todayCases';
        if (universalProperty === 'recovered') {
            universal = 'todayRecovered';
        }
        if (universalProperty === 'deaths') {
            universal = 'todayDeaths';
        }
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b[universal] - a[universal]);
            sortAll();
        }
        for (let i = 0; i < universalList.length; i += 1) {
            universalList[i].innerHTML = `<span class='cases__number'>${dataCountries[i][universal].toLocaleString('ru-RU')}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    universalRelative.addEventListener('click', () => {
        let universal = 'cases';
        if (universalProperty === 'recovered') {
            universal = 'recovered';
        }
        if (universalProperty === 'deaths') {
            universal = 'deaths';
        }
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b[universal] * (100000 / b.population)
            - a[universal] * (100000 / a.population));
            sortAll();
        }
        for (let i = 0; i < universalList.length; i += 1) {
            const relativeFormula = dataCountries[i][universal]
            * (100000 / dataCountries[i].population);
            universalList[i].innerHTML = `<span class='cases__number'>${relativeFormula.toFixed(1)}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    newUniversalRelative.addEventListener('click', () => {
        let universal = 'todayCases';
        if (universalProperty === 'recovered') {
            universal = 'todayRecovered';
        }
        if (universalProperty === 'deaths') {
            universal = 'todayDeaths';
        }
        if (searchProperty === false) {
            dataCountries.sort((a, b) => b[universal] * (100000 / b.population)
            - a[universal] * (100000 / a.population));
            sortAll();
        }
        for (let i = 0; i < universalList.length; i += 1) {
            const relativeFormula = dataCountries[i][universal]
            * (100000 / dataCountries[i].population);
            universalList[i].innerHTML = `<span class='cases__number'>${relativeFormula.toFixed(1)}</span>
                                        <span class='cases__country'>${dataCountries[i].country}</span>
                                        <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;
        }
    });

    deathsTotal.addEventListener('click', () => {
        for (let i = 0; i < countryDeathList.length; i += 1) {
            countryDeathList[i].innerHTML = `<span class='death__number'>
                                                ${dataCountries[i].deaths.toLocaleString('ru-RU')}
                                                <span class='death__end'>deaths</span>
                                                </span>
                                            <span class='death__country'>${dataCountries[i].country}</span>`;
        }
    });

    deathsNew.addEventListener('click', () => {
        for (let i = 0; i < countryDeathList.length; i += 1) {
            countryDeathList[i].innerHTML = `<span class='death__number'>
                                                ${dataCountries[i].todayDeaths.toLocaleString('ru-RU')}
                                                <span class='death__end'>deaths</span>
                                                </span>
                                            <span class='death__country'>${dataCountries[i].country}</span>`;
        }
    });

    deathsRelative.addEventListener('click', () => {
        for (let i = 0; i < countryDeathList.length; i += 1) {
            const relativeFormula = dataCountries[i].deaths
            * (100000 / dataCountries[i].population);
            countryDeathList[i].innerHTML = `<span class='death__number'>
                                                ${relativeFormula.toFixed(1).toLocaleString('ru-RU')}
                                                <span class='death__end'>deaths</span>
                                                </span>
                                            <span class='death__country'>${dataCountries[i].country}</span>`;
        }
    });

    newDeathsRelative.addEventListener('click', () => {
        for (let i = 0; i < countryDeathList.length; i += 1) {
            const relativeFormula = dataCountries[i].todayDeaths
            * (100000 / dataCountries[i].population);
            countryDeathList[i].innerHTML = `<span class='death__number'>
                                                ${relativeFormula.toFixed(1).toLocaleString('ru-RU')}
                                                <span class='death__end'>deaths</span>
                                                </span>
                                            <span class='death__country'>${dataCountries[i].country}</span>`;
        }
    });

    recoveredTotal.addEventListener('click', () => {
        for (let i = 0; i < countryRecoveredList.length; i += 1) {
            countryRecoveredList[i].innerHTML = `<span class='recovered__number'>
                                                    ${dataCountries[i].cases.toLocaleString('ru-RU')}
                                                    <span class='recovered__end'>cases</span>
                                                    <span class='recovered__amount'>
                                                        ${dataCountries[i].recovered.toLocaleString('ru-RU')} recovered
                                                    </span>
                                                </span>
                                                <span class='recovered__country'>
                                                    ${dataCountries[i].country}
                                                </span>`;
        }
    });

    recoveredNew.addEventListener('click', () => {
        for (let i = 0; i < countryRecoveredList.length; i += 1) {
            countryRecoveredList[i].innerHTML = `<span class='recovered__number'>
                                                    ${dataCountries[i].todayCases.toLocaleString('ru-RU')}
                                                    <span class='recovered__end'>cases</span>
                                                    <span class='recovered__amount'>
                                                        ${dataCountries[i].todayRecovered.toLocaleString('ru-RU')} recovered
                                                    </span>
                                                </span>
                                                <span class='recovered__country'>
                                                    ${dataCountries[i].country}
                                                </span>`;
        }
    });

    recoveredRelative.addEventListener('click', () => {
        for (let i = 0; i < countryRecoveredList.length; i += 1) {
            const relativeFormula = 100000 / dataCountries[i].population;
            countryRecoveredList[i].innerHTML = `<span class='recovered__number'>
                                                    ${(dataCountries[i].cases * relativeFormula).toFixed(1)}
                                                    <span class='recovered__end'>cases</span>
                                                    <span class='recovered__amount'>
                                                        ${(dataCountries[i].recovered * relativeFormula).toFixed(1)} recovered
                                                    </span>
                                                </span>
                                                <span class='recovered__country'>
                                                    ${dataCountries[i].country}
                                                </span>`;
        }
    });

    newRecoveredRelative.addEventListener('click', () => {
        for (let i = 0; i < countryRecoveredList.length; i += 1) {
            const relativeFormula = 100000 / dataCountries[i].population;
            countryRecoveredList[i].innerHTML = `<span class='recovered__number'>
                                                    ${(dataCountries[i].todayCases * relativeFormula).toFixed(1)}
                                                    <span class='recovered__end'>cases</span>
                                                    <span class='recovered__amount'>
                                                        ${(dataCountries[i].todayRecovered * relativeFormula).toFixed(1)} recovered
                                                    </span>
                                                </span>
                                                <span class='recovered__country'>
                                                    ${dataCountries[i].country}
                                                </span>`;
        }
    });
}

export { addEvents };
