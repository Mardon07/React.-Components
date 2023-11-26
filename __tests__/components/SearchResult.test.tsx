import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { cards } from '../../Components/mocks/cards';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import SearchResults from '../../Components/SearchResults';
import React from 'react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
describe('SearchResults Component', () => {
  test('renders search-results', async () => {
    cards;

    render(
      <Provider store={store}>
        <SearchResults error={null} />
      </Provider>
    );

    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });

  test('renders loader when isLoading is true', async () => {
    cards;

    render(
      <Provider store={store}>
        <SearchResults error={null} />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
