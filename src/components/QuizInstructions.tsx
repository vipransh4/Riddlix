import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, FileQuestion, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface QuizInstructionsProps {
  subject: string;
  chapter: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function QuizInstructions({ subject, chapter, onAccept, onDecline }: QuizInstructionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Blurred background */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      
      {/* Instructions modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative glass-card rounded-2xl p-8 max-w-2xl w-full glow-primary"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            Quiz Instructions
          </h2>
          <p className="text-muted-foreground">
            {subject} - {chapter}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4 text-center">
            <FileQuestion className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">40</p>
            <p className="text-sm text-muted-foreground">Questions</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">2 Hours</p>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">JEE</p>
            <p className="text-sm text-muted-foreground">Difficulty</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-foreground">Rules & Guidelines:</h3>
          <ul className="space-y-3">
            {[
              'Each question has 4 options with only one correct answer',
              'You can navigate between questions using the question panel',
              'Timer starts immediately after accepting instructions',
              'Quiz auto-submits when time runs out',
              'You can submit early once you\'ve answered all questions',
              'Correct answers earn points, no negative marking',
            ].map((rule, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{rule}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onDecline}
            variant="outline"
            className="flex-1 h-12 border-border hover:bg-muted"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={onAccept}
            className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Start Quiz
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
