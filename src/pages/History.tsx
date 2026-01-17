import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Trophy,
  CheckCircle,
  XCircle
} from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/');
    return null;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor((7200 - seconds) / 3600);
    const mins = Math.floor(((7200 - seconds) % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <h1 className="text-3xl font-display font-bold text-foreground">
            Quiz History
          </h1>
          <p className="text-muted-foreground mt-2">
            {user.quizHistory.length} quizzes completed
          </p>
        </motion.div>

        {/* Quiz History List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {user.quizHistory.length > 0 ? (
            [...user.quizHistory].reverse().map((quiz, index) => {
              const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
              return (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {quiz.chapter}
                      </h3>
                      <p className="text-muted-foreground">{quiz.subject}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-3 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {formatDate(quiz.completedAt)}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {formatTime(quiz.timeTaken)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-accent" />
                          <span className="text-foreground font-bold">{quiz.score}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Correct</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-destructive" />
                          <span className="text-foreground font-bold">{quiz.totalQuestions - quiz.score}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Wrong</p>
                      </div>
                      
                      <div className={`
                        px-4 py-2 rounded-lg font-bold
                        ${percentage >= 70 ? 'bg-accent/20 text-accent' : 
                          percentage >= 50 ? 'bg-primary/20 text-primary' : 
                          'bg-destructive/20 text-destructive'}
                      `}>
                        {percentage}%
                      </div>

                      {quiz.badge && (
                        <BadgeDisplay badge={quiz.badge} size="sm" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="glass-card rounded-xl p-12 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No quizzes yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start your first quiz to build your history!
              </p>
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Take a Quiz
              </Button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
    </div>
  );
};

export default History;
