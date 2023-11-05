import { SearchResult } from '../Pages/SearchApp';

export const getSearchResults = async (
  searchTerm: string
): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('An error occurred while fetching data');
  }
};
