import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import SearchResults from '../Components/SearchResults';
import Pagination from '../Components/Pagination';
import { getSearchResults } from '../api/request';
import { SearchResult } from '../types/types';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const SearchApp: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(+id!);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

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

  useEffect(() => {
    performAPICall(searchTerm, currentPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsPerPage]);

  const performAPICall = async (term: string, page: number) => {
    setIsLoading(true);

    try {
      let results: SearchResult[] = [];
      let pageNumber: number = page;

      while (results.length < itemsPerPage) {
        const { results: responseResults, nextPage: responseNextPage } =
          await getSearchResults(term, pageNumber);

        if (!responseResults || responseResults.length === 0) {
          break;
        }

        results = [...results, ...responseResults];
        pageNumber++;

        if (!responseNextPage || results.length >= itemsPerPage) {
          break;
        }
      }

      setSearchResults(results.slice(0, itemsPerPage));
      setError(null);
    } catch (error) {
      setError('An error occurred');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    performAPICall(searchTerm, currentPage);
    localStorage.setItem('searchQuery', searchTerm);
  };

  const handlePageChange = (page: number) => {
    navigate(`/page/${page}`);
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
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
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <main className="main-data-container">
        <Outlet />
      </main>
    </div>
  );
};

export default SearchApp;
