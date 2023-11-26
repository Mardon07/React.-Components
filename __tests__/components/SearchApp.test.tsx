import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // Используйте правильный путь
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import SearchApp from '../../Components/SearchApp';
import React from 'react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
const mockAxios = new MockAdapter(axios);

beforeAll(() => {
  mockAxios
    .onGet('https://swapi.dev/api/people/?search')
    .reply(200, { results: [] });

  mockAxios
    .onGet('https://swapi.dev/api/people/?search?term=Luke%20Skywalker')
    .reply(200, {
      results: [{ name: 'Luke Skywalker' }],
    });

  mockAxios.onGet('https://swapi.dev/api/people/?search?term=Error').reply(500);
});

afterEach(() => {
  mockAxios.reset();
});

test('renders SearchApp component', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
  });

  expect(screen.getByText('Star Wars Search')).toBeInTheDocument();
});

test('renders SearchResult component', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
  });

  expect(screen.getByTestId('search-results')).toBeInTheDocument();
});

test('renders SearchBar component', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
  });

  expect(screen.getByTestId('search-bar')).toBeInTheDocument();
});

test('renders Pagination component', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
  });

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
