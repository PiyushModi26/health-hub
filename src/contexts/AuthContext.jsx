import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUserId = sessionStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === parseInt(loggedInUserId));
      if (user) {
        setCurrentUser(user);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem('loggedInUserId', user.id);
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('loggedInUserId');
  };

  const value = { currentUser, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};