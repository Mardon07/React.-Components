import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router';
import SearchApp from '../../Pages/SearchApp';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
      <MemoryRouter>
        <Provider store={store}>
          <SearchApp />
        </Provider>
      </MemoryRouter>
    );
  });

  expect(screen.getByText('Star Wars Search')).toBeInTheDocument();
});

test('renders SearchResult component', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchApp />
        </Provider>
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId('search-results')).toBeInTheDocument();
});

test('renders SearchBar component', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchApp />
        </Provider>
      </MemoryRouter>
    );
  });

  expect(screen.getByTestId('search-bar')).toBeInTheDocument();
});

test('renders Pagination component', async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchApp />
        </Provider>
      </MemoryRouter>
    );
  });

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
