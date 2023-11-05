import React from 'react';
import { SearchResult } from '../Pages/SearchApp';

export interface Detail {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
}

interface DetailProps {
  result: SearchResult;
  onClose: () => void;
}

const Detail: React.FC<DetailProps> = ({ result, onClose }) => {
  return (
    <div className="detail-container">
      <h2>{result.name}</h2>
      <p>Gender: {result.gender}</p>
      <p>Height: {result.height}</p>
      <p>Skin Color: {result.skin_color}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Detail;
