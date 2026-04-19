import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Subject, Chapter, Question, QuizState } from '@/types/quiz';
import { getQuestions } from '@/data/questions';

interface QuizContextType {
  selectedSubject: Subject | null;
  selectedChapter: Chapter | null;
  questions: Question[];
  quizState: QuizState;
  setSelectedSubject: (subject: Subject | null) => void;
  setSelectedChapter: (chapter: Chapter | null) => void;
  startQuiz: () => void;
  answerQuestion: (questionId: number, answerIndex: number) => void;
  goToQuestion: (questionIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitQuiz: () => number;
  updateTimeRemaining: (time: number) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialQuizState: QuizState = {
  currentQuestion: 0,
  answers: {},
  timeRemaining: 2 * 60 * 60, 
  isSubmitted: false,
};

export function QuizProvider({ children }: { children: ReactNode }) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>(initialQuizState);

  const startQuiz = () => {
    if (selectedSubject && selectedChapter) {
      const loadedQuestions = getQuestions(selectedSubject.id, selectedChapter.id);
      setQuestions(loadedQuestions);
      setQuizState({
        ...initialQuizState,
        timeRemaining: 2 * 60 * 60,
      });
    }
  };

  const answerQuestion = (questionId: number, answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndex,
      },
    }));
  };

  const goToQuestion = (questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: questionIndex,
      }));
    }
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    }
  };

  const previousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const submitQuiz = (): number => {
    let correctCount = 0;
    questions.forEach(question => {
      if (quizState.answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    setQuizState(prev => ({
      ...prev,
      isSubmitted: true,
    }));

    return correctCount;
  };

  const updateTimeRemaining = (time: number) => {
    setQuizState(prev => ({
      ...prev,
      timeRemaining: time,
    }));
  };

  const resetQuiz = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
    setQuestions([]);
    setQuizState(initialQuizState);
  };

  return (
    <QuizContext.Provider
      value={{
        selectedSubject,
        selectedChapter,
        questions,
        quizState,
        setSelectedSubject,
        setSelectedChapter,
        startQuiz,
        answerQuestion,
        goToQuestion,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        updateTimeRemaining,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
