const axios = require('axios');
// importing getAllContinents, getCountriesByContinent, getPopulationByCountry functions from api.js
const { getAllContinents, getCountriesByContinent, getPopulationByCountry } = require('./api');

// mock the axios to simulate api responses
jest.mock('axios');

// testing getAllContinents
describe('getAllContinents', () => {
  // test case for successfully fetching all continents
  it('fetches all continents correctly', async () => {
    const mockResponse = {
      data: [
        { region: 'Africa' },
        { region: 'Asia' },
        { region: 'Europe' },
        { region: 'Americas' },
        { region: 'Oceania' },
        { region: 'Antarctic'}
      ],
    };

    // set up the mocked axios.get to resolve with mockResponse
    axios.get.mockResolvedValue(mockResponse);

    // call the function and assert the expected results
    const continents = await getAllContinents();
    expect(continents).toHaveLength(6);
    expect(continents).toContain('Africa');
    expect(continents).toContain('Asia');
    expect(continents).toContain('Europe');
    expect(continents).toContain('Americas');
    expect(continents).toContain('Oceania');
    expect(continents).toContain('Antarctic');


  });

  // test case for handling errors when fetching continents
  // without a mockResponse, it should give us a failed to fetch error
  it('handles errors when fetching continents', async () => {
    // set up the mocked axios.get to reject with an error
    axios.get.mockRejectedValue(new Error('Failed to fetch continents'));

    // call the function and assert the expected results
    const continents = await getAllContinents();
    expect(continents).toEqual([]);
  });
});

// testing getCountriesByContinent
describe('getCountriesByContinent', () => {
  // test case for successfully fetching countries by continent
  it('fetches countries by continent correctly', async () => {
    // mock api response
    const mockResponse = {
      data: [
        { name: { common: 'Country A' } },
        { name: { common: 'Country B' } },
      ],
    };

    // set up the mocked axios.get to resolve with mockResponse
    axios.get.mockResolvedValue(mockResponse);

    // call the function and assert the expected results
    const countries = await getCountriesByContinent('Europe');
    expect(countries).toHaveLength(2);
    expect(countries[0].name.common).toBe('Country A');
    expect(countries[1].name.common).toBe('Country B');
  });

  // test case for handling errors when fetching countries
  // without a mockResponse, it should give us a failed to fetch error
  it('handles errors when fetching countries', async () => {
    // set up the mocked axios.get to reject with an error
    axios.get.mockRejectedValue(new Error('Failed to fetch countries'));

    // call the function and assert the expected results
    const countries = await getCountriesByContinent('Europe');
    expect(countries).toEqual([]);
  });
});

// testing getPopulationByCountry
describe('getPopulationByCountry', () => {
  // test case for successfully fetching population by country
  // with data containing the correct information, it should return each countries corresponding populations
  it('fetches population by country correctly', async () => {
    // mock api response
    const mockResponse = {
      data: [
        { name: { common: 'Country A' }, population: 10000000 },
        { name: { common: 'Country B' }, population: 50000000 },
      ],
    };

    // set up the mocked axios.get to resolve with mockResponse
    axios.get.mockResolvedValue(mockResponse);

    // call the function and assert the expected results
    const populationA = await getPopulationByCountry('Country A');
    expect(populationA).toBe(10000000);

    const populationB = await getPopulationByCountry('Country B');
    expect(populationB).toBe(50000000);
  });

  // test case for handling errors when fetching population
  // without a mockResponse, it should give us a failed to fetch error
  it('handles errors when fetching population', async () => {
    // set up the mocked axios.get to reject with an error
    axios.get.mockRejectedValue(new Error('Failed to fetch population'));

    // call the function and assert the expected results
    const population = await getPopulationByCountry('Country A');
    expect(population).toBeNull();
  });

  // test case for handling when country is not found
  // mockResponse not containing Country B should return null as it's not in data
  it('handles case when country is not found', async () => {
    // mock api response
    const mockResponse = {
      data: [
        { name: { common: 'Country A' }, population: 10000000 },
      ],
    };

    // set up the mocked axios.get to resolve with mockResponse
    axios.get.mockResolvedValue(mockResponse);

    // call the function and assert the expected results
    const population = await getPopulationByCountry('Country B');
    expect(population).toBeNull();
  });
});
