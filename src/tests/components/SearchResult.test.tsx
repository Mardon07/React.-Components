import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { cards } from '../mocks/cards';
import SearchResults from '../../Components/SearchResults';

describe('SearchResults Component', () => {
  test('renders search-results', async () => {
    cards;

    render(<SearchResults error={null} isLoading={true} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });
  test('renders loader when isLoading is true', async () => {
    cards;

    render(<SearchResults error={null} isLoading={true} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders error message when there is an error', async () => {
    cards;

    render(<SearchResults error="Test error" isLoading={false} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });
});
