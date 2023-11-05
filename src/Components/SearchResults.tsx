// SearchResults.tsx
import React, { useState } from 'react';
import Detail from '../Pages/Detail';
import { SearchResult } from '../Pages/SearchApp';

interface SearchResultsProps {
  searchResults: SearchResult[];
  error: string | null;
  isLoading: boolean;
  //   onItemClick: (result: SearchResult) => void; // Добавим свойство для обработки клика
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  error,
  isLoading,
  //   onItemClick, // Добавим получение свойства
}) => {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const handleItemClick = (result: SearchResult) => {
    setSelectedResult(result);
  };
  const closeDetail = () => {
    setSelectedResult(null);
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
                <button onClick={() => handleItemClick(result)}>Details</button>
              </div>
              <div>
                {result.name === selectedResult?.name && (
                  <>
                    {selectedResult && (
                      <Detail result={selectedResult} onClose={closeDetail} />
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
