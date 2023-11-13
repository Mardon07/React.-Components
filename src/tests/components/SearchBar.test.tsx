import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../../Components/SearchBar';

describe('SearchBar Component', () => {
  it('renders the SearchBar component', () => {
    const { getByText, getByPlaceholderText } = render(
      <SearchBar
        onSearchChange={() => {}}
        onSearch={() => {}}
        onThrowError={() => {}}
      />
    );

    // Check if the buttons and input field are rendered
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Throw Error')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter search term')).toBeInTheDocument();
  });

  it('calls onSearchChange when the input value changes', () => {
    const onSearchChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar
        onSearchChange={onSearchChangeMock}
        onSearch={() => {}}
        onThrowError={() => {}}
      />
    );

    // Simulate user typing in the input field
    fireEvent.change(getByPlaceholderText('Enter search term'), {
      target: { value: 'Star Wars' },
    });

    // Check if onSearchChange is called with the correct value
    expect(onSearchChangeMock).toHaveBeenCalledWith('Star Wars');
  });

  it('calls onSearch when the Search button is clicked', () => {
    const onSearchMock = jest.fn();
    const { getByText } = render(
      <SearchBar
        onSearchChange={() => {}}
        onSearch={onSearchMock}
        onThrowError={() => {}}
      />
    );

    // Simulate user clicking the Search button
    fireEvent.click(getByText('Search'));

    // Check if onSearch is called
    expect(onSearchMock).toHaveBeenCalled();
  });

  it('calls onThrowError when the Throw Error button is clicked', () => {
    const onThrowErrorMock = jest.fn();
    const { getByText } = render(
      <SearchBar
        onSearchChange={() => {}}
        onSearch={() => {}}
        onThrowError={onThrowErrorMock}
      />
    );

    // Simulate user clicking the Throw Error button
    fireEvent.click(getByText('Throw Error'));

    // Check if onThrowError is called
    expect(onThrowErrorMock).toHaveBeenCalled();
  });
});
