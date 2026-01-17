export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  badges: Badge[];
  quizHistory: QuizResult[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: 'physics' | 'chemistry' | 'biology' | 'maths';
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
  questionCount: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  chapter: string;
}

export interface QuizResult {
  id: string;
  subject: string;
  chapter: string;
  score: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt: Date;
  badge?: Badge;
}

export interface QuizState {
  currentQuestion: number;
  answers: { [key: number]: number };
  timeRemaining: number;
  isSubmitted: boolean;
}
