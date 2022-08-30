import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов

// https://restcountries.com/v2/all?fields=name,capital,currencies

// const BASIC_URL = 'https://restcountries.com/v3.1';

// const searchOptions = new URLSearchParams({
//   fields: 'name,capital,population,flags,languages',
// });

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const markupUlRef = document.querySelector('.country-list');
const markupDivRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(searchCountry, 300));

function searchCountry(event) {
  markupUlRef.innerHTML = '';
  markupDivRef.innerHTML = '';
  fetchCountries(event.target.value.trim());
}

// function fetchCountries(name) {
//   return fetch(`${BASIC_URL}/name/${name}?${searchOptions}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       pageMarkup(data);
//     })
//     .catch(() => {
//       Notiflix.Notify.failure('Oops, there is no country with that name', {
//         timeout: 3000,
//       });
//     });
// }

export function pageMarkup(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        timeout: 3000,
      }
    );
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    const listOfCountriesMarkup = data
      .map(({ name, flags }) => {
        return `<li class="country-item"><img src="${flags.svg}"
             alt="Flag of ${name}" width="100">
             <p class="country-name">${name.official}</p></li>`;
      })
      .join('');
    markupUlRef.insertAdjacentHTML('beforeend', listOfCountriesMarkup);
    return;
  }
  const singleCountryMarkup = data
    .map(({ name, capital, population, flags, languages }) => {
      const values = Object.values(languages).join(', ');
      return `<img src="${flags.svg}"
           alt="Flag of ${name.official}" width="100">
           <p>${name.official}</p>
           <p>Capital: ${capital}</p>
           <p>Population: ${population}</p>
           <p>Languages: ${values}</p>`;
    })
    .join('');
  markupDivRef.insertAdjacentHTML('beforeend', singleCountryMarkup);
}
