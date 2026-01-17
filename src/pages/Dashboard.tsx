import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { subjects } from '@/data/subjects';
import { SubjectCard } from '@/components/SubjectCard';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Trophy, 
  History, 
  LogOut, 
  Sparkles,
  BookOpen,
  Target,
  Flame
} from 'lucide-react';
import { BadgeDisplay } from '@/components/BadgeDisplay';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { icon: BookOpen, label: 'Quizzes Taken', value: user?.quizHistory.length || 0, color: 'text-primary' },
    { icon: Trophy, label: 'Badges Earned', value: user?.badges.length || 0, color: 'text-secondary' },
    { icon: Target, label: 'Avg Score', value: user?.quizHistory.length ? Math.round(user.quizHistory.reduce((a, b) => a + (b.score / b.totalQuestions) * 100, 0) / user.quizHistory.length) + '%' : '0%', color: 'text-accent' },
    { icon: Flame, label: 'Streak', value: '0 days', color: 'text-destructive' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/profile')}
              variant="outline"
              className="border-border hover:bg-muted"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              onClick={() => navigate('/history')}
              variant="outline"
              className="border-border hover:bg-muted"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="glass-card rounded-xl p-5"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Badges Section */}
        {user?.badges && user.badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Your Badges
            </h2>
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-wrap gap-6">
                {user.badges.map((badge, index) => (
                  <BadgeDisplay key={index} badge={badge} size="md" />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Subject Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              Choose Your Subject
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={() => handleSubjectSelect(subject.id)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Recent Quizzes */}
        {user?.quizHistory && user.quizHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Recent Quizzes
            </h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="divide-y divide-border">
                {user.quizHistory.slice(-5).reverse().map((quiz, index) => (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{quiz.chapter}</p>
                      <p className="text-sm text-muted-foreground">{quiz.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{Math.round((quiz.score / quiz.totalQuestions) * 100)}%</p>
                      <p className="text-sm text-muted-foreground">{quiz.score}/{quiz.totalQuestions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
    </div>
  );
};

export default Dashboard;
