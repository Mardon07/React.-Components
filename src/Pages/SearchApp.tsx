import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import SearchResults from '../Components/SearchResults';
import Pagination from '../Components/Pagination';
import { getSearchResults } from '../api/request';
import { SearchResult } from '../types/types';
import { Outlet } from 'react-router-dom';

const SearchApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setSearchTerm(savedQuery);
    }
  }, []);

  useEffect(() => {
    performAPICall(searchTerm, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const performAPICall = async (term: string, page: number) => {
    setIsLoading(true);
    try {
      const { results } = await getSearchResults(term, page);
      setSearchResults(results);
      setError(null);
    } catch (error) {
      setError('An error occurred');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    performAPICall(searchTerm, 1);
    localStorage.setItem('searchQuery', searchTerm);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const throwError = () => {
    setError('Error has occurred!');
  };

  return (
    <div className="search-app">
      <h1>Star Wars Search</h1>
      <SearchBar
        searchTerm={searchTerm}
        onThrowError={throwError}
        onSearchChange={(value: string) => setSearchTerm(value)}
        onSearch={handleSearch}
      />
      <SearchResults
        searchResults={searchResults}
        error={error}
        isLoading={isLoading}
      />
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="main-data-container">
        <Outlet />
      </main>
    </div>
  );
};

export default SearchApp;
