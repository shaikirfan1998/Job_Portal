import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/AuthService'; // Adjust the path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const login = async (credentials) => {
  setLoading(true);
  setError(null); // Reset error state before trying to log in

  try {
    const user = await AuthService.login(credentials); // Assuming AuthService returns user data
    console.log(user);
    setCurrentUser(user); // Set the user in context after successful login
  } catch (err) {
    setError('Invalid email or password.'); // Set error message if login fails
    throw err; // Re-throw the error for further handling in the component
  } finally {
    setLoading(false); // Reset loading state
  }
};

  const logout = () => {
    setCurrentUser(null); // Implement your logout logic here
    AuthService.logout();
  };

  const value = { currentUser, login, logout, loading, error }; // Pass loading and error states

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
