import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ReactHookForm from './pages/ReactHookForm';
import UncontrollForm from './pages/UncontrollForm';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'uncontrolled',
    element: <UncontrollForm />,
  },
  {
    path: 'reacthookform',
    element: <ReactHookForm />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
