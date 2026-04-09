import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Flame,
  LogIn,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CoinDisplay from "../components/CoinDisplay";
import CreatorCard from "../components/CreatorCard";
import { useCity } from "../components/Layout";
import LegendTag from "../components/LegendTag";
import RankBadge from "../components/RankBadge";
import { SkeletonList } from "../components/SkeletonCard";
import VideoCard from "../components/VideoCard";
import { useAuth } from "../hooks/use-auth";
import {
  useCastVote,
  useGetMyProfile,
  useGetReferralInfo,
  useGetRemainingCoins,
  useListChallenges,
  useListUsersByLocation,
} from "../hooks/use-backend";
import type { Challenge, Rank } from "../types";

/* ──────────────────── Sample data for first-load ──────────────────── */

const SAMPLE_CREATORS = [
  {
    id: "c1",
    name: "Nisha_DanceStar",
    city: "Mumbai",
    rank: "Gold" as Rank,
    isLegend: true,
    totalVotes: BigInt(25400),
  },
  {
    id: "c2",
    name: "StreetRapper_AJ",
    city: "Mumbai",
    rank: "Platinum" as Rank,
    isLegend: false,
    totalVotes: BigInt(15200),
  },
  {
    id: "c3",
    name: "CookieQueen_Priya",
    city: "Mumbai",
    rank: "Silver" as Rank,
    isLegend: false,
    totalVotes: BigInt(9800),
  },
];

const SAMPLE_VIDEOS = [
  {
    id: "v1",
    challengeId: "c1",
    userName: "Nisha_DanceStar",
    userCity: "Mumbai",
    userRank: "Gold" as Rank,
    userIsLegend: true,
    voteCount: BigInt(1240),
  },
  {
    id: "v2",
    challengeId: "c1",
    userName: "StreetRapper_AJ",
    userCity: "Mumbai",
    userRank: "Platinum" as Rank,
    userIsLegend: false,
    voteCount: BigInt(980),
  },
  {
    id: "v3",
    challengeId: "c2",
    userName: "MimicryKing_Dev",
    userCity: "Mumbai",
    userRank: "Bronze" as Rank,
    userIsLegend: false,
    voteCount: BigInt(320),
  },
  {
    id: "v4",
    challengeId: "c2",
    userName: "CookieQueen_Priya",
    userCity: "Mumbai",
    userRank: "Silver" as Rank,
    userIsLegend: false,
    voteCount: BigInt(760),
  },
];

const CATEGORY_EMOJI: Record<string, string> = {
  Gaming: "🎮",
  Singing: "🎤",
  Mimicry: "🎭",
  Coding: "💻",
  Cooking: "🍳",
  Dance: "💃",
  Comedy: "😂",
};

/* ──────────────────── Countdown Hook ──────────────────── */

