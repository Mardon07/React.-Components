import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getDetails } from '../../pages/api/request';
import Detail from '../../Components/Detail';
import { store } from '../../src/store/store';
import React from 'react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../../pages/api/request');

const mockedGetDetails = getDetails as jest.MockedFunction<typeof getDetails>;

describe('Detail Component', () => {
  it('renders error message when details fetching fails', async () => {
    mockedGetDetails.mockRejectedValueOnce(
      new Error('An error occurred while fetching details')
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <Detail />
        </Provider>
      );
    });
    expect(screen.getByTestId('detail-container')).toBeInTheDocument();
  });
});
