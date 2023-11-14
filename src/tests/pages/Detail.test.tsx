import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getDetails } from '../../api/request';
import Detail from '../../Pages/Detail';

jest.mock('../../api/request');

const mockedGetDetails = getDetails as jest.MockedFunction<typeof getDetails>;

describe('Detail Component', () => {
  it('renders loading state and fetches details', async () => {
    const mockResponse = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
    };

    mockedGetDetails.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      render(
        <MemoryRouter>
          <Detail />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      });
    });
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172')).toBeInTheDocument();
    expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
  });

  it('renders error message when details fetching fails', async () => {
    mockedGetDetails.mockRejectedValueOnce(
      new Error('An error occurred while fetching details')
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Detail />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockedGetDetails).toHaveBeenCalledTimes(1);
      });
    });
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
});
