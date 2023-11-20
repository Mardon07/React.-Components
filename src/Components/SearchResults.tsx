import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { SearchResult } from '../types/types';

interface SearchResultsProps {
  error: string | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ error }) => {
  const navigate = useNavigate();
  const isLoading = useSelector((state: RootState) => state.results.loading);

  const searchResults = useSelector(
    (state: RootState) => state.results.results
  );

  const handleNavigate = (url: string) => {
    navigate(`detail/${url.match(/[0-9]+/g)?.join('')}`);
  };
  return (
    <div data-testid="search-results" className="search-results">
      {isLoading ? (
        <div data-testid="loader" className="loader"></div>
      ) : error ? (
        <div data-testid="error-message" className="error-message">
          Error: {error}
        </div>
      ) : (
        <ul>
          {searchResults.map((result: SearchResult, index: number) => (
            <li
              key={index}
              data-testid="search-result"
              className="search-result"
            >
              <div>
                {' '}
                <div>
                  <strong data-testid="result-name">{result.name}</strong>
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
