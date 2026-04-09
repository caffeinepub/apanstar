import { Heart, MessageCircle, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Rank } from "../types";
import LegendTag from "./LegendTag";
import RankBadge from "./RankBadge";

interface VideoCardProps {
  submission: {
    id: string;
    userName: string;
    userCity: string;
    userRank: Rank;
    userIsLegend: boolean;
    thumbnailUrl?: string;
    voteCount: bigint | number;
  };
  index?: number;
  onVote?: (submissionId: string) => void;
  canVote?: boolean;
}

function formatVotes(votes: bigint | number): string {
  const n = typeof votes === "bigint" ? Number(votes) : votes;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

const THUMB_GRADIENTS = [
  "linear-gradient(160deg, oklch(0.30 0.12 275), oklch(0.18 0.08 285))",
  "linear-gradient(160deg, oklch(0.28 0.15 20), oklch(0.18 0.10 10))",
  "linear-gradient(160deg, oklch(0.30 0.12 160), oklch(0.18 0.08 170))",
  "linear-gradient(160deg, oklch(0.32 0.14 65), oklch(0.20 0.10 75))",
  "linear-gradient(160deg, oklch(0.28 0.12 310), oklch(0.18 0.08 300))",
];

export default function VideoCard({
  submission,
  index = 0,
  onVote,
  canVote = true,
}: VideoCardProps) {
  const [voted, setVoted] = useState(false);
  const gradientIdx = submission.id.charCodeAt(0) % THUMB_GRADIENTS.length;

  function handleVote(e: React.MouseEvent) {
    e.stopPropagation();
    if (!voted && canVote && onVote) {
      setVoted(true);
      onVote(submission.id);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="card-elevated rounded-2xl overflow-hidden flex flex-col"
      data-ocid={`video-card-${submission.id}`}
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-[9/16] max-h-52 flex items-center justify-center overflow-hidden"
        style={{
          background: submission.thumbnailUrl
            ? undefined
            : THUMB_GRADIENTS[gradientIdx],
        }}
      >
        {submission.thumbnailUrl && (
          <img
            src={submission.thumbnailUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Play button */}
        <button
          type="button"
          className="relative w-12 h-12 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center border border-foreground/30 hover:bg-foreground/30 transition-smooth"
          aria-label="Play video"
          data-ocid={`play-btn-${submission.id}`}
        >
          <Play className="w-5 h-5 fill-current text-foreground ml-0.5" />
        </button>

        {/* Legend tag overlay */}
        {submission.userIsLegend && (
          <div className="absolute top-2 left-2">
            <LegendTag size="sm" />
          </div>
        )}

        {/* Creator info overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <p className="font-display font-bold text-sm text-foreground truncate drop-shadow">
            {submission.userName}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-2.5 flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <RankBadge rank={submission.userRank} size="sm" />
          <p className="text-[11px] text-muted-foreground mt-1 truncate">
            {submission.userCity}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-muted transition-smooth"
            aria-label="Like"
            data-ocid={`like-btn-${submission.id}`}
          >
            <Heart className="w-4 h-4 text-accent" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-muted transition-smooth"
            aria-label="Comment"
            data-ocid={`comment-btn-${submission.id}`}
          >
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={handleVote}
            disabled={voted || !canVote}
            className={`button-vote py-1 px-2.5 text-xs ${voted ? "opacity-60 cursor-not-allowed" : ""}`}
            aria-label="Cast vote"
            data-ocid={`vote-btn-${submission.id}`}
          >
            🪙 {formatVotes(submission.voteCount)}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
