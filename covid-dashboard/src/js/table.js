import {
    showGlobalCases, showCases, showDeath, showRecovered,
} from './modal';
import { addEvents } from './buttons';
import { chooseCountry } from './search';
import { addMap } from './map';
import { addGraph } from './graph';

const globalCases = document.querySelector('.cases__number');
const globalDeaths = document.querySelector('.death__amount');
const deathsTable = document.querySelector('.death__list');
const recoveredTable = document.querySelector('.recovered__list');
const casesTable = document.querySelector('.cases__list');
const universalList = [];
const countryDeathList = [];
const countryRecoveredList = [];
let dataAll;
let dataCountries;
let dataHistorical;

function fillTable() {
    dataCountries.sort((a, b) => b.cases - a.cases);
    for (let i = 0; i < dataCountries.length; i += 1) {
        if (dataCountries[i].country === 'MS Zaandam') {
            dataCountries[i].population = 1432;
        }
        if (dataCountries[i].country === 'Diamond Princess') {
            dataCountries[i].population = 1238;
        }
        const countryDeath = document.createElement('div');
        countryDeath.classList.add('death__item');
        countryDeath.innerHTML = `<span class='death__number'>
                                    ${dataCountries[i].deaths.toLocaleString('ru-RU')}
                                    <span class='death__end'>deaths</span>
                                    </span>
                                <span class='death__country'>${dataCountries[i].country}</span>`;

        const countryRecovered = document.createElement('div');
        countryRecovered.classList.add('recovered__item');
        countryRecovered.innerHTML = `<span class='recovered__number'>${dataCountries[i].cases.toLocaleString('ru-RU')}
                                        <span class='recovered__end'>cases</span>
                                        <span class='recovered__amount'>
                                            ${dataCountries[i].recovered.toLocaleString('ru-RU')} recovered
                                        </span>
                                    </span>
                                    <span class='recovered__country'>${dataCountries[i].country}</span>`;

        const countryCase = document.createElement('div');
        countryCase.classList.add('cases__item');
        countryCase.innerHTML = `<span class='cases__number'>${dataCountries[i].cases.toLocaleString('ru-RU')}</span>
                                <span class='cases__country'>${dataCountries[i].country}</span>
                                <img class='cases__flag' src='${dataCountries[i].countryInfo.flag}' alt='flag'>`;

        deathsTable.appendChild(countryDeath);
        recoveredTable.appendChild(countryRecovered);
        casesTable.appendChild(countryCase);
        universalList.push(countryCase);
        countryRecoveredList.push(countryRecovered);
        countryDeathList.push(countryDeath);
    }
}

async function setCases() {
    const resAll = await fetch('https://disease.sh/v3/covid-19/all');
    const resCountries = await fetch('https://disease.sh/v3/covid-19/countries');
    const resHistorical = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    if (resCountries.ok) {
        dataAll = await resAll.json();
        dataCountries = await resCountries.json();
        dataHistorical = await resHistorical.json();
        globalCases.textContent = dataAll.cases;
        globalDeaths.textContent = dataAll.deaths;
        fillTable();
        showCases();
        showDeath();
        showRecovered();
        showGlobalCases();
        addEvents();
        chooseCountry();
        addMap();
        addGraph();
    } else {
        globalCases.textContent = 'Error with API';
        globalDeaths.textContent = 'Error with API';
    }
}

setCases();

export {
    dataAll,
    dataCountries,
    dataHistorical,
    universalList,
    countryRecoveredList,
    countryDeathList,
    casesTable,
    recoveredTable,
    deathsTable,
};
