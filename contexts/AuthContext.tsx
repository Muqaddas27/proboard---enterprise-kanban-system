import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const USERS_KEY = 'proboard_users';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('proboard_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('proboard_user');
      }
    }
  }, []);

  const upsertUserRecord = (nextUser: User) => {
    const saved = localStorage.getItem(USERS_KEY);
    const parsed: User[] = saved ? JSON.parse(saved) : [];
    const existingIndex = parsed.findIndex(u => u.email.toLowerCase() === nextUser.email.toLowerCase());

    if (existingIndex >= 0) {
      parsed[existingIndex] = { ...parsed[existingIndex], ...nextUser };
    } else {
      parsed.push(nextUser);
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(parsed));
  };

  const getExistingUserRecord = (email: string) => {
    const saved = localStorage.getItem(USERS_KEY);
    if (!saved) return null;
    try {
      const parsed: User[] = JSON.parse(saved);
      return parsed.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    } catch {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    // Simulate API call with validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const existing = getExistingUserRecord(email);
    const newUser: User = existing || {
      id: Date.now().toString(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('proboard_user', JSON.stringify(newUser));
    upsertUserRecord(newUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('proboard_user', JSON.stringify(newUser));
    upsertUserRecord(newUser);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('proboard_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
