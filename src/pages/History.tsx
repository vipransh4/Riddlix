import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { History, Calendar, Target } from "lucide-react";

export default function HistoryPage() {
  const { user } = useAuth();
  const list = user?.quizHistory || [];

  const color = (p: number) =>
    p >= 80
      ? "text-green-400"
      : p >= 50
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold flex items-center gap-3 mb-6">
        <History className="text-primary" />
        Performance Timeline
      </h1>

      {list.length === 0 && (
        <div className="glass-card p-10 rounded-3xl text-center">
          <p>No quizzes attempted yet 🚀</p>
        </div>
      )}

      <div className="space-y-4">
        {list.slice().reverse().map((q: any, i: number) => {
          const percent = Math.round(
            (q.score / q.totalQuestions) * 100
          );

          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="
                relative rounded-3xl p-[2px]
                bg-gradient-to-r from-primary via-accent to-secondary
              "
            >
              <div className="bg-[#0F172A]/90 backdrop-blur rounded-3xl p-5">

                <div className="flex justify-between items-center">

                  <div>
                    <p className="font-semibold">
                      {q.subject} – {q.chapter}
                    </p>

                    <p className="text-xs text-muted-foreground flex gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(q.completedAt).toDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {q.totalQuestions} Qs
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className={`text-2xl font-bold ${color(percent)}`}>
                      {percent}%
                    </p>

                    <p className="text-xs opacity-70">
                      {q.score}/{q.totalQuestions}
                    </p>
                  </div>

                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
