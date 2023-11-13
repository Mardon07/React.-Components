import React, { useContext } from 'react';
import SearchTermContext from '../ContexApi/SearchTermContext';

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onThrowError: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  onSearch,
  onThrowError,
}) => {
  const searchTerm = useContext(SearchTermContext);
  return (
    <div data-testid="search-bar" className="search-bar">
      <input
        type="text"
        value={searchTerm}
        placeholder="Enter search term"
        onChange={(e) => onSearchChange(e.target.value.trim())}
      />
      <button onClick={onSearch}>Search</button>
      <button onClick={onThrowError}>Throw Error</button>
    </div>
  );
};

export default SearchBar;
