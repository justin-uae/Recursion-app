// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { customerLogin, customerRegister, getCustomerData } from '../services/shopifyService';

// Types
interface User {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  createdAt?: string;
  displayName?: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('customerAccessToken');
    const storedUser = localStorage.getItem('customerData');

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await customerLogin(email, password);

      setAccessToken(response.accessToken);

      // Fetch full customer data
      try {
        const customerData = await getCustomerData(response.accessToken);
        const userData: User = {
          email: customerData.email,
          firstName: customerData.firstName,
          lastName: customerData.lastName,
          createdAt: customerData.createdAt,
          displayName: customerData.displayName
        };
        setUser(userData);
        localStorage.setItem('customerData', JSON.stringify(userData));
      } catch (error) {
        // Fallback if customer data fetch fails
        const userData: User = { email };
        setUser(userData);
        localStorage.setItem('customerData', JSON.stringify(userData));
      }

      localStorage.setItem('customerAccessToken', response.accessToken);

      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<AuthResponse> => {
    try {
      await customerRegister(email, password, firstName, lastName);

      // Auto-login after registration
      const loginResult = await login(email, password);
      return loginResult;
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };

  const logout = (): void => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('customerAccessToken');
    localStorage.removeItem('customerData');
  };

  const value: AuthContextType = {
    user,
    accessToken,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};