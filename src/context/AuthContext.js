import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Simple in-memory storage for demo purposes
let storedUsers = {};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (loginData) => {
    const userData = storedUsers[loginData.email];
    if (userData && userData.password === loginData.password) {
      setUser(userData);
      return true;
    }
    return false;
  };

  const signup = (userData) => {
    storedUsers[userData.email] = userData;
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};