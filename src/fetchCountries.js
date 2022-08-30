import Notiflix from 'notiflix';
import { pageMarkup } from '.';

const BASIC_URL = 'https://restcountries.com/v3.1';

const searchOptions = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export const fetchCountries = function (name) {
  return fetch(`${BASIC_URL}/name/${name}?${searchOptions}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      pageMarkup(data);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        timeout: 3000,
      });
    });
};
