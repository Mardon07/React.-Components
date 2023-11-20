import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/slices/result.slice';
import { getSearchTerm } from '../store/slices/searchTerm.slice';
import { RootState } from '../store/store';

interface SearchBarProps {
  onThrowError: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onThrowError }) => {
  const searchTerm = useSelector((state: RootState) => state.searchTerm.term);
  const [term, setTerm] = useState(searchTerm);
  const dispatch = useDispatch();
  const onSearchChange = (value: string) => {
    setTerm(value);
  };
  const handleSearch = () => {
    dispatch(setLoading(true));
    localStorage.setItem('searchQuery', term);
    dispatch(getSearchTerm(term));
  };
  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setTerm(savedQuery);
    }
  }, []);
  return (
    <div data-testid="search-bar" className="search-bar">
      <input
        type="text"
        value={term}
        placeholder="Enter search term"
        onChange={(e) => onSearchChange(e.target.value.trim())}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={onThrowError}>Throw Error</button>
    </div>
  );
};

export default SearchBar;
