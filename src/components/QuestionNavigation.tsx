import React from 'react';
import { motion } from 'framer-motion';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: { [key: number]: number };
  onQuestionClick: (index: number) => void;
}

export function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionClick,
}: QuestionNavigationProps) {
  const getQuestionStatus = (index: number) => {
    const questionId = index + 1;
    if (currentQuestion === index) return 'current';
    if (answeredQuestions[questionId] !== undefined) return 'answered';
    if (index < currentQuestion && answeredQuestions[questionId] === undefined)
      return 'skipped';
    return 'unanswered';
  };


  const statusClasses = {
    current: 'bg-primary text-primary-foreground border-primary',
    answered: 'bg-green-600 text-white border-green-700',
    skipped: 'bg-red-600 text-white border-red-700',
    unanswered: 'bg-muted/50 text-muted-foreground border-border hover:border-primary/50',
  };


  return (
    <div className="glass-card rounded-xl p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Questions</h3>
      
      <div className="grid grid-cols-5 gap-2 max-h-[400px] overflow-y-auto pr-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const status = getQuestionStatus(index);
          return (
            <motion.button
              key={index}
              onClick={() => onQuestionClick(index)}
              className={`
                w-10 h-10 rounded-lg border text-sm font-medium
                transition-all duration-200
                ${statusClasses[status]}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
        <div className="w-4 h-4 rounded bg-green-600 border border-green-700" />
          <span className="text-muted-foreground">Answered</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-red-600 border border-red-700" />
          <span className="text-muted-foreground">Skipped</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded bg-muted/50 border border-border" />
          <span className="text-muted-foreground">Unanswered</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Answered: {Object.keys(answeredQuestions).length} / {totalQuestions}
        </p>
      </div>
    </div>
  );
}
