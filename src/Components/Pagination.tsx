import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const itemsPerPage = Number(event.target.value);
    onItemsPerPageChange(itemsPerPage);
  };

  return (
    <div data-testid="pagination" className="pagination">
      <button onClick={handlePrevPage}>Previous</button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage}>Next</button>
      <label htmlFor="page-select:id">Items per page</label>
      <select
        id="page-select:id"
        name="page-select"
        onChange={handleItemsPerPageChange}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default Pagination;
