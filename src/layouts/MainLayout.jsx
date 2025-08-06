// src/layouts/MainLayout.jsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Re-defining the Header here as a component for the layout
const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo"><span role="img" aria-label="health icon" className="logo-icon">❤️‍🩹</span> Health Hub</div>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <button>Dashboard</button>
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
          <button>Reports</button>
        </NavLink>
        <button onClick={handleLogout}>Logout</button>
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