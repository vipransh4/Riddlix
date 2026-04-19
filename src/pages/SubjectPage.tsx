import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { subjects } from '@/data/subjects';
import { ChapterCard } from '@/components/ChapterCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Subject not found</p>
      </div>
    );
  }

  const handleChapterSelect = (chapterId: string) => {
    navigate(`/quiz/${subjectId}/${chapterId}`);
  };

  const colorClasses = {
    physics: 'text-physics',
    chemistry: 'text-chemistry',
    biology: 'text-biology',
    maths: 'text-maths',
  };

  const bgClasses = {
    physics: 'bg-physics/10',
    chemistry: 'bg-chemistry/10',
    biology: 'bg-biology/10',
    maths: 'bg-maths/10',
  };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${bgClasses[subject.color]} blur-3xl`}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full ${bgClasses[subject.color]} blur-3xl`}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
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

          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-6">
              <motion.div
                className={`text-7xl`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {subject.icon}
              </motion.div>
              <div>
                <h1 className={`text-4xl font-display font-bold ${colorClasses[subject.color]}`}>
                  {subject.name}
                </h1>
                <p className="text-muted-foreground mt-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {subject.chapters.length} Chapters Available
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">
            Select a Chapter
          </h2>
          <div className="space-y-3">
            {subject.chapters.map((chapter, index) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                subject={subject}
                onClick={() => handleChapterSelect(chapter.id)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
    </div>
  );
};

export default SubjectPage;
