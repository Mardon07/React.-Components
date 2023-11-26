import { useRouter } from 'next/router';
import React from 'react';
import { useGetDetailsQuery } from '../src/store/api/apiSlices';

const Detail: React.FC = () => {
  const router = useRouter();

  const {
    data: selectedResult,
    isLoading,
    error,
  } = useGetDetailsQuery(router?.query ? String(router.query.detailId) : '1');

  const closeDetail = () => {
    router.back();
  };

  return (
    <div
      data-testid="detail-container-block"
      className="detail-container-block"
    >
      <div data-testid="detail-container" className="detail-container">
        {isLoading ? (
          <div data-testid="loader" className="loader"></div>
        ) : error ? (
          <div data-testid="error-message" className="error-message">
            Error: {error && 'An error occurred'}
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
