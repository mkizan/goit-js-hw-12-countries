var debounce = require('lodash.debounce');
import { onFetchError, onDecreaseRequestError } from './pnotify-error';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import getRefs from './get-refs.js';
import API from './fetchCountries.js';

const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
  refs.countryContainer.innerHTML = '';
  const searchQuery = e.target.value;

  if (refs.input.value.trim() !== '') {
    API.fetchCountries(searchQuery).then(createPageMarkup).catch(onFetchError);
  }
}

function createPageMarkup(country) {
  console.log('find countries:', country.length);
  if (country.length === 1) {
    appendCountryMarkup(country);
  } else if (country.length >= 2 && country.length < 10) {
    appendListMarkup(country);
  } else if (country.length > 10) {
    onDecreaseRequestError();
  }
}

function appendCountryMarkup(country) {
  const markup = countryCardTpl(country);
  refs.countryContainer.insertAdjacentHTML('beforeend', markup);
}

function appendListMarkup(country) {
  const markup = countryListTpl(country);
  refs.countryContainer.insertAdjacentHTML('beforeend', markup);
}
