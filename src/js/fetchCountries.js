export function fetchCountries() {
  return fetch(
    'https://restcountries.com/v2/all?fields=name,capital,population,flags,languages'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
