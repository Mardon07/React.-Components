import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Detail from './Pages/Detail';
import RootLayout from './Pages/RootLayout';
import SearchApp from './Pages/SearchApp';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/page" element={<RootLayout />}>
      <Route path=":id" element={<SearchApp />}>
        <Route path="detail/:id" element={<Detail />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
