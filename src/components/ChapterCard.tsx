import React from 'react';
import { motion } from 'framer-motion';
import { Chapter, Subject } from '@/types/quiz';
import { BookOpen, ChevronRight } from 'lucide-react';

interface ChapterCardProps {
  chapter: Chapter;
  subject: Subject;
  onClick: () => void;
  index: number;
}

export function ChapterCard({ chapter, subject, onClick, index }: ChapterCardProps) {
  const colorClasses = {
    physics: 'border-physics/20 hover:border-physics/50 hover:bg-physics/10',
    chemistry: 'border-chemistry/20 hover:border-chemistry/50 hover:bg-chemistry/10',
    biology: 'border-biology/20 hover:border-biology/50 hover:bg-biology/10',
    maths: 'border-maths/20 hover:border-maths/50 hover:bg-maths/10',
  };

  const iconColors = {
    physics: 'text-physics',
    chemistry: 'text-chemistry',
    biology: 'text-biology',
    maths: 'text-maths',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      className={`
        group cursor-pointer rounded-xl p-5 border backdrop-blur-sm
        transition-all duration-300 glass-card
        ${colorClasses[subject.color]}
      `}
      whileHover={{ x: 10 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-muted/50 ${iconColors[subject.color]}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {chapter.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {chapter.questionCount} Questions
            </p>
          </div>
        </div>
        <ChevronRight className={`w-5 h-5 text-muted-foreground group-hover:${iconColors[subject.color]} transition-all group-hover:translate-x-1`} />
      </div>
    </motion.div>
  );
}
