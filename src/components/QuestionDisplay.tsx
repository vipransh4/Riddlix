import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '@/types/quiz';

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: number | undefined;
  onSelectAnswer: (answerIndex: number) => void;
  questionNumber: number;
}

export function QuestionDisplay({
  question,
  selectedAnswer,
  onSelectAnswer,
  questionNumber,
}: QuestionDisplayProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass-card rounded-2xl p-8"
    >
      <div className="mb-6">
        <span className="text-sm text-primary font-medium">
          Question {questionNumber}
        </span>
        <h2 className="text-xl font-semibold text-foreground mt-2 leading-relaxed">
          {question.question}
        </h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`
              w-full text-left p-5 rounded-xl border-2 transition-all duration-200
              ${
                selectedAnswer === index
                  ? 'border-primary bg-primary/10 text-foreground'
                  : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-muted/50'
              }
            `}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                  ${
                    selectedAnswer === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
