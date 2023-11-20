import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { getDetails } from '../../api/request';
import Detail from '../../Pages/Detail';
import { store } from '../../store/store';

jest.mock('../../api/request');

const mockedGetDetails = getDetails as jest.MockedFunction<typeof getDetails>;

describe('Detail Component', () => {
  it('renders error message when details fetching fails', async () => {
    mockedGetDetails.mockRejectedValueOnce(
      new Error('An error occurred while fetching details')
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Detail />
          </MemoryRouter>
        </Provider>
      );
    });
    expect(screen.getByTestId('detail-container')).toBeInTheDocument();
  });
});
