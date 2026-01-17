import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { subjects } from '@/data/subjects';
import { getQuestions } from '@/data/questions';
import { Question } from '@/types/quiz';
import { QuizInstructions } from '@/components/QuizInstructions';
import { Timer } from '@/components/Timer';
import { QuestionNavigation } from '@/components/QuestionNavigation';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { QuizResults } from '@/components/QuizResults';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Send, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuizPage = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();
  const navigate = useNavigate();
  
  const [showInstructions, setShowInstructions] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(7200);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  const subject = subjects.find(s => s.id === subjectId);
  const chapter = subject?.chapters.find(c => c.id === chapterId);

  useEffect(() => {
    if (subjectId && chapterId) {
      const loadedQuestions = getQuestions(subjectId, chapterId);
      setQuestions(loadedQuestions);
    }
  }, [subjectId, chapterId]);

  if (!subject || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Quiz not found</p>
      </div>
    );
  }

  const handleAcceptInstructions = () => {
    setShowInstructions(false);
    setQuizStarted(true);
  };

  const handleDeclineInstructions = () => {
    navigate(`/subject/${subjectId}`);
  };

  const handleAnswerQuestion = (answerIndex: number) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  const handleTimeUp = () => {
    handleSubmitQuiz();
  };

  const handleRetry = () => {
    setShowResults(false);
    setShowInstructions(true);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(7200);
    setScore(0);
  };

  if (showResults) {
    return (
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        timeTaken={timeRemaining}
        subject={subject.name}
        chapter={chapter.name}
        onRetry={handleRetry}
      />
    );
  }

  if (showInstructions) {
    return (
      <QuizInstructions
        subject={subject.name}
        chapter={chapter.name}
        onAccept={handleAcceptInstructions}
        onDecline={handleDeclineInstructions}
      />
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 lg:p-6 relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header with Timer */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {chapter.name}
            </h1>
            <p className="text-muted-foreground">{subject.name}</p>
          </div>
          <Timer
            initialTime={7200}
            onTimeUp={handleTimeUp}
            onTick={setTimeRemaining}
          />
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Question Navigation (Left Sidebar) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <QuestionNavigation
              totalQuestions={questions.length}
              currentQuestion={currentQuestion}
              answeredQuestions={answers}
              onQuestionClick={handleGoToQuestion}
            />
          </motion.div>

          {/* Question Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {currentQ && (
                <QuestionDisplay
                  key={currentQ.id}
                  question={currentQ}
                  selectedAnswer={answers[currentQ.id]}
                  onSelectAnswer={handleAnswerQuestion}
                  questionNumber={currentQuestion + 1}
                />
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-6"
            >
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex-1 md:flex-none h-12 border-border hover:bg-muted disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === questions.length - 1}
                variant="outline"
                className="flex-1 md:flex-none h-12 border-border hover:bg-muted disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                onClick={() => setShowSubmitDialog(true)}
                className="flex-1 md:flex-none h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Quiz
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent className="glass-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Submit Quiz?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              You have answered {Object.keys(answers).length} out of {questions.length} questions.
              {Object.keys(answers).length < questions.length && (
                <span className="block mt-2 text-destructive">
                  Warning: You have {questions.length - Object.keys(answers).length} unanswered questions!
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border hover:bg-muted">
              Continue Quiz
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmitQuiz}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizPage;
