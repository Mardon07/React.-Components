import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails } from '../api/request';
import { SearchResult } from '../types/types';

const Detail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );

  const handleItemClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getDetails(id!);
      setSelectedResult(response);
    } catch (error) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    handleItemClick();
  }, [handleItemClick]);
  const closeDetail = () => {
    setSelectedResult(null);

    navigate(-1);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const eventTarget = event.target as HTMLElement;

    if (eventTarget.className === 'detail-container-block') {
      closeDetail();
    }
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      data-testid="detail-container-block"
      className="detail-container-block"
    >
      <div data-testid="detail-container" className="detail-container">
        {isLoading ? (
          <div data-testid="loader" className="loader"></div>
        ) : error ? (
          <div data-testid="error-message" className="error-message">
            Error: {error}
          </div>
        ) : (
          selectedResult && (
            <div data-testid="selected-result">
              <h2>{selectedResult?.name}</h2>
              <p>Gender: {selectedResult?.gender}</p>
              <p>Height: {selectedResult?.height}</p>
              <p>Skin Color: {selectedResult?.skin_color}</p>
              <button onClick={closeDetail}>Close</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Detail;
