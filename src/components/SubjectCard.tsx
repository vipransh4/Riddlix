import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Subject } from '@/types/quiz';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
  index: number;
}

export function SubjectCard({ subject, onClick, index }: SubjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const colorClasses = {
    physics: 'subject-card-physics border-physics/30 hover:border-physics/60',
    chemistry: 'subject-card-chemistry border-chemistry/30 hover:border-chemistry/60',
    biology: 'subject-card-biology border-biology/30 hover:border-biology/60',
    maths: 'subject-card-maths border-maths/30 hover:border-maths/60',
  };

  const glowClasses = {
    physics: 'hover:shadow-[0_0_40px_hsl(var(--physics)/0.4)]',
    chemistry: 'hover:shadow-[0_0_40px_hsl(var(--chemistry)/0.4)]',
    biology: 'hover:shadow-[0_0_40px_hsl(var(--biology)/0.4)]',
    maths: 'hover:shadow-[0_0_40px_hsl(var(--maths)/0.4)]',
  };

  const iconColors = {
    physics: 'text-physics',
    chemistry: 'text-chemistry',
    biology: 'text-biology',
    maths: 'text-maths',
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        onClick={onClick}
        className={`
          relative cursor-pointer rounded-2xl p-8 border-2 backdrop-blur-xl
          transition-all duration-300 transform-style-3d
          ${colorClasses[subject.color]}
          ${glowClasses[subject.color]}
        `}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative z-10">
          <motion.div
            className="text-6xl mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {subject.icon}
          </motion.div>
          <h3 className={`text-2xl font-display font-bold mb-2 ${iconColors[subject.color]}`}>
            {subject.name}
          </h3>
          <p className="text-muted-foreground">
            {subject.chapters.length} Chapters Available
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full bg-current ${iconColors[subject.color]} animate-pulse`} />
            <span className="text-sm text-muted-foreground">Click to explore</span>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className={`absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br from-current to-transparent ${iconColors[subject.color]}`} />
      </motion.div>
    </motion.div>
  );
}
