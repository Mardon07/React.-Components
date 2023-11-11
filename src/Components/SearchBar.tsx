import React, { useContext } from 'react';
import SearchTermContext from '../Contex api/SearchTermContext';

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
