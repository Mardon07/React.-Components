import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onThrowError: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
  onThrowError,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value.trim())}
      />
      <button onClick={onSearch}>Search</button>
      <button onClick={onThrowError}>Throw Error</button>
    </div>
  );
};

export default SearchBar;
