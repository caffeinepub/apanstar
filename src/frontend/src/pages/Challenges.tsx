import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRight,
  Code2,
  Crown,
  Gamepad2,
  Lock,
  Mic2,
  Music2,
  Play,
  Send,
  Smile,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CoinDisplay from "../components/CoinDisplay";
import LegendTag from "../components/LegendTag";
import RankBadge from "../components/RankBadge";
import {
  useCastVote,
  useGetChallengeLeaderboard,
  useGetMyProfile,
  useGetRemainingCoins,
  useListChallenges,
} from "../hooks/use-backend";
import type { ChallengeCategory, Rank, VideoEffect } from "../types";

/* ── Category Config ───────────────────────────────────────────── */
const CATEGORY_ICONS: Record<ChallengeCategory, typeof Gamepad2> = {
  Gaming: Gamepad2,
  Singing: Music2,
  Mimicry: Smile,
  Coding: Code2,
  Cooking: UtensilsCrossed,
  Dance: Mic2,
  Comedy: Smile,
};

const CATEGORY_COLORS: Record<ChallengeCategory, string> = {
  Gaming: "bg-secondary/30 text-secondary-foreground border-secondary/40",
  Singing: "bg-accent/20 text-accent border-accent/40",
  Mimicry: "bg-primary/20 text-primary border-primary/40",
  Coding: "bg-muted text-muted-foreground border-border",
  Cooking: "bg-chart-5/20 text-foreground border-chart-5/30",
  Dance: "bg-accent/20 text-accent border-accent/40",
  Comedy: "bg-primary/20 text-primary border-primary/40",
};

/* ── AI Effects ─────────────────────────────────────────────────── */
const EFFECTS: { id: VideoEffect; icon: string; desc: string }[] = [
  {
    id: "Professional Edit",
    icon: "🎬",
    desc: "Clean cuts, smooth transitions",
  },
  { id: "Cartoon Style", icon: "🎨", desc: "Bold outlines, vivid colors" },
  { id: "Cinematic", icon: "🎞️", desc: "Wide bars, color grading" },
];

/* ── Sample data ────────────────────────────────────────────────── */
interface ChallengeData {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  city: string;
  startTime: bigint;
  endTime: bigint;
  prizeDescription: string;
  isActive: boolean;
  isFinalized: boolean;
}

interface LeaderboardEntry {
  rank: number;
  submissionId: string;
  userId: string;
  userName: string;
  userCity: string;
  userRank: Rank;
  userIsLegend: boolean;
  voteCount: bigint;
}

const SAMPLE_CHALLENGES: ChallengeData[] = [
  {
    id: "c1",
    title: "Mumbai Dance Battle",
    description:
      "Show off your best dance moves in a 30-second video. Any style welcome — Bollywood, hip-hop, freestyle! Judges will rank by creativity, energy, and crowd votes.",
    category: "Dance",
    city: "Mumbai",
    startTime: BigInt(Date.now() - 86400000),
    endTime: BigInt(Date.now() + 2 * 86400000),
    prizeDescription: "Legend tag + 500 coins + brand spotlight",
    isActive: true,
    isFinalized: false,
  },
  {
    id: "c2",
    title: "Comedy Mimicry Slam",
    description:
      "Mimic your favourite Bollywood star or politician. Keep it clean and hilarious. Best impression wins the crowd!",
    category: "Mimicry",
    city: "Delhi",
    startTime: BigInt(Date.now() - 3 * 86400000),
    endTime: BigInt(Date.now() + 86400000),
    prizeDescription: "Legend tag + 300 coins",
    isActive: true,
    isFinalized: false,
  },
  {
    id: "c3",
    title: "Singing Star – Pune",
    description:
      "Perform any Hindi song (original or cover) and get the city voting for you. Studio or bedroom — talent wins.",
    category: "Singing",
    city: "Pune",
    startTime: BigInt(Date.now() - 10 * 86400000),
    endTime: BigInt(Date.now() - 2 * 86400000),
    prizeDescription: "Legend tag + recording session",
    isActive: false,
    isFinalized: true,
  },
  {
    id: "c4",
    title: "Coding Speed Run",
    description:
      "Solve the live coding problem fastest on camera. Share your screen and thought process for the community.",
    category: "Coding",
    city: "Bangalore",
    startTime: BigInt(Date.now() - 7 * 86400000),
    endTime: BigInt(Date.now() - 86400000),
    prizeDescription: "Legend tag + internship referral",
    isActive: false,
    isFinalized: true,
  },
];

