
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
        <img src={logoSrc} alt="Health Hub Logo" style={{ height: '40px', marginRight: '10px' }} />
        <span>Health Hub</span>
      </div>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <button>Dashboard</button>
        </NavLink>
        <NavLink to="/medications" className={({ isActive }) => isActive ? 'active' : ''}>
          <button>Medications</button>
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