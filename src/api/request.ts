import { SearchResult } from '../types/types';

export const getSearchResults = async (
  searchTerm: string,
  page: number,
  itemsPerPage: number
): Promise<{ results: SearchResult[]; nextPage: string | null }> => {
  const results: SearchResult[] = [];
  let nextPage: string | null = null;

  let totalItems = 0;
  while (totalItems < itemsPerPage) {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    totalItems += data.results.length;

    results.push(...data.results);

    nextPage = data.next;
    if (!nextPage) {
      break;
    }
    page++;
  }

  return { results, nextPage };
};

export const getDetails = async (id: string): Promise<SearchResult> => {
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
