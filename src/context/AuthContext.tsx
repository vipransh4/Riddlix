import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, QuizResult, Badge } from '@/types/quiz';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;  logout: () => void;
  addQuizResult: (result: QuizResult) => void;
  addBadge: (badge: Badge) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);



  React.useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:4000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    const fixedUser = {
      ...data,
      quizHistory: data.quizHistory || [],
      badges: data.badges || [],
    };

    setUser(fixedUser);
    localStorage.setItem("currentUser", JSON.stringify(fixedUser));

    return true;
  } catch (err) {
    return false;
  }
};

    const signup = async (name: string, email: string, password: string): Promise<boolean> => {
  try {
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) return false;

    const data = await res.json();

    // ✅ FIX: ensure missing fields don't break app
    const fixedUser = {
      ...data,
      quizHistory: [],
      badges: [],
    };

    setUser(fixedUser);
    localStorage.setItem("currentUser", JSON.stringify(fixedUser));

    return true;
  } catch (err) {
    return false;
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const addQuizResult = (result: QuizResult) => {
    if (!user) return;

    const finalResult: QuizResult = {
      id: result.id || Date.now().toString(),
      subject: result.subject,
      chapter: result.chapter,
      score: result.score,
      total: result.total,
      email: result.email || user.email,
      totalQuestions: result.totalQuestions || result.total,
      timeTaken: result.timeTaken,
      completedAt: result.completedAt || new Date(),
      isMultiplayer: result.isMultiplayer || false,
      roomCode: result.roomCode,
      players: result.players,
      badge: result.badge,
      rank: result.rank,
    };

    const updatedUser = {
      ...user,
      quizHistory: [...user.quizHistory, finalResult],
    };

    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const addBadge = (badge: Badge) => {
    if (!user) return;


    const updatedUser = {
      ...user,
      badges: [...user.badges, badge],
    };

    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}