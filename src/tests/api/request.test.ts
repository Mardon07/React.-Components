import fetchMock from 'jest-fetch-mock';
import { getDetails, getSearchResults } from '../../api/request';
import { cards } from '../mocks/cards';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('getSearchResults', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  it('fetches search results successfully', async () => {
    const mockResults = cards;

    fetchMock.mockResponseOnce(
      JSON.stringify({ results: mockResults, nextPage: null })
    );

    const searchTerm = 'Skywalker';
    const page = 1;
    const expectedUrl = `https://swapi.dev/api/people/?search=${encodeURIComponent(
      searchTerm
    )}&page=${page}`;

    const result = await getSearchResults(searchTerm, page);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ results: mockResults, nextPage: undefined });
  });

  it('handles errors when fetching search results', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch data'));

    const searchTerm = 'Skywalker';
    const page = 1;

    await expect(getSearchResults(searchTerm, page)).rejects.toThrow(
      'Failed to fetch data'
    );
  });
});

describe('getDetails', () => {
  it('fetches details successfully', async () => {
    const mockDetails = { name: 'Luke Skywalker', height: '172' };
    const id = '1';

    fetchMock.mockResponseOnce(JSON.stringify(mockDetails));

    const result = await getDetails(id);

    expect(fetchMock).toHaveBeenCalledWith(
      `https://swapi.dev/api/people/${id}`
    );
    expect(result).toEqual(mockDetails);
  });

  it('handles errors when fetching details', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch details'));

    const id = '1';

    await expect(getDetails(id)).rejects.toThrow(
      'An error occurred while fetching details'
    );
  });
});
