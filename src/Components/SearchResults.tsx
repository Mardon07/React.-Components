import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResult } from '../types/types';

interface SearchResultsProps {
  searchResults: SearchResult[];
  error: string | null;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  error,
  isLoading,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(`detail/${url.match(/[0-9]+/g)?.join('')}`);
  };
  return (
    <div className="search-results">
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <ul>
          {searchResults.map((result: SearchResult, index: number) => (
            <li key={index} className="search-result">
              <div>
                {' '}
                <div>
                  <strong>{result.name}</strong>
                </div>
                <div>Gender: {result.gender}</div>
                <div>Height: {result.height}</div>
                <div>Skin Color: {result.skin_color}</div>
                <button onClick={() => handleNavigate(result.url)}>
                  Details
                </button>
              </div>
              <div></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
