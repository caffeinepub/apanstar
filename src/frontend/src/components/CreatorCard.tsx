import { Heart, MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { User } from "../types";
import LegendTag from "./LegendTag";
import RankBadge from "./RankBadge";

interface CreatorCardProps {
  creator:
    | User
    | {
        id: string;
        name: string;
        city: string;
        rank: User["rank"];
        isLegend: boolean;
        avatarUrl?: string;
        totalVotes: bigint | number;
      };
  index?: number;
  onClick?: () => void;
}

function formatVotes(votes: bigint | number): string {
  const n = typeof votes === "bigint" ? Number(votes) : votes;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// Deterministic gradient per creator id for avatar fallback
function avatarGradient(id: string) {
  const hues = [65, 275, 20, 160, 200, 330, 120];
  const h = hues[id.charCodeAt(0) % hues.length];
  return `linear-gradient(135deg, oklch(0.55 0.20 ${h}), oklch(0.35 0.15 ${h + 30}))`;
}

export default function CreatorCard({
  creator,
  index = 0,
  onClick,
}: CreatorCardProps) {
  const initials = creator.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="card-elevated rounded-2xl p-3 flex flex-col gap-2.5 cursor-pointer transition-smooth"
      data-ocid={`creator-card-${creator.id}`}
    >
      {/* Avatar */}
      <div className="relative mx-auto">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-display font-bold text-foreground overflow-hidden"
          style={{
            background: creator.avatarUrl
              ? undefined
              : avatarGradient(creator.id),
          }}
        >
          {creator.avatarUrl ? (
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span style={{ color: "oklch(0.96 0.01 60)" }}>{initials}</span>
          )}
        </div>
        {creator.isLegend && (
          <span className="absolute -top-1 -right-1">
            <LegendTag size="sm" />
          </span>
        )}
      </div>

      {/* Info */}
      <div className="text-center min-w-0">
        <p className="font-display font-bold text-sm text-foreground truncate">
          {creator.name}
        </p>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-0.5">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">{creator.city}</span>
        </div>
      </div>

      {/* Rank + Votes */}
      <div className="flex items-center justify-between gap-1">
        <RankBadge rank={creator.rank} size="sm" />
        <div className="flex items-center gap-1 text-xs font-bold text-accent">
          <Heart className="w-3 h-3 fill-current" />
          <span>{formatVotes(creator.totalVotes)}</span>
        </div>
      </div>
    </motion.div>
  );
}
