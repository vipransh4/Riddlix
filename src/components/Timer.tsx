import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onTick: (time: number) => void;
}

export function Timer({ initialTime, onTimeUp, onTick }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        onTick(newTime);
        
        if (newTime <= 300 && !isWarning) {
          setIsWarning(true);
        }
        
        if (newTime <= 0) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp, onTick, isWarning]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <motion.div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl glass-card
        ${isWarning ? 'border-destructive animate-pulse' : 'border-primary/30'}
      `}
      animate={isWarning ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5, repeat: isWarning ? Infinity : 0 }}
    >
      <AnimatePresence mode="wait">
        {isWarning ? (
          <motion.div
            key="warning"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </motion.div>
        ) : (
          <motion.div
            key="clock"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Clock className="w-6 h-6 text-primary" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center gap-1 font-mono">
        <TimeUnit value={formatTime(hours)} isWarning={isWarning} />
        <span className={`text-xl font-bold ${isWarning ? 'text-destructive' : 'text-foreground'}`}>:</span>
        <TimeUnit value={formatTime(minutes)} isWarning={isWarning} />
        <span className={`text-xl font-bold ${isWarning ? 'text-destructive' : 'text-foreground'}`}>:</span>
        <TimeUnit value={formatTime(seconds)} isWarning={isWarning} />
      </div>
    </motion.div>
  );
}

function TimeUnit({ value, isWarning }: { value: string; isWarning: boolean }) {
  return (
    <div className={`
      px-2 py-1 rounded-md
      ${isWarning ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-foreground'}
    `}>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}
