import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { cards } from '../mocks/cards';
import SearchResults from '../../Components/SearchResults';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('SearchResults Component', () => {
  test('renders search-results', async () => {
    cards;

    render(
      <Provider store={store}>
        <SearchResults error={null} />
      </Provider>,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });

  test('renders loader when isLoading is true', async () => {
    cards;

    render(
      <Provider store={store}>
        <SearchResults error={null} />
      </Provider>,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
