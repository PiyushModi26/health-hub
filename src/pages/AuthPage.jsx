import React, { useState } from 'react';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="auth-container">
      {isLoginView ? <Login toggleForm={toggleView} /> : <SignUp toggleForm={toggleView} />}
    </div>
  );
};

export default AuthPage;