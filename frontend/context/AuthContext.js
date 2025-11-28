// /frontend/context/AuthContext.js
'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

// 1. Initialize the Context
const AuthContext = createContext();

// 2. Define the Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // Stores { email, isAdmin, _id }
  const [token, setToken] = useState(null); // Stores the JWT
  const router = useRouter();

  // Base URL for the Express API
  const AUTH_URL = 'http://localhost:5000/api/auth';

  // --- Load token from storage on mount ---
  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  //register function
  const register = async (email, password) => {
    try {
      const response = await fetch(`${AUTH_URL}/admin-register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Only sending email and password for a simple registration
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Registration usually also logs the user in automatically
        setToken(data.token);
        // Note: For registration, we assume the user is NOT an admin by default (isAdmin: false)
        setUser({ _id: data._id, email: data.email, isAdmin: data.isAdmin || false });

        // Save to Local Storage
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user', JSON.stringify({ _id: data._id, email: data.email, isAdmin: data.isAdmin || false }));

        // Redirect all new users to the home page
        router.push('/');
        return { success: true };
      } else {
        // Failure: Return the specific error message from the backend (e.g., "User already exists")
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (error) {
      console.error('API call error during registration:', error);
      return { success: false, message: 'Network error or server unavailable.' };
    }
  };
  // --- Login Function ---
  const login = async (email, password) => {
    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Store data and token
        setToken(data.token);
        setUser({ _id: data._id, email: data.email, isAdmin: data.isAdmin });

        // Save to Local Storage
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user', JSON.stringify({ _id: data._id, email: data.email, isAdmin: data.isAdmin }));

        // Redirect admin to the protected dashboard
        if (data.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/'); // Or handle non-admin users differently
        }
        return true;
      } else {
        // Failure
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('API call error during login:', error);
      return false;
    }
  };

  // --- Logout Function ---
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    router.push('/'); // Redirect to home page
  };

  const contextValue = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token, // True if a token exists
    isAdmin: user ? user.isAdmin : false,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);