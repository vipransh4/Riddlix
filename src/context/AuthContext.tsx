import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, QuizResult, Badge } from '@/types/quiz';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addQuizResult: (result: QuizResult) => void;
  addBadge: (badge: Badge) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  id: '1',
  name: 'Student',
  email: '',
  badges: [],
  quizHistory: [],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in real app, this would call an API
    if (email && password) {
      setUser({
        ...defaultUser,
        email,
        name: email.split('@')[0],
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addQuizResult = (result: QuizResult) => {
    if (user) {
      setUser({
        ...user,
        quizHistory: [...user.quizHistory, result],
      });
    }
  };

  const addBadge = (badge: Badge) => {
    if (user) {
      setUser({
        ...user,
        badges: [...user.badges, badge],
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        addQuizResult,
        addBadge,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
