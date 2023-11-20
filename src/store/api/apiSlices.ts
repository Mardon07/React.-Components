import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Data, SearchResult } from '../../types/types';

export const swapiApi = createApi({
  reducerPath: 'swapiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/',
    fetchFn: (url, options) => fetch(url, options),
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query<Data, { searchTerm: string; page: number }>(
      {
        query: ({ searchTerm, page }) =>
          `people/?search=${searchTerm}&page=${page}`,
      }
    ),
    getDetails: builder.query<SearchResult, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetSearchResultsQuery, useGetDetailsQuery } = swapiApi;
export default swapiApi;
