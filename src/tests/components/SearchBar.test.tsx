import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchBar from '../../Components/SearchBar';
import { store } from '../../store/store';

describe('SearchBar Component', () => {
  it('renders the SearchBar component', () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchBar
        onSearchChange={() => {}}
        onSearch={() => {}}
        onThrowError={() => {}}
      />
    );

    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Throw Error')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter search term')).toBeInTheDocument();
  });

  it('calls onSearchChange when the input value changes', () => {
    const onSearchChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar
          onSearchChange={onSearchChangeMock}
          onSearch={() => {}}
          onThrowError={() => {}}
        />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter search term'), {
      target: { value: 'Star Wars' },
    });

    expect(onSearchChangeMock).toHaveBeenCalledWith('Star Wars');
  });

  it('calls onSearch when the Search button is clicked', () => {
    const onSearchMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <SearchBar
          onSearchChange={() => {}}
          onSearch={onSearchMock}
          onThrowError={() => {}}
        />
      </Provider>
    );

    fireEvent.click(getByText('Search'));

    expect(onSearchMock).toHaveBeenCalled();
  });

  it('calls onThrowError when the Throw Error button is clicked', () => {
    const onThrowErrorMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <SearchBar
          onSearchChange={() => {}}
          onSearch={() => {}}
          onThrowError={onThrowErrorMock}
        />
      </Provider>
    );

    fireEvent.click(getByText('Throw Error'));

    expect(onThrowErrorMock).toHaveBeenCalled();
  });
});
