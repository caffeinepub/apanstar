import { Crown, Gem, Medal, Shield } from "lucide-react";
import type { Rank } from "../types";

const RANK_CONFIG: Record<
  Rank,
  { icon: typeof Medal; label: string; cls: string }
> = {
  Bronze: { icon: Medal, label: "Bronze", cls: "badge-bronze" },
  Silver: { icon: Shield, label: "Silver", cls: "badge-silver" },
  Gold: { icon: Crown, label: "Gold", cls: "badge-gold" },
  Platinum: { icon: Gem, label: "Platinum", cls: "badge-platinum" },
};

interface RankBadgeProps {
  rank: Rank;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function RankBadge({
  rank,
  size = "md",
  showLabel = true,
}: RankBadgeProps) {
  const config = RANK_CONFIG[rank];
  const Icon = config.icon;

  const iconSize =
    size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  const textSize =
    size === "sm" ? "text-[10px]" : size === "lg" ? "text-sm" : "text-xs";

  return (
    <span
      className={`${config.cls} animate-badge-pop`}
      role="img"
      aria-label={`${rank} rank`}
    >
      <Icon className={iconSize} />
      {showLabel && <span className={textSize}>{config.label}</span>}
    </span>
  );
}
