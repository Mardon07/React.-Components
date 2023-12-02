import * as React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export interface IHomeProps {}

export default function Home() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="form-1">Form 1</NavLink>
            </li>
            <li>
              <NavLink to="form-2">Form 2</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
