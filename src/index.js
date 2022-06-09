import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

refs.inputSearchEl.addEventListener('input', onSearch);

function onSearch(e) {
  refs.countryInfoEl.textContent = '';
  refs.countryListEl.textContent = '';
  let str = e.currentTarget.value.trim();
  if (str === '') {
    return;
  }

  fetchCountries()
    .then(response => {
      let result = response.filter(item =>
        item.name.toLowerCase().includes(str)
      );

      let template = '';
      if (result.length === 0) {
        throw error();
      }
      if (result.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (result.length >= 1 && result.length <= 10) {
        template = result
          .map(country => {
            return `
            <li class="country-list__item"><img class="country-list__img" width=26  src=${country.flags.svg} />${country.name}</li>
            `;
          })
          .join('');
        refs.countryListEl.insertAdjacentHTML('beforeend', template);
        if (result.length === 1) {
          const infoTempale = result.map(country => {
            const list = country.languages
              .map(item => {
                return item.name;
              })
              .join(', ');
            return `
                <p><span><b>Capital:</b></span> ${country.name}</p>     
                <p><span><b>Population:</b></span> ${country.population}</p>     
                <p><span><b>Capital:</b></span> ${list}</p> 
                `;
          });
          refs.countryInfoEl.insertAdjacentHTML('beforeend', infoTempale);
        }
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}
