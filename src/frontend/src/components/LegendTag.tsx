import { Star } from "lucide-react";

interface LegendTagProps {
  size?: "sm" | "md";
}

export default function LegendTag({ size = "md" }: LegendTagProps) {
  const iconSize = size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3";
  const textSize = size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <span
      className={`legend-tag ${textSize}`}
      role="img"
      aria-label="Legend creator"
    >
      <Star className={`${iconSize} fill-current`} />
      LEGEND
    </span>
  );
}
