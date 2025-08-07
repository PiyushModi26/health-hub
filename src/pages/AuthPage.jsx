import React, { useState } from 'react';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import './AuthPage.css';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  return (
    <div className="auth-page-container">
      {/* This is the "Logging In..." alert, hidden by default */}
      {isLoggingIn && (
        <div className="logging-in-overlay">
          <div className="spinner"></div>
          <p>Logging In...</p>
        </div>
      )}

      <div className={`auth-wrapper ${!isLoginView ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className="auth-form-section">
          <SignUp />
        </div>
        
        {/* Login Form */}
        <div className="auth-form-section">
          <Login setIsLoggingIn={setIsLoggingIn} />
        </div>

        {/* Sliding Overlay */}
        <div className="auth-overlay-section">
          <div className="auth-overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button onClick={() => setIsLoginView(true)}>Sign Up</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button onClick={() => setIsLoginView(false)}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;