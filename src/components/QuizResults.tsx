import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { BadgeDisplay, getBadgeForScore } from '@/components/BadgeDisplay';
import { Button } from '@/components/ui/button';
import { Trophy, Home, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  subject: string;
  chapter: string;
  onRetry: () => void;
  onReview?: () => void;
}

export const QuizResults = ({
  score,
  totalQuestions,
  timeTaken,
  subject,
  chapter,
  onRetry,
  onReview,
}: QuizResultsProps) => {
  const navigate = useNavigate();
  const { addQuizResult, addBadge, user } = useAuth();
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const badge = getBadgeForScore(score, totalQuestions);

  React.useEffect(() => {
    if (!user) return;

    const resultData = {
      id: Date.now().toString(),
      subject,
      chapter,
      score,
      total: totalQuestions,
      email: user.email,
      totalQuestions,
      timeTaken,
      completedAt: new Date(),
      badge: badge, 
    };

    addQuizResult(resultData);
    
    const userBadge = {
      id: `badge_${Date.now()}`,
      name: badge.name,
      icon: badge.icon,
      description: `Scored ${percentage}% in ${chapter} (${subject})`,
      earnedAt: new Date(),
    };
    
    addBadge(userBadge);
    localStorage.removeItem("rooms");
    localStorage.removeItem("currentRoom");
    sessionStorage.clear();
  }, []); 

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="glass-card rounded-3xl p-10 max-w-lg w-full text-center glow-primary">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <Trophy className="w-20 h-20 text-primary mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Quiz Completed!
        </h1>
        <p className="text-muted-foreground mb-8">
          {subject} - {chapter}
        </p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="relative w-48 h-48 mx-auto mb-8"
        >
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              className="fill-none stroke-muted stroke-[8]"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              className="fill-none stroke-primary stroke-[8]"
              strokeLinecap="round"
              strokeDasharray={553}
              initial={{ strokeDashoffset: 553 }}
              animate={{ strokeDashoffset: 553 - (553 * percentage) / 100 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-foreground">{percentage}%</span>
            <span className="text-muted-foreground">{score}/{totalQuestions}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground mb-4">You earned a badge!</p>
          <BadgeDisplay badge={badge} size="lg" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-xl p-4">
            <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{score}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalQuestions - score}</p>
            <p className="text-sm text-muted-foreground">Incorrect</p>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">
          Time taken: {formatTime(7200 - timeTaken)}
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => onReview && onReview()}
            className="h-12 bg-gradient-to-r from-primary to-secondary"
          >
            Review Answers
          </Button>

          <div className="flex gap-4">
            <Button
                onClick={() => {
                  localStorage.removeItem("rooms");
                  localStorage.removeItem("currentRoom");
                  sessionStorage.clear();
                  navigate('/dashboard');
                }}
                variant="outline"
                className="flex-1 h-12"
              >Dashboard
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("rooms");
                localStorage.removeItem("currentRoom");
                sessionStorage.clear();
                onRetry();
              }}
              className="flex-1 h-12"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};