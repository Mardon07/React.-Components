import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <a href="/page/1">
        <h1>Star Wars Search</h1>
      </a>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
