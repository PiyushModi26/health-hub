import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom'; // 1. Import Outlet
import { useAuth } from '../contexts/AuthContext';
import logoSrc from '../assets/logo.png';

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


const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet /> {/* 2. Use Outlet instead of children */}
      </main>
    </>
  );
};

export default MainLayout;