function useCountdown(endTimestamp: bigint | number) {
  const [diff, setDiff] = useState(0);

  useEffect(() => {
    const end =
      typeof endTimestamp === "bigint"
        ? Number(endTimestamp) / 1_000_000
        : endTimestamp;
    const tick = () => setDiff(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTimestamp]);

  const secs = Math.floor(diff / 1000);
  const days = Math.floor(secs / 86400);
  const hrs = Math.floor((secs % 86400) / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return { days, hrs, mins, secs: s, isDone: diff === 0 };
}

/* ──────────────────── Sub-components ──────────────────── */

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[2rem]">
      <span className="font-display font-bold text-lg text-primary leading-none tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] text-muted-foreground uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function ChallengeCountdown({ endTime }: { endTime: bigint | number }) {
  const { days, hrs, mins, secs, isDone } = useCountdown(endTime);
  if (isDone)
    return (
      <span className="text-xs text-accent font-bold">Challenge Ended</span>
    );
  return (
    <div className="flex items-center gap-1.5" data-ocid="challenge-countdown">
      <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
      <div className="flex items-center gap-1">
        {days > 0 && (
          <>
            <CountdownUnit value={days} label="d" />
            <span className="text-muted-foreground text-sm font-bold mb-0.5">
              :
            </span>
          </>
        )}
        <CountdownUnit value={hrs} label="h" />
        <span className="text-muted-foreground text-sm font-bold mb-0.5">
          :
        </span>
        <CountdownUnit value={mins} label="m" />
        <span className="text-muted-foreground text-sm font-bold mb-0.5">
          :
        </span>
        <CountdownUnit value={secs} label="s" />
      </div>
    </div>
  );
}

/* ──────────────────── Guest screen ──────────────────── */

function GuestWelcome({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6 py-10 text-center gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
          }}
        >
          <Star className="w-12 h-12 text-foreground" />
        </div>
        <h1 className="font-display font-bold text-3xl text-foreground">
          Apna <span className="text-primary">Star</span> Bano
        </h1>
        <p className="text-muted-foreground text-base max-w-xs leading-relaxed">
          India ka hyper-local talent platform. Apne city ke top creators ko
          discover karo, weekly challenges mein compete karo, aur Legend ban
          jao!
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {["🎤 Singing", "🎮 Gaming", "💃 Dance", "😂 Comedy"].map((tag) => (
            <span
              key={tag}
              className="bg-muted border border-border rounded-full px-3 py-1 text-sm font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <Button
          size="lg"
          className="w-full font-bold text-base gap-2"
          onClick={onLogin}
          data-ocid="guest-login-cta"
        >
          <LogIn className="w-5 h-5" />
          Login karo — It's Free!
        </Button>
        <p className="text-xs text-muted-foreground">
          50 daily voting coins • Weekly leaderboard • Local city feed
        </p>
      </motion.div>
    </div>
  );
}

/* ──────────────────── Stats Bar ──────────────────── */

interface StatsBarProps {
  rank: Rank;
  city: string;
}

function StatsBar({ rank, city }: StatsBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="card-elevated rounded-2xl p-3 flex items-center justify-between gap-3"
      data-ocid="home-stats-bar"
    >
      <div className="flex items-center gap-2 min-w-0">
        <RankBadge rank={rank} size="md" />
        <div className="text-xs text-muted-foreground truncate">
          <span className="text-foreground font-semibold">{city}</span> · Local
          Rank
        </div>
      </div>
      <CoinDisplay />
    </motion.div>
  );
}

/* ──────────────────── Active Challenge Card ──────────────────── */

function ActiveChallengeCard({ challenge }: { challenge: Challenge }) {
  const emoji = CATEGORY_EMOJI[challenge.category] ?? "🏆";
  const endTime = challenge.endTime;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="card-elevated card-rank-border rounded-2xl p-4 space-y-3"
      data-ocid={`active-challenge-${challenge.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-2xl shrink-0">
          {emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <Badge
              variant="destructive"
              className="text-[10px] px-1.5 py-0 animate-pulse"
            >
              LIVE
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">
              {challenge.category}
            </span>
          </div>
          <p className="font-display font-bold text-base text-foreground leading-snug truncate">
            {challenge.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {challenge.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <ChallengeCountdown endTime={endTime} />
        <Link to="/challenges">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 font-bold text-xs"
            data-ocid="challenge-card-cta"
          >
            Join Challenge <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

function FallbackChallengeCard({ city }: { city: string }) {
  return (
    <div
      className="card-elevated rounded-2xl p-4 flex items-center gap-3"
      data-ocid="challenge-fallback"
    >
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0">
        🌟
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm text-foreground">
          Weekly Challenge Starting Soon
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {city} ke liye naya challenge aa raha hai!
        </p>
      </div>
    </div>
  );
}

/* ──────────────────── Referral Gate Banner ──────────────────── */

function ReferralBanner() {
  const { data: referral } = useGetReferralInfo();
  if (!referral || referral.isUnlocked) return null;
  const count = referral.referralCount ?? 0;
  const needed = Math.max(0, 2 - count);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden border border-border"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.20 0.04 60), oklch(0.18 0.06 40))",
      }}
      data-ocid="referral-banner"
    >
      <div className="p-4 flex items-center gap-3">
        <div className="text-3xl shrink-0">🔒</div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-sm text-foreground">
            Refer &amp; Unlock
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {needed > 0
              ? `${needed} aur dost invite karo to video upload &amp; AI styling unlock ho jayega!`
              : "Features unlock ho gaye! Enjoy karo 🎉"}
          </p>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (count / 2) * 100)}%`,
                background:
                  "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
              }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            {count}/2 friends invited
          </p>
        </div>
        <Link to="/profile">
          <Button
            size="sm"
            className="shrink-0 font-bold text-xs gap-1"
            data-ocid="invite-now-btn"
          >
            <Zap className="w-3.5 h-3.5" /> Invite Now
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ──────────────────── Main Page ──────────────────── */

export default function Home() {
  const { city } = useCity();
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: coins } = useGetRemainingCoins();
  const { data: challenges, isLoading: challengesLoading } =
    useListChallenges(city);
  const { data: localCreators, isLoading: creatorsLoading } =
    useListUsersByLocation(city);
  const castVote = useCastVote();

  // Determine auth state
  const isLoading = isInitializing || profileLoading;
  const needsOnboarding = isAuthenticated && !isLoading && !profile;

  // Redirect to onboarding if needed
  useEffect(() => {
    if (needsOnboarding) {
      window.location.href = "/onboarding";
    }
  }, [needsOnboarding]);

  // Guest view
  if (!isAuthenticated && !isInitializing) {
    return <GuestWelcome onLogin={login} />;
  }

  // Loading state
  if (isLoading || needsOnboarding) {
    return (
      <div className="max-w-lg mx-auto px-4 py-4 space-y-6">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          <SkeletonList count={4} variant="video" />
        </div>
      </div>
    );
  }

  const userRank: Rank = (profile as { rank?: Rank } | null)?.rank ?? "Bronze";
  const isLegend =
    (profile as { isLegend?: boolean } | null)?.isLegend ?? false;
  const userName = (profile as { name?: string } | null)?.name ?? "Creator";

  // Use real data when available, fall back to sample data
  const displayCreators =
    localCreators && (localCreators as unknown[]).length > 0
      ? (localCreators as typeof SAMPLE_CREATORS).slice(0, 3)
      : SAMPLE_CREATORS;

  const displayVideos = SAMPLE_VIDEOS;

  function handleVote(submissionId: string) {
    const video = SAMPLE_VIDEOS.find((v) => v.id === submissionId);
    if (!video) return;
    castVote.mutate({ submissionId, challengeId: video.challengeId });
  }

  const activeChallenge =
    challenges && (challenges as Challenge[]).length > 0
      ? ((challenges as Challenge[]).find((c) => c.isActive) ??
        (challenges as Challenge[])[0])
      : null;

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-6 pb-8">
      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl overflow-hidden relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 65), oklch(0.16 0.10 275))",
          minHeight: "7rem",
        }}
        data-ocid="home-hero"
      >
        {/* Decorative glow orbs */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.22 65), transparent)",
          }}
        />
        <div
          className="absolute -bottom-6 -left-4 w-24 h-24 rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.25 20), transparent)",
          }}
        />

        <div className="relative p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-muted-foreground font-medium">
                Trending in
              </span>
              <span className="font-bold text-sm text-primary">{city}</span>
            </div>
            <h1 className="font-display font-bold text-xl text-foreground leading-tight">
              Namaste,{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {userName.split("_")[0]}
              </span>
              ! 🙏
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {coins ?? 50} coins bache aaj — vote karo!
            </p>
          </div>
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center flex-col gap-0.5">
              <RankBadge rank={userRank} size="sm" showLabel={false} />
              <span className="text-[9px] text-muted-foreground font-medium">
                {userRank}
              </span>
            </div>
            {isLegend && (
              <div className="scale-75 -mt-0.5">
                <LegendTag size="sm" />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Stats bar ── */}
      <StatsBar rank={userRank} city={city} />

      {/* ── Active Challenge ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" /> Live Challenge
          </h2>
          <Link to="/challenges">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground gap-1 h-auto py-1 hover:text-primary"
              data-ocid="see-all-challenges"
            >
              See All <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        {challengesLoading ? (
          <Skeleton className="h-28 w-full rounded-2xl" />
        ) : activeChallenge ? (
          <ActiveChallengeCard challenge={activeChallenge as Challenge} />
        ) : (
          <FallbackChallengeCard city={city} />
        )}
      </section>

      {/* ── Trending Videos ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
            🎥 Local Feed
          </h2>
          <Link to="/explore">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground gap-1 h-auto py-1 hover:text-primary"
              data-ocid="see-all-videos"
            >
              See All <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {displayVideos.map((v, i) => (
            <VideoCard
              key={v.id}
              submission={v}
              index={i}
              canVote={true}
              onVote={handleVote}
            />
          ))}
        </div>
      </section>

      {/* ── Trending Local Stars ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" /> Local Stars
          </h2>
          <Link to="/explore">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground gap-1 h-auto py-1 hover:text-primary"
              data-ocid="see-all-creators"
            >
              See All <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
        {creatorsLoading ? (
          <div className="grid grid-cols-3 gap-3">
            <SkeletonList count={3} variant="creator" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {displayCreators.map((c, i) => (
              <CreatorCard key={c.id} creator={c} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* ── Referral Banner ── */}
      <ReferralBanner />

      {/* ── Quick Action: Join Challenge CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.25 20 / 0.15), oklch(0.72 0.22 65 / 0.10))",
        }}
      >
        <div className="p-4 border border-primary/20 rounded-2xl flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display font-bold text-base text-foreground">
              Challenge Join Karo!
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {city} mein apna talent dikhao aur Legend ban jao 🌟
            </p>
          </div>
          <Link to="/challenges">
            <Button
              size="sm"
              className="shrink-0 font-bold gap-1.5"
              data-ocid="quick-join-challenge-cta"
            >
              <Zap className="w-4 h-4" /> Join Now
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