const SAMPLE_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    submissionId: "s1",
    userId: "u1",
    userName: "Nisha_DanceStar",
    userCity: "Mumbai",
    userRank: "Gold",
    userIsLegend: true,
    voteCount: BigInt(2540),
  },
  {
    rank: 2,
    submissionId: "s2",
    userId: "u2",
    userName: "StreetRapper_AJ",
    userCity: "Mumbai",
    userRank: "Silver",
    userIsLegend: false,
    voteCount: BigInt(1520),
  },
  {
    rank: 3,
    submissionId: "s3",
    userId: "u3",
    userName: "Bronze_Moonstar",
    userCity: "Thane",
    userRank: "Bronze",
    userIsLegend: false,
    voteCount: BigInt(970),
  },
  {
    rank: 4,
    submissionId: "s4",
    userId: "u4",
    userName: "PlatinumKing_Raj",
    userCity: "Mumbai",
    userRank: "Platinum",
    userIsLegend: false,
    voteCount: BigInt(640),
  },
];

const THUMB_GRADIENTS = [
  "linear-gradient(160deg, oklch(0.30 0.12 275), oklch(0.18 0.08 285))",
  "linear-gradient(160deg, oklch(0.28 0.15 20), oklch(0.18 0.10 10))",
  "linear-gradient(160deg, oklch(0.30 0.12 160), oklch(0.18 0.08 170))",
  "linear-gradient(160deg, oklch(0.32 0.14 65), oklch(0.20 0.10 75))",
];

