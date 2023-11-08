import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="search-app">
      <h1>Star Wars Search</h1>

      <main className="main-data-container">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
