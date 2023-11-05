// SearchApp.tsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import SearchResults from '../Components//SearchResults';
import { getSearchResults } from '../api/request'; // Функция для выполнения запроса к API

export interface SearchResult {
  name: string;
  gender: string;
  height: string;
  skin_color: string;
}

const SearchApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setSearchTerm(savedQuery);
      performAPICall(savedQuery);
    } else {
      performAPICall('');
    }
  }, []);

  const performAPICall = async (term: string) => {
    setIsLoading(true);
    try {
      const data = await getSearchResults(term);
      setSearchResults(data);
      setError(null);
    } catch (error) {
      setError('An error occurred');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    performAPICall(searchTerm.trim());
    localStorage.setItem('searchQuery', searchTerm);
  };

  const throwError = () => {
    setError('Error has occurred!');
  };

  return (
    <div className="search-app">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={(value: string) => setSearchTerm(value)}
        onSearch={handleSearch}
        onThrowError={throwError}
      />
      <SearchResults
        searchTerm={searchTerm}
        searchResults={searchResults}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchApp;
