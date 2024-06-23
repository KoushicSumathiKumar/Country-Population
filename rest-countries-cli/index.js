const readlineSync = require('readline-sync');
// importing getAllContinents, getCountriesByContinent, getPopulationByCountry functions from api.js
const { getAllContinents, getCountriesByContinent, getPopulationByCountry } = require('./api');

async function main() {
  try {
    console.log('--------------------------------------------------------')
    console.log('Available continents:');
    console.log('--------------------------------------------------------')

    const continents = await getAllContinents();

    // outputs the list of continent
    continents.forEach((continent) => {
      console.log(`${continent}`);
    });

    console.log('--------------------------------------------------------')

    // user selects the continent
    const enteredContinent = readlineSync.question('Select a continent: ');
    // .toLowerCase() to make sure my code isn't case sensitive
    const selectedContinent = continents.find(continent =>
      continent.toLowerCase() === enteredContinent.toLowerCase()
    );

    // if the continent the user is not found...
    if (!selectedContinent) {
      console.log('Continent not found. Please make sure you entered it correctly.');
      return;
    }
    console.log(`You selected: ${selectedContinent}`);

    const countries = await getCountriesByContinent(selectedContinent);
    
    // outputs the list of countries in that continent
    console.log(`Countries in ${selectedContinent}:`);
    console.log('--------------------------------------------------------')
    countries.forEach(country => {
      // .common to output the name of country its well-known as Example common - India, official - Republic of India etc...
      console.log(country.name.common);
      //console.log(country.population) testing purposes to see if this matches the output
    });

    if (countries.length === 0) {
      console.log('No countries found.');
      return;
    }

    // user selects the country they want to find the population
    const selectedCountry = readlineSync.question('Select a country: ');
    // .toLowerCase() to make sure my code isn't case sensitive
    if (!countries.find(country => country.name.common.toLowerCase() === selectedCountry.toLowerCase())) {
      console.log('Invalid country name. Please make sure you typed it correctly.');
      return;
    }

    console.log('--------------------------------------------------------')

    const population = await getPopulationByCountry(selectedCountry);

    // outputs the population of that country
    if (population !== null) {
      console.log(`The population of ${selectedCountry} is ${population}.`);
      console.log('--------------------------------------------------------')

    } else {
      console.log('Could not retrieve population data.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
