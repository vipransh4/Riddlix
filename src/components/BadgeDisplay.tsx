import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/types/quiz';
import { Trophy, Star, Zap, Award, Crown, Medal } from 'lucide-react';

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

const badgeIcons: { [key: string]: React.ElementType } = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  crown: Crown,
  medal: Medal,
};

export function BadgeDisplay({ badge, size = 'md' }: BadgeDisplayProps) {
  const Icon = badgeIcons[badge.icon] || Star;
  
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <div
        className={`
          ${sizeClasses[size]} rounded-full
          bg-gradient-to-br from-primary to-secondary
          flex items-center justify-center
          shadow-lg glow-primary
        `}
      >
        <Icon className={`${iconSizes[size]} text-white`} />
      </div>
      <p className="text-sm font-medium text-foreground text-center">{badge.name}</p>
      {size === 'lg' && (
        <p className="text-xs text-muted-foreground text-center max-w-[150px]">
          {badge.description}
        </p>
      )}
    </motion.div>
  );
}

export function getBadgeForScore(score: number, total: number): Badge {
  const percentage = (score / total) * 100;

  if (percentage >= 90) {
    return {
      id: 'genius',
      name: 'Genius',
      icon: 'crown',
      description: 'Scored 90% or above! Exceptional performance!',
      earnedAt: new Date(),
    };
  } else if (percentage >= 80) {
    return {
      id: 'expert',
      name: 'Expert',
      icon: 'trophy',
      description: 'Scored 80% or above! Outstanding work!',
      earnedAt: new Date(),
    };
  } else if (percentage >= 70) {
    return {
      id: 'proficient',
      name: 'Proficient',
      icon: 'award',
      description: 'Scored 70% or above! Great job!',
      earnedAt: new Date(),
    };
  } else if (percentage >= 60) {
    return {
      id: 'intermediate',
      name: 'Intermediate',
      icon: 'star',
      description: 'Scored 60% or above! Good effort!',
      earnedAt: new Date(),
    };
  } else if (percentage >= 50) {
    return {
      id: 'beginner',
      name: 'Beginner',
      icon: 'zap',
      description: 'Scored 50% or above! Keep practicing!',
      earnedAt: new Date(),
    };
  } else {
    return {
      id: 'learner',
      name: 'Learner',
      icon: 'medal',
      description: 'Every quiz is a learning opportunity!',
      earnedAt: new Date(),
    };
  }
}
