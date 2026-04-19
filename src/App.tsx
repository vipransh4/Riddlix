import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubjectPage from "./pages/SubjectPage";
import QuizPage from "./pages/QuizPage";
import Profile from "./pages/Profile";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import { RoomProvider } from "./context/RoomContext";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/Riddlix" element={<Navigate to="/" replace />} />
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/subject/:subjectId" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/quiz/:subjectId/:chapterId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter
      basename="/Riddlix"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >

      <AuthProvider>
        <RoomProvider>
          <QuizProvider>

            <TooltipProvider>
              <Toaster />
              <Sonner />

              <AppRoutes />

            </TooltipProvider>

          </QuizProvider>
        </RoomProvider>
      </AuthProvider>

    </BrowserRouter>
  </QueryClientProvider>
);


export default App;
