import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router';
import SearchApp from '../../Pages/SearchApp';
import { act as domAct } from 'react-dom/test-utils';

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
  await domAct(async () => {
    render(
      <MemoryRouter>
        <SearchApp />
      </MemoryRouter>
    );
  });

  expect(screen.getByText('Star Wars Search')).toBeInTheDocument();
});

test('renders SearchResult component', async () => {
  await domAct(async () => {
    render(
      <MemoryRouter>
        <SearchApp />
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId('search-results')).toBeInTheDocument();
});

test('renders SearchBar component', async () => {
  await domAct(async () => {
    render(
      <MemoryRouter>
        <SearchApp />
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId('search-bar')).toBeInTheDocument();
});

test('renders Pagination component', async () => {
  await domAct(async () => {
    render(
      <MemoryRouter>
        <SearchApp />
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId('pagination')).toBeInTheDocument();
});
