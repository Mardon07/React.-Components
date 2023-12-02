import { createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ReactHookForm from './pages/ReactHookForm';
import UncontrollForm from './pages/UncontrollForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="form-1" element={<UncontrollForm />} />
      <Route path="form-2" element={<ReactHookForm />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
