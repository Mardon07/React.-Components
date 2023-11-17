import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Pagination from '../../Components/Pagination';
import { store } from '../../store/store';

describe('Pagination Component', () => {
  it('renders the Pagination component with default values', () => {
    const { getByText, getByLabelText } = render(
      <Pagination
        currentPage={1}
        onPageChange={() => {}}
        onItemsPerPageChange={() => {}}
      />
    );

    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Page 1')).toBeInTheDocument();
    expect(getByLabelText('Items per page')).toBeInTheDocument();
  });

  it('calls onPageChange when the Next button is clicked', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={1}
          onPageChange={onPageChangeMock}
          onItemsPerPageChange={() => {}}
        />
      </Provider>
    );

    fireEvent.click(getByText('Next'));

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when the Previous button is clicked', () => {
    const onPageChangeMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={2}
          onPageChange={onPageChangeMock}
          onItemsPerPageChange={() => {}}
        />
      </Provider>
    );

    fireEvent.click(getByText('Previous'));

    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });

  it('calls onItemsPerPageChange when the items per page select is changed', () => {
    const onItemsPerPageChangeMock = jest.fn();
    const { getByLabelText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          onItemsPerPageChange={onItemsPerPageChangeMock}
        />
      </Provider>
    );

    fireEvent.change(getByLabelText('Items per page'), {
      target: { value: '20' },
    });

    expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(20);
  });
});
