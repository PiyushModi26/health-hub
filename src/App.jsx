// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!currentUser ? <AuthPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/*"
        element={
          currentUser ? (
            <MainLayout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                {/* Default route for logged-in users */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;