const axios = require('axios');

// url of the REST countries api
const api_url = 'https://restcountries.com/v3.1';

// a promise is used to represents the eventual completion or failure of asynchronous functions and its resulting value

/**
 * function to get all unique continents from the REST countries api.
 * @returns {Promise<string[]>} - this means this function returns a promise (when resolved it will return an array of continent names)
 */

async function getAllContinents() {
  try {
    // fetching all country data from the api as shown in the REST countries api documentation
    const response = await axios.get(`${api_url}/all`); 

    // extract the continent from each country and add it to a set to ensure uniqueness
    const continents = new Set(response.data.map(country => country.region));

    // converting set => an array and removing empty strings
    return Array.from(continents);
  } catch (error) {
    console.error('Error fetching continents:', error.message);
    return [];
  }
}

/**
 * function to get all countries in a given continent.
 * @param {string} continent - the name of the continent.
 * @returns {Promise<object[]>} - this means this function returns a promise (when resolved it will return an array of country objects)
 */
async function getCountriesByContinent(continent) {
  try {
    // fetching country data for the user selected continent from the api
    const response = await axios.get(`${api_url}/region/${continent}`);
    return response.data;

  } catch (error) {
    console.error('Error fetching countries:', error.message);
    return [];
  }
}

/**
 * function to get the population of a given country.
 * @param {string} countryName - the name of the country.
 * @returns {Promise<number|null>} - this means this function returns a promise (when resolved it will return the population of the country, or null if an error occurs.)
 */
async function getPopulationByCountry(countryName) {
  try {
    // fetching all countries data with only the fields: name, population as shown in the REST countries api documentation
    const response = await axios.get(`${api_url}/all?fields=name,population`);
    const countries = response.data;

    // find the country by its common name
    const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());

    // if country is found, return its population
    if (country) {
      return country.population;
    } else {
      console.error('Country not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching population:', error.message);
    return null;
  }
}

// export the functions for use in other files
module.exports = {
  getAllContinents,
  getCountriesByContinent,
  getPopulationByCountry,
};
