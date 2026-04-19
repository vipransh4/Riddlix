import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { History, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BadgeDisplay } from "@/components/BadgeDisplay";

export default function DashboardExtras() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quizResults = user?.quizHistory ?? [];
  const badges = user?.badges ?? [];

  const accuracy =
    quizResults.length > 0
      ? Math.round(
          quizResults.reduce(
            (a: number, b: any) =>
            a + ((b?.score || 0) / (b?.totalQuestions || 1)) * 100,
            0
            )/ quizResults.length
        )
      : 0;

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-10">
     <motion.div
  whileHover={{ y: -6 }}
  className="
    relative rounded-3xl p-[2px]
    bg-gradient-to-r from-primary via-accent to-secondary
    animate-[pulse_4s_infinite]
    shadow-[0_0_25px_rgba(168,85,247,0.4)]
  "
>
  <div
    className="
      rounded-3xl p-6 h-full
      backdrop-blur-xl
      bg-[#0F172A]/80
      border border-white/10
    "
  >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg opacity-80">Achievements</h3>
            <Award className="w-6 h-6 text-primary" />
          </div>

{badges.length > 0 ? (
  <div className="flex flex-wrap gap-3">
    {badges.slice(-5).reverse().map((badge: any, i: number) => (
      <div
        key={badge.id || i}
        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      >
        <div className="flex items-center gap-2 mb-1">
          {badge.icon === "trophy" && <span className="text-yellow-500">🏆</span>}
          {badge.icon === "star" && <span className="text-yellow-400">⭐</span>}
          {badge.icon === "crown" && <span className="text-purple-500">👑</span>}
          {badge.icon === "medal" && <span className="text-blue-500">🎖️</span>}
          {badge.icon === "award" && <span className="text-green-500">🏅</span>}
          {badge.icon === "zap" && <span className="text-orange-500">⚡</span>}
          {!["trophy", "star", "crown", "medal", "award", "zap"].includes(badge.icon) && 
            <span className="text-primary">🎯</span>}
          <p className="text-sm font-semibold">{badge.name}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {badge.description}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(badge.earnedAt).toLocaleDateString()}
        </p>
      </div>
    ))}
  </div>
) : (
  <div className="py-4">
    <p className="text-lg font-semibold mb-1">
      No badges yet 🎯
    </p>
    <p className="text-sm text-muted-foreground">
      Complete quizzes to earn badges! Score higher to unlock rare badges.
    </p>
  </div>
)}
          <Button
            className="w-full mt-6 bg-primary/20 hover:bg-primary/30"
            onClick={() => navigate("/profile")}
          >
            Open Badges
          </Button>

        </div>
      </motion.div>

      <motion.div
          whileHover={{ y: -6 }}
          className="
            relative rounded-3xl p-[2px]
            bg-gradient-to-r from-primary via-accent to-secondary
            animate-[pulse_4s_infinite]
            shadow-[0_0_25px_rgba(168,85,247,0.4)]
          "
        >
          <div
            className="
              rounded-3xl p-6 h-full
              backdrop-blur-xl
              bg-[#0F172A]/80
              border border-white/10
            "
          >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg opacity-80">Performance</h3>
            <History className="w-6 h-6 text-accent" />
          </div>

          {quizResults.length > 0 ? (
                <div className="space-y-3">

                  {quizResults.slice(-3).reverse().map((q: any) => {

                    const percent = Math.round(
                      ((q?.score || 0) / (q?.totalQuestions || 1)) * 100
                    );

                    return (
                      <div
                        key={q.id}
                        className="
                          border border-white/10 rounded-xl p-3
                          hover:bg-white/5 transition-colors
                        "
                      >

                        <p className="font-medium">
                          {q.subject} – {q.chapter}
                        </p>

                      <div className="mt-2">
                        {q?.badge && typeof q.badge === "object" ? (
                          <div className="flex items-center gap-2">
                            <BadgeDisplay badge={q.badge} size="sm" />

                            <div>
                              <p className="text-sm font-semibold">
                                {q.badge.name}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {q.badge.description}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No badge earned
                          </span>
                        )}
                      </div>

                      </div>
                    );
                  })}

                </div>
              ) : (

            <>
              <p className="text-2xl font-semibold mb-2">
                No Quizzes Yet
              </p>

              <p className="text-sm text-muted-foreground">
                Learn at your pace. Improve every day. 🚀
              </p>
            </>
          )}

          <Button
            className="w-full mt-6 bg-accent/20 hover:bg-accent/30"
            onClick={() =>
              quizResults.length
                ? navigate("/history")
                : navigate("/dashboard")
            }
          >
            {quizResults.length
              ? "Open History"
              : "First take Quiz"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

        </div>
      </motion.div>

    </div>
  );
}
