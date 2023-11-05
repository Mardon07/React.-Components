// SearchResults.tsx
import React from 'react';
import { SearchResult } from '../Pages/SearchApp';

interface SearchResultsProps {
  searchTerm: string;
  searchResults: SearchResult[];
  error: string | null;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  error,
  isLoading,
}) => {
  return (
    <div className="search-results">
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <ul>
          {searchResults.map((result: SearchResult, index: number) => (
            <li key={index} className="search-result">
              <div>
                <strong>{result.name}</strong>
              </div>
              <div>Gender: {result.gender}</div>
              <div>Height: {result.height}</div>
              <div>Skin Color: {result.skin_color}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
