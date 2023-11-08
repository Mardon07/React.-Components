import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Detail from './Pages/Detail';
import SearchApp from './Pages/SearchApp';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SearchApp />}>
      <Route path="page/:id">
        <Route path="detail/:id" element={<Detail />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
