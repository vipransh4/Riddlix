import { useRoom } from "@/context/RoomContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Users, 
  UserPlus, 
  DoorOpen, 
  Trophy, 
  Clock,
  Play,
  CheckCircle,
  XCircle,
  Share2,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { subjects } from "@/data/subjects";

export default function RoomPanel({ quizId }: { quizId: string }) {
  const { createRoom, joinRoom, room, startRoom, leaveRoom, updateRoomDetails } = useRoom();
  const { user } = useAuth();
  const { subjectId, chapterId } = useParams();
  const navigate = useNavigate();
  
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  useEffect(() => {
    if (room && subjectId && chapterId && !room.quizDetails) {
      const subject = subjects.find(s => s.id === subjectId);
      const chapter = subject?.chapters.find(c => c.id === chapterId);
      
      if (subject && chapter) {
        updateRoomDetails({
          subject: subject.name,
          chapter: chapter.name,
          totalQuestions: 40 
        });
      }
    }
  }, [room, subjectId, chapterId, updateRoomDetails]);

  const handleCreateRoom = async () => {
    if (!user?.email) {
      setError("Please login first!");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const subject = subjects.find(s => s.id === subjectId);
      const chapter = subject?.chapters.find(c => c.id === chapterId);
      
      const roomCode = createRoom(
        quizId, 
        user.email,
        subject && chapter ? {
          subject: subject.name,
          chapter: chapter.name,
          totalQuestions: 40 
        } : undefined
      );
      
      setCode(roomCode);
      setSuccess(`Room created successfully! Code: ${roomCode} (copied to clipboard)`);
    } catch (err) {
      setError("Failed to create room. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!user?.email) {
      setError("Please login first!");
      return;
    }
    
    if (!code.trim()) {
      setError("Please enter a room code!");
      return;
    }

    if (code.length !== 6) {
      setError("Room code must be 6 characters!");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const success = joinRoom(code.toUpperCase(), user.email);
      if (success) {
        setSuccess(`Successfully joined room ${code}!`);
      } else {
        setError("Failed to join room. Please check the code and try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    const codeToCopy = room?.code || code;
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy);
      setSuccess(`Room code ${codeToCopy} copied to clipboard!`);
    }
  };

  const handleShareRoom = () => {
    if (!room?.code) return;
    
    const shareText = `Join my quiz room! Code: ${room.code}\nSubject: ${room.quizDetails?.subject || 'Quiz'}\nChapter: ${room.quizDetails?.chapter || 'General'}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Join My Quiz Room',
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      setSuccess('Room details copied to clipboard!');
    }
  };

  const handleStartRoom = () => {
    if (!room) return;
    
    if (room.hostEmail !== user?.email) {
      setError("Only the host can start the quiz!");
      return;
    }
    
    if (room.players.length < 1) {
      setError("Need at least 1 player to start!");
      return;
    }
    
    if (confirm(`Start the quiz for ${room.players.length} player(s)?`)) {
      startRoom();
      setSuccess("Quiz started! All players can now begin.");
      
      setTimeout(() => {
        if (subjectId && chapterId) {
          navigate(`/quiz/${subjectId}/${chapterId}`);
        }
      }, 1000);
    }
  };

  const handleLeaveRoom = () => {
    if (!room) return;
    
    if (confirm("Are you sure you want to leave this room?")) {
      leaveRoom();
      setCode("");
      setSuccess("Left the room successfully.");
    }
  };

  const handleStartQuiz = () => {
    if (!room || room.status !== "started") return;
    
    if (subjectId && chapterId) {
      navigate(`/quiz/${subjectId}/${chapterId}`);
    }
  };

  if (room) {
    const isHost = room.hostEmail === user?.email;
    const submittedPlayers = room.players.filter(p => p.result).length;
    const totalPlayers = room.players.length;
    const canStartQuiz = room.status === "started";
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 my-6 border border-primary/20 shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Multiplayer Room
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-mono bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">
                {room.code}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyCode}
                  className="h-8"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShareRoom}
                  className="h-8"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
            {room.quizDetails && (
              <p className="text-sm text-muted-foreground mt-2">
                {room.quizDetails.subject} - {room.quizDetails.chapter} ({room.quizDetails.totalQuestions} questions)
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {canStartQuiz ? (
              <Button
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Quiz
              </Button>
            ) : isHost && room.status === "waiting" ? (
              <Button
                onClick={handleStartRoom}
                className="bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Room
              </Button>
            ) : (
              <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm font-bold">
                {room.status === "waiting" ? "Waiting..." : "In Progress"}
              </div>
            )}
            <Button
              variant="destructive"
              onClick={handleLeaveRoom}
            >
              <DoorOpen className="w-4 h-4 mr-2" />
              Leave
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <p className="text-destructive text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {error}
              </p>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <p className="text-green-500 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {success}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Players ({totalPlayers})
            </h4>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Players ({totalPlayers})
              </h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (confirm("Reset this room for new quiz?")) {
                      leaveRoom();
                    }
                  }}
                  className="h-7 text-xs"
                >
                  Reset Room
                </Button>
              </div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {room.players.map((player, index) => (
                <motion.div
                  key={player.email}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.email === user?.email 
                      ? "bg-primary/10 border border-primary/20" 
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      {player.email === room.hostEmail && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-[10px]">👑</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {player.email.split('@')[0]}
                        {player.email === user?.email && " (You)"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {player.result 
                          ? `Score: ${player.result.score}/${player.result.total}` 
                          : room.status === "started" ? "Taking quiz..." : "Waiting..."}
                      </p>
                    </div>
                  </div>
                  {player.result ? (
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold">
                        {Math.round((player.result.score / player.result.total) * 100)}%
                      </span>
                    </div>
                  ) : (
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Room Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Status
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  room.status === "waiting" 
                    ? "bg-blue-500/20 text-blue-500" 
                    : room.status === "started"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-purple-500/20 text-purple-500"
                }`}>
                  {room.status === "waiting" ? "Waiting" : 
                   room.status === "started" ? "In Progress" : "Completed"}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Players Ready</span>
                <span className="font-bold">
                  {submittedPlayers}/{totalPlayers}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span>Room Created</span>
                <span className="text-sm">
                  {new Date(room.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              {isHost && room.status === "waiting" && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-sm text-yellow-600">
                    ⚠️ You're the host. Share the room code <strong className="font-mono">{room.code}</strong> with friends.
                  </p>
                  <p className="text-xs mt-1">
                    Minimum 1 player required to start.
                  </p>
                </div>
              )}
              
              {!isHost && room.status === "waiting" && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-500">
                    👑 Host: {room.hostEmail.split('@')[0]}
                  </p>
                  <p className="text-xs mt-1">
                    Waiting for host to start the quiz...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 my-6 border border-border shadow-lg"
    >
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Play with Friends
      </h3>
      <p className="text-muted-foreground mb-6">
        Create a room or join an existing one to compete with friends in real-time!
      </p>

      {/* Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-destructive text-sm flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {error}
            </p>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <p className="text-green-500 text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {success}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Create Room */}
        <div className="flex-1">
          <Button
            onClick={handleCreateRoom}
            disabled={isLoading || !user}
            className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            {isLoading ? "Creating..." : "Create New Room"}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Create a 6-digit code to share with friends
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-8 md:h-8 md:w-px bg-border"></div>
          <span className="mx-4 text-muted-foreground text-sm">OR</span>
          <div className="h-px w-8 md:h-8 md:w-px bg-border"></div>
        </div>

        {/* Join Room */}
        <div className="flex-1">
          <div className="flex gap-2">
            <Input
              className="h-14 text-lg font-mono text-center"
              value={code}
              onChange={(e) => {
                const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                setCode(val.slice(0, 6));
              }}
              placeholder="ABCDEF"
              maxLength={6}
              disabled={isLoading || !user}
            />
            <Button
              onClick={handleJoinRoom}
              disabled={isLoading || !user || code.length !== 6}
              variant="outline"
              className="h-14 min-w-20"
            >
              {isLoading ? "Joining..." : "Join"}
            </Button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {code 
                ? `Entered code: ${code}` 
                : "Enter 6-character room code"}
            </p>
            {code && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyCode}
                className="h-6"
              >
                <Copy className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          How to Play:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">1</span>
              </div>
              <p className="text-sm">Create a room or join with a 6-digit code</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">2</span>
              </div>
              <p className="text-sm">Share the room code with friends</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">3</span>
              </div>
              <p className="text-sm">Host starts the quiz when everyone's ready</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">4</span>
              </div>
              <p className="text-sm">Compete in real-time and see live scores!</p>
            </div>
          </div>
        </div>
      </div>

      {!user && (
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm text-yellow-600">
            ⚠️ You need to be logged in to use multiplayer features.
          </p>
        </div>
      )}
    </motion.div>
  );
}