import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { 
  User, 
  Mail, 
  Trophy, 
  Target, 
  Clock, 
  ArrowLeft,
  Calendar,
  Award
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/');
    return null;
  }

  const totalQuizzes = user.quizHistory.length;
  const averageScore = totalQuizzes > 0 
    ? Math.round(user.quizHistory.reduce((a, b) => a + (b.score / b.totalQuestions) * 100, 0) / totalQuizzes)
    : 0;
  const totalCorrect = user.quizHistory.reduce((a, b) => a + b.score, 0);
  const totalQuestions = user.quizHistory.reduce((a, b) => a + b.totalQuestions, 0);

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
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-display font-bold text-foreground">
                {user.name}
              </h1>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </p>
              <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mt-1">
                <Calendar className="w-4 h-4" />
                JEE Aspirant
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass-card rounded-xl p-5 text-center">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{user.badges.length}</p>
            <p className="text-sm text-muted-foreground">Badges</p>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalQuizzes}</p>
            <p className="text-sm text-muted-foreground">Quizzes</p>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <Award className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </div>
          <div className="glass-card rounded-xl p-5 text-center">
            <Clock className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalCorrect}/{totalQuestions}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Your Badges ({user.badges.length})
          </h2>
          <div className="glass-card rounded-xl p-6">
            {user.badges.length > 0 ? (
              <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                {user.badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <BadgeDisplay badge={badge} size="lg" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Complete quizzes to earn badges!
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
    </div>
  );
};

export default Profile;
