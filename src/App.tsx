import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchApp from './Pages/SearchApp';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
