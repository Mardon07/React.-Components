import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../store';

const Home: React.FC = () => {
  const data = useSelector((state: RootState) => state.form.data);

  return (
    <div className="home-container">
      <div className="navigation">
        <h1>Main Page</h1>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Main</NavLink>
            </li>
            <li>
              <NavLink to="/uncontrolled">Uncontrolled Form</NavLink>
            </li>
            <li>
              <NavLink to="/reacthookform">React Hook Form</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {data.name && (
        <main className="main-content">
          <div className="info-item">Name: {data.name}</div>
          <div className="info-item">Age: {data.age}</div>
          <div className="info-item">Email: {data.email}</div>
          <div className="info-item">Password: {data.password}</div>
          <div className="info-item">Country: {data.country}</div>
          <div className="info-item">Gender: {data.gender}</div>
          <div className="info-item picture">
            <span>Picture:</span>
            <img src={`data:image/png;base64,${data.picture}`} alt="" />
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
