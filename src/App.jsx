import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import MedicationsPage from './pages/MedicationsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

// A wrapper component to protect routes that require a user to be logged in
const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  // If a user is logged in, render the MainLayout (Header + page content).
  // Otherwise, redirect them to the login page.
  return currentUser ? <MainLayout /> : <Navigate to="/login" />;
};


function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* If the user is already logged in, the login page redirects to the dashboard */}
      <Route
        path="/login"
        element={!currentUser ? <AuthPage /> : <Navigate to="/dashboard" />}
      />

      {/* All protected routes are children of the ProtectedRoute wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/medications" element={<MedicationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        
        {/* Any other unknown URL will redirect to the dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

export default App;