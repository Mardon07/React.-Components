import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultContext from '../ContexApi/ResultContext';
import { SearchResult } from '../types/types';

interface SearchResultsProps {
  error: string | null;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ error, isLoading }) => {
  const navigate = useNavigate();
  const searchResults = useContext(ResultContext);
  const handleNavigate = (url: string) => {
    navigate(`detail/${url.match(/[0-9]+/g)?.join('')}`);
  };
  return (
    <div data-testid="search-results" className="search-results">
      {isLoading ? (
        <div data-testid="loader" className="loader"></div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
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
