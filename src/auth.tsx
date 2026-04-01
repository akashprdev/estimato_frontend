import React, { createContext, useContext, useState } from 'react';
import type { SignInResponse, User } from './services/mutation/auth/login';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: SignInResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('auth-user');
  return stored ? JSON.parse(stored) : null;
}

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;

  return localStorage.getItem('auth-token');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser);
  const [isLoading] = useState(false);

  const login = (user: SignInResponse) => {
    setUser(user.user);
    localStorage.setItem('auth-user', JSON.stringify(user.user));
    localStorage.setItem('auth-token', user.token);
  };

  const logout = () => {
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const value: AuthState = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

const isAuthenticated = () => {
  const user = getStoredUser();
  const token = getAccessToken();

  return !!user && !!token;
};

export const auth = {
  getAccessToken: getAccessToken,
  isAuthenticated: isAuthenticated,
  user: getStoredUser,
};
