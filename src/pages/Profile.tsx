import { useAuth } from "@/context/AuthContext";
import { BadgeDisplay } from "@/components/BadgeDisplay";
import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const badges = user?.badges || [];

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold flex items-center gap-3 mb-6"
      >
        <Award className="text-primary" />
        Achievement Vault
      </motion.h1>

      {badges.length === 0 && (
        <div className="glass-card p-10 rounded-3xl text-center">
          <Sparkles className="w-10 h-10 mx-auto text-primary mb-3" />
          <p className="text-lg">No badges yet</p>
          <p className="text-muted-foreground">
            Attempt quizzes to unlock rewards
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="
              relative rounded-3xl p-[2px]
              bg-gradient-to-r from-primary via-accent to-secondary
              animate-softGlow
            "
          >
            <div className="bg-[#0F172A]/90 backdrop-blur rounded-3xl p-6 text-center">
              <BadgeDisplay badge={badge} size="lg" />

              <p className="mt-3 font-semibold capitalize">
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                Mastery unlocked
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
