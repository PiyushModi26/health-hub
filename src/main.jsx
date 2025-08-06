import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { MedicationProvider } from './contexts/MedicationContext.jsx'; // 1. Import
import App from './App.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MedicationProvider> {/* 2. Wrap the App */}
          <App />
        </MedicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);