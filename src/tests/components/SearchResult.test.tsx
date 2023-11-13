import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { cards } from '../mocks/cards';
import SearchResults from '../../Components/SearchResults';

// Mock the useContext hook

describe('SearchResults Component', () => {
  test('renders search-results', async () => {
    // Mock the useContext value
    cards;

    render(<SearchResults error={null} isLoading={true} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });
  test('renders loader when isLoading is true', async () => {
    // Mock the useContext value
    cards;

    render(<SearchResults error={null} isLoading={true} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  //   test('renders All search-result', async () => {
  //     // Mock the useContext value
  //     cards;

  //     render(<SearchResults error={null} isLoading={true} />, {
  //       wrapper: MemoryRouter,
  //     });

  //     expect(screen.getAllByTestId('search-result')).toBeInTheDocument();
  //   });

  test('renders error message when there is an error', async () => {
    // Mock the useContext value
    cards;

    render(<SearchResults error="Test error" isLoading={false} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  //   test('renders search results', async () => {
  //     // Mock the useContext value
  //     cards;

  //     render(<SearchResults error={null} isLoading={false} />, {
  //       wrapper: MemoryRouter,
  //     });

  //     // Wait for the component
  //     expect(screen.getAllByTestId('result-name')).toBeInTheDocument();

  //     // Verify the presence of details button and click it
  //     const detailsButton = screen.getByText('Details');
  //     expect(detailsButton).toBeInTheDocument();
  //     userEvent.click(detailsButton);

  //     // Ensure that navigation has occurred (you may need to adjust this based on your navigation logic)
  //     expect(window.location.pathname).toBe('/detail/1');
  //   });
});
