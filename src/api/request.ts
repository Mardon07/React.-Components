import { SearchResult } from '../Pages/SearchApp';
import { Detail } from '../Pages/Detail';

export const getSearchResults = async (
  searchTerm: string,
  page: number
): Promise<{ results: SearchResult[]; nextPage: string | null }> => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return { results: data.results, nextPage: data.next };
  } catch (error) {
    throw new Error('An error occurred while fetching data');
  }
};

export const getDetails = async (id: string): Promise<Detail> => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('An error occurred while fetching details');
  }
};
