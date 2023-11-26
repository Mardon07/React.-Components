import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import SearchBar from '../../Components/SearchBar';
import { store } from '../../src/store/store';

describe('SearchBar Component', () => {
  it('renders the SearchBar component', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar onThrowError={() => {}} />
      </Provider>
    );

    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Throw Error')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter search term')).toBeInTheDocument();
  });

  it('calls onThrowError when the Throw Error button is clicked', () => {
    const onThrowErrorMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <SearchBar onThrowError={onThrowErrorMock} />
      </Provider>
    );

    fireEvent.click(getByText('Throw Error'));

    expect(onThrowErrorMock).toHaveBeenCalled();
  });
});
