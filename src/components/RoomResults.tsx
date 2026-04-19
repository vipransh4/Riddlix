import { useRoom } from "@/context/RoomContext";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Target } from "lucide-react";

export default function RoomResults({
  onExit,
}: {
  onExit: () => void;
}) {
  const { room } = useRoom();
  if (!room) return null;

  const players = room.players.map(p => {
    const r = p.result;
    const accuracy = r ? Math.round((r.score / r.total) * 100) : 0;

    return {
      email: p.email,
      score: r?.score || 0,
      total: r?.total || 0,
      accuracy,
      time: r?.timeTaken || 0,
      finished: !!r,
    };
  });

  const ranked = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    return a.time - b.time; 
  });

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="p-6 glass-card rounded-xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🏁 Final Ranking
      </h2>

      {ranked.map((p, i) => {
        const isWinner = i === 0 && p.finished;

        return (
          <div
            key={p.email}
            className={`p-3 mb-2 rounded-lg border ${
              isWinner
                ? "border-yellow-500 bg-yellow-500/10"
                : "border-border"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  #{i + 1} {p.email}
                </p>

                {p.finished ? (
                  <div className="flex gap-4 text-sm mt-1 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Accuracy: {p.accuracy}%
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(p.time)}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Waiting to finish...
                  </p>
                )}
              </div>

              <div className="text-right">
                {isWinner && (
                  <Trophy className="w-5 h-5 text-yellow-400 ml-auto" />
                )}

                {p.finished && (
                  <p className="font-bold">
                    {p.score} / {p.total}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <Button className="w-full mt-4" onClick={onExit}>
        Back to Dashboard
      </Button>
    </div>
  );
}
