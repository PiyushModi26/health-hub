import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoSrc from '../assets/logo.png'; // Make sure your logo is in src/assets

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo">
        <img src={logoSrc} alt="Health Hub Logo" />
        <span>Health Hub</span>
      </div>
      <nav>
        <NavLink to="/dashboard">
          {({ isActive }) => <button className={`nav-link-button ${isActive ? 'active' : ''}`}>Dashboard</button>}
        </NavLink>
        <NavLink to="/medications">
           {({ isActive }) => <button className={`nav-link-button ${isActive ? 'active' : ''}`}>Medications</button>}
        </NavLink>
        <NavLink to="/reports">
           {({ isActive }) => <button className={`nav-link-button ${isActive ? 'active' : ''}`}>Reports</button>}
        </NavLink>
        <button onClick={handleLogout} className="nav-link-button logout-button">Logout</button>
      </nav>
    </header>
  );
};

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
    </>
  );
};

export default MainLayout;