/* ── Helpers ────────────────────────────────────────────────────── */
function formatVotes(v: bigint | number) {
  const n = typeof v === "bigint" ? Number(v) : v;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function getCountdown(endTime: bigint): string {
  const diff = Number(endTime) - Date.now();
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  if (days > 0) return `${days}d ${hours}h left`;
  const mins = Math.floor((diff % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${mins}m left`;
  return `${mins}m left`;
}

function getMedalEmoji(rank: number): string {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

/* ── Sub-components ─────────────────────────────────────────────── */

interface ChallengeCardProps {
  challenge: ChallengeData;
  onClick: () => void;
}

function ChallengeCard({ challenge, onClick }: ChallengeCardProps) {
  const Icon = CATEGORY_ICONS[challenge.category] ?? Gamepad2;
  const catColor = CATEGORY_COLORS[challenge.category] ?? "";
  const countdown = getCountdown(challenge.endTime);
  const ended = countdown === "Ended";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="card-elevated rounded-2xl p-4 cursor-pointer transition-smooth hover:border-primary/40 space-y-3"
      data-ocid={`challenge-card-${challenge.id}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-xl border ${catColor} shrink-0`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-foreground truncate">
            {challenge.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {challenge.city} · {challenge.category}
          </p>
        </div>
        {!ended && (
          <span className="text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 rounded-full px-2 py-0.5 shrink-0">
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span
          className={`font-semibold ${ended ? "text-muted-foreground" : "text-accent"}`}
        >
          ⏱ {countdown}
        </span>
        <span className="text-muted-foreground truncate max-w-[60%] text-right">
          🏆 {challenge.prizeDescription}
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:text-primary font-semibold"
        data-ocid={`view-leaderboard-${challenge.id}`}
      >
        <Trophy className="w-3.5 h-3.5 mr-1.5" />
        View Leaderboard
        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
      </Button>
    </motion.div>
  );
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  index: number;
  isChampion: boolean;
  isUnlocked: boolean;
  remainingCoins: number;
  onVote: (submissionId: string) => void;
  votingId: string | null;
}

function LeaderboardRow({
  entry,
  index,
  isChampion,
  isUnlocked,
  remainingCoins,
  onVote,
  votingId,
}: LeaderboardRowProps) {
  const gradIdx = entry.submissionId.charCodeAt(0) % THUMB_GRADIENTS.length;
  const isVoting = votingId === entry.submissionId;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className={`rounded-2xl p-3 flex items-center gap-3 transition-smooth ${
        isChampion
          ? "card-rank-border bg-gradient-to-r from-card to-primary/10"
          : "card-elevated"
      }`}
      data-ocid={`leaderboard-row-${entry.submissionId}`}
    >
      {/* Rank */}
      <div className="w-8 shrink-0 text-center">
        <span
          className={
            entry.rank <= 3
              ? "text-xl leading-none"
              : "text-sm font-bold text-muted-foreground"
          }
        >
          {getMedalEmoji(entry.rank)}
        </span>
      </div>

      {/* Thumbnail */}
      <div
        className="w-10 h-14 rounded-lg overflow-hidden shrink-0 flex items-center justify-center relative"
        style={{ background: THUMB_GRADIENTS[gradIdx] }}
      >
        <Play className="w-4 h-4 text-foreground/80 fill-current" />
      </div>

      {/* Creator info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-display font-bold text-sm text-foreground truncate">
            {entry.userName}
          </span>
          {isChampion && <LegendTag size="sm" />}
        </div>
        <div className="flex items-center gap-2">
          <RankBadge rank={entry.userRank} size="sm" showLabel={false} />
          <span className="text-xs text-muted-foreground truncate">
            {entry.userCity}
          </span>
        </div>
        <p className="text-xs font-bold text-primary">
          🪙 {formatVotes(entry.voteCount)}
        </p>
      </div>

      {/* Champion label or vote button */}
      <div className="shrink-0">
        {isChampion ? (
          <div className="flex flex-col items-center gap-0.5">
            <Crown className="w-5 h-5 text-primary fill-current" />
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider">
              Champion
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              isUnlocked && remainingCoins > 0 && onVote(entry.submissionId)
            }
            disabled={!isUnlocked || remainingCoins <= 0 || isVoting}
            className={`button-vote ${!isUnlocked || remainingCoins <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={`Vote for ${entry.userName}`}
            data-ocid={`vote-btn-${entry.submissionId}`}
          >
            {isVoting ? "..." : "🪙 Vote"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface SubmitFormProps {
  isUnlocked: boolean;
  onClose: () => void;
}

function SubmitForm({ isUnlocked, onClose }: SubmitFormProps) {
  const [url, setUrl] = useState("");
  const [effect, setEffect] = useState<VideoEffect | null>(null);
  const [previewing, setPreviewing] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a video URL first");
      return;
    }
    toast.success("Video submitted! Judges will review it shortly. 🎉");
    onClose();
  }

  if (!isUnlocked) {
    return (
      <div
        className="flex flex-col items-center gap-4 py-8 px-4 text-center"
        data-ocid="locked-submit-gate"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Lock className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-display font-bold text-foreground text-lg">
            Feature Locked
          </p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs">
            Invite 2 friends to join challenges and unlock video submissions.
          </p>
        </div>
        <Button
          className="bg-primary text-primary-foreground font-bold px-6"
          data-ocid="invite-friends-btn"
          onClick={() =>
            toast.info("Share your referral code from the Profile tab!")
          }
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Invite Friends Now
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-1">
      <div className="space-y-2">
        <Label htmlFor="video-url" className="text-sm font-semibold">
          Video URL
        </Label>
        <Input
          id="video-url"
          placeholder="Paste YouTube / Google Drive link..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-muted/40 border-border focus:border-primary"
          data-ocid="video-url-input"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          AI Video Effect (optional)
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {EFFECTS.map((fx) => (
            <button
              key={fx.id}
              type="button"
              onClick={() => setEffect(effect === fx.id ? null : fx.id)}
              className={`rounded-xl p-2.5 border text-center transition-smooth ${
                effect === fx.id
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
              }`}
              data-ocid={`effect-btn-${fx.id.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="text-2xl mb-1">{fx.icon}</div>
              <p className="text-[10px] font-bold leading-tight">{fx.id}</p>
              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                {fx.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {url && !previewing && (
        <Button
          type="button"
          variant="outline"
          className="w-full border-border"
          onClick={() => setPreviewing(true)}
          data-ocid="preview-btn"
        >
          <Play className="w-4 h-4 mr-2" />
          Preview Before Submit
        </Button>
      )}

      {previewing && (
        <div className="rounded-xl bg-muted/40 border border-border p-4 text-center">
          <Play className="w-8 h-8 mx-auto mb-2 text-primary" />
          <p className="font-semibold text-sm text-foreground">
            {effect ? `Effect: ${effect}` : "No effect applied"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 break-all">{url}</p>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground font-bold"
        data-ocid="submit-video-btn"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit to Challenge
      </Button>
    </form>
  );
}

interface ChallengeDrawerProps {
  challenge: ChallengeData;
  isUnlocked: boolean;
  remainingCoins: number;
  onClose: () => void;
}

function ChallengeDrawer({
  challenge,
  isUnlocked,
  remainingCoins,
  onClose,
}: ChallengeDrawerProps) {
  const [drawerTab, setDrawerTab] = useState<"leaderboard" | "submit">(
    "leaderboard",
  );
  const [votingId, setVotingId] = useState<string | null>(null);

  const { data: lbData, isLoading: lbLoading } = useGetChallengeLeaderboard(
    challenge.id,
  );
  const castVote = useCastVote();

  const leaderboard: LeaderboardEntry[] =
    lbData && Array.isArray(lbData) && (lbData as LeaderboardEntry[]).length > 0
      ? (lbData as LeaderboardEntry[]).map((e, i) => ({ ...e, rank: i + 1 }))
      : SAMPLE_LEADERBOARD;

  const champion = leaderboard[0] ?? null;
  const ended = getCountdown(challenge.endTime) === "Ended";
  const Icon = CATEGORY_ICONS[challenge.category] ?? Gamepad2;

  async function handleVote(submissionId: string) {
    if (remainingCoins <= 0) {
      toast.error("No coins left today. Come back tomorrow!");
      return;
    }
    setVotingId(submissionId);
    try {
      await castVote.mutateAsync({ submissionId, challengeId: challenge.id });
      toast.success("🪙 Vote cast! -1 coin");
    } catch {
      toast.error("Couldn't cast vote. Try again.");
    } finally {
      setVotingId(null);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center"
        onClick={onClose}
        data-ocid="challenge-drawer-overlay"
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card border-t sm:border border-border rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[92vh] flex flex-col overflow-hidden"
          data-ocid="challenge-drawer"
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-border" />
          </div>

          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-border flex items-start gap-3">
            <div
              className={`p-2 rounded-xl border ${CATEGORY_COLORS[challenge.category] ?? ""} shrink-0 mt-0.5`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-lg text-foreground leading-tight">
                {challenge.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {challenge.city} ·{" "}
                <span
                  className={
                    ended
                      ? "text-muted-foreground"
                      : "text-accent font-semibold"
                  }
                >
                  {getCountdown(challenge.endTime)}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-muted transition-smooth text-muted-foreground"
              aria-label="Close drawer"
              data-ocid="close-drawer-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Rules + prize */}
          <div className="px-5 py-3 bg-muted/20 border-b border-border">
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {challenge.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="text-xs border-primary/30 text-primary"
              >
                🏆 {challenge.prizeDescription}
              </Badge>
              {challenge.isFinalized && champion && (
                <Badge className="text-xs bg-primary/20 text-primary border-primary/30 border">
                  <Crown className="w-3 h-3 mr-1 fill-current" />
                  Champion: {champion.userName}
                </Badge>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="px-5 pt-3 flex gap-1 shrink-0">
            {(["leaderboard", "submit"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDrawerTab(t)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-smooth capitalize ${
                  drawerTab === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
                data-ocid={`drawer-tab-${t}`}
              >
                {t === "leaderboard" ? "🏆 Leaderboard" : "📤 Submit Video"}
              </button>
            ))}
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 px-5 py-4">
            {drawerTab === "leaderboard" ? (
              <div className="space-y-2.5">
                {/* Coin balance + locked gate */}
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                    Rankings
                  </p>
                  <CoinDisplay />
                </div>

                {!isUnlocked && (
                  <div
                    className="rounded-xl border border-border bg-muted/30 px-4 py-3 flex items-center gap-3 mb-2"
                    data-ocid="locked-vote-gate"
                  >
                    <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">
                        Invite 2 friends
                      </span>{" "}
                      to unlock voting in challenges.
                    </p>
                  </div>
                )}

                {lbLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                    ))}
                  </div>
                ) : (
                  leaderboard.map((entry, i) => (
                    <LeaderboardRow
                      key={entry.submissionId}
                      entry={entry}
                      index={i}
                      isChampion={challenge.isFinalized && i === 0}
                      isUnlocked={isUnlocked}
                      remainingCoins={remainingCoins}
                      onVote={handleVote}
                      votingId={votingId}
                    />
                  ))
                )}
              </div>
            ) : (
              <SubmitForm isUnlocked={isUnlocked} onClose={onClose} />
            )}
          </ScrollArea>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main Page ──────────────────────────────────────────────────── */
export default function Challenges() {
  const [pageTab, setPageTab] = useState<"active" | "past">("active");
  const [selectedChallenge, setSelectedChallenge] =
    useState<ChallengeData | null>(null);

  const { data: profileData } = useGetMyProfile();
  const { data: challengeData, isLoading } = useListChallenges();
  const { data: remainingCoinsRaw = 50 } = useGetRemainingCoins();

  const profile = profileData as { unlockedFeatures?: boolean } | null;
  const isUnlocked = profile?.unlockedFeatures ?? false;
  const remainingCoins =
    typeof remainingCoinsRaw === "bigint"
      ? Number(remainingCoinsRaw)
      : ((remainingCoinsRaw as number) ?? 50);

  const rawChallenges: ChallengeData[] =
    challengeData &&
    Array.isArray(challengeData) &&
    (challengeData as ChallengeData[]).length > 0
      ? (challengeData as ChallengeData[])
      : SAMPLE_CHALLENGES;

  const activeChallenges = rawChallenges.filter((c) => c.isActive);
  const pastChallenges = rawChallenges.filter((c) => !c.isActive);
  const displayed = pageTab === "active" ? activeChallenges : pastChallenges;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Page header */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-extrabold text-xl text-foreground leading-tight">
              Skill Battles
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compete · Vote · Win Legend
            </p>
          </div>
          <CoinDisplay />
        </div>

        {/* Tab bar */}
        <div className="px-4 pb-3 flex gap-2">
          {(["active", "past"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setPageTab(t)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-smooth ${
                pageTab === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
              data-ocid={`tab-${t}-challenges`}
            >
              {t === "active" ? "⚡ Active" : "🏁 Past"}{" "}
              <span className="text-xs font-normal opacity-70">
                (
                {t === "active"
                  ? activeChallenges.length
                  : pastChallenges.length}
                )
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {/* Unlock gate banner */}
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-muted/30 p-4 flex items-center gap-3"
            data-ocid="unlock-banner"
          >
            <Lock className="w-5 h-5 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">
                Unlock Challenges
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Invite 2 friends to submit videos and vote.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        )}

        {/* Challenge cards */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div
            className="rounded-2xl border border-border bg-muted/20 py-14 text-center"
            data-ocid="empty-challenges"
          >
            <Trophy className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-display font-bold text-foreground">
              No {pageTab} challenges
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back soon for new battles!
            </p>
          </div>
        ) : (
          <div className="space-y-3" data-ocid="challenges-list">
            {displayed.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <ChallengeCard
                  challenge={challenge}
                  onClick={() => setSelectedChallenge(challenge)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      {selectedChallenge && (
        <ChallengeDrawer
          challenge={selectedChallenge}
          isUnlocked={isUnlocked}
          remainingCoins={remainingCoins}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </div>
  );
}
