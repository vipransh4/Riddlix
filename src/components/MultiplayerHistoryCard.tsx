import { Users, Trophy, Target, Clock } from "lucide-react";

export default function MultiplayerHistoryCard({ r }: { r: any }) {
  return (
    <div className="glass-card p-4 rounded-xl mb-3 border border-primary/20">

      <div className="flex justify-between">
        <div>
          <p className="font-semibold">
            {r.subject} – {r.chapter}
          </p>

          <p className="text-xs text-muted-foreground">
            Room: {r.roomCode}
          </p>
        </div>

        <span className="text-xs bg-primary/20 px-2 py-1 rounded">
          Multiplayer
        </span>
      </div>

      <div className="flex gap-4 text-sm mt-2">
        <span className="flex items-center gap-1">
          <Target className="w-4 h-4" />
          {Math.round((r.score / r.total) * 100)}%
        </span>

        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {r.timeTaken}s
        </span>

        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {r.players?.length || 1}
        </span>
      </div>

      <div className="mt-3 text-sm">
        <p className="font-medium">Players:</p>

        {r.players?.map((p: any, i: number) => (
          <p key={i}>
            {i + 1}. {p.email} – {p.score} ({p.accuracy}%)
          </p>
        ))}
      </div>
    </div>
  );
}
