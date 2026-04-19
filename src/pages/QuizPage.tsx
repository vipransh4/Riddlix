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
import QuizReview from "@/components/QuizReview";
import { QuizResult } from '@/types/quiz';
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

import { useRoom } from "@/context/RoomContext";
import { useAuth } from "@/context/AuthContext";
import RoomResults from "@/components/RoomResults";
let roomCtx;
try {
  roomCtx = useRoom();
} catch (e) {
  console.log("RoomProvider not ready");
}

const submitResult = roomCtx?.submitResult;
const room = roomCtx?.room;

const QuizPage = () => {
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();
  const navigate = useNavigate();

const { submitResult, room, leaveRoom } = useRoom();
  const { user, addQuizResult } = useAuth();

  const [showInstructions, setShowInstructions] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(7200);

  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

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
useEffect(() => {
  leaveRoom();
}, [subjectId, chapterId]);

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

const handleSubmitQuiz = () => {
  let correctCount = 0;

  questions.forEach(q => {
    if (answers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  setScore(correctCount);
  setShowResults(true);

  const baseResultData: QuizResult = {
    id: Date.now().toString(),
    subject: subject.name,
    chapter: chapter.name,
    score: correctCount,
    total: questions.length,
    email: user?.email || '',
    totalQuestions: questions.length,
    timeTaken: 7200 - timeRemaining,
    completedAt: new Date(),
    isMultiplayer: !!room,
    roomCode: room?.code,
  };

  if (room && user) {
    const multiplayerResultData: QuizResult = {
      ...baseResultData,
      players: room.players.map(p => ({
        email: p.email,
        score: p.result?.score || 0,
        accuracy: Math.round(
          ((p.result?.score || 0) / questions.length) * 100
        ),
        time: p.result?.timeTaken || 0,
      }))
    };
    
    submitResult(user.email, multiplayerResultData);
    addQuizResult(multiplayerResultData);
  } else if (user) {
    addQuizResult(baseResultData);
  }
};

if (reviewMode) {
  return (
    <QuizReview
      questions={questions}
      answers={answers}
      onExit={() => setReviewMode(false)}
    />
  );
}

if (showResults) {
  if (room) {
    return (
      <RoomResults
        onExit={() => navigate("/dashboard")}
      />
    );
  }

  return (
    <QuizResults
      score={score}
      totalQuestions={questions.length}
      timeTaken={timeRemaining}
      subject={subject.name}
      chapter={chapter.name}
      onRetry={handleRetry}
      onReview={() => setReviewMode(true)}
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
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20 -z-10" />

      <div className="max-w-7xl mx-auto">
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

        <div className="flex flex-col lg:flex-row gap-6">
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

            <motion.div className="flex flex-wrap gap-4 mt-6">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex-1 md:flex-none h-12"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestion === questions.length - 1}
                variant="outline"
                className="flex-1 md:flex-none h-12"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                onClick={() => setShowSubmitDialog(true)}
                className="flex-1 md:flex-none h-12 bg-gradient-to-r from-primary to-secondary"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Quiz
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {Object.keys(answers).length} out of {questions.length} questions.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitQuiz}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizPage;
