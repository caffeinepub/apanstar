import { useGetRemainingCoins } from "../hooks/use-backend";

interface CoinDisplayProps {
  large?: boolean;
}

export default function CoinDisplay({ large = false }: CoinDisplayProps) {
  const { data: coins, isLoading } = useGetRemainingCoins();
  const displayCoins = isLoading ? "—" : (coins ?? 50);

  if (large) {
    return (
      <div className="flex flex-col items-center gap-1" data-ocid="coins-large">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="coins">
            🪙
          </span>
          <span className="font-display font-bold text-3xl text-primary">
            {displayCoins}
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          Daily Coins Left
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1.5 bg-muted/60 border border-border rounded-lg px-2.5 py-1.5 text-sm font-bold text-primary"
      data-ocid="coins-display"
      title="Daily voting coins remaining"
    >
      <span className="text-base leading-none" role="img" aria-label="coins">
        🪙
      </span>
      <span>{displayCoins}</span>
    </div>
  );
}
