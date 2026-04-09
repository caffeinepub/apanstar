import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Edit3,
  Heart,
  Lock,
  LogIn,
  MapPin,
  MessageCircle,
  PlayCircle,
  Shield,
  Star,
  TrendingUp,
  Trophy,
  Upload,
  Users,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CreatorCard from "../components/CreatorCard";
import LegendTag from "../components/LegendTag";
import RankBadge from "../components/RankBadge";
import { useAuth } from "../hooks/use-auth";
import {
  useGetMyProfile,
  useGetReferralInfo,
  useListUsersByLocation,
} from "../hooks/use-backend";
import { INDIAN_CITIES, type Rank } from "../types";

// ── Rank progression config ──────────────────────────────────
const RANK_THRESHOLDS: Record<Rank, number> = {
  Bronze: 0,
  Silver: 50,
  Gold: 200,
  Platinum: 500,
};
const RANK_ORDER: Rank[] = ["Bronze", "Silver", "Gold", "Platinum"];

function getNextRank(rank: Rank): Rank | null {
  const idx = RANK_ORDER.indexOf(rank);
  return idx < RANK_ORDER.length - 1 ? RANK_ORDER[idx + 1] : null;
}

function getRankProgress(rank: Rank, votes: number) {
  const nextRank = getNextRank(rank);
  if (!nextRank) return { percent: 100, remaining: 0, nextRank: null };
  const current = RANK_THRESHOLDS[rank];
  const next = RANK_THRESHOLDS[nextRank];
  const progress = Math.min(((votes - current) / (next - current)) * 100, 100);
  const remaining = Math.max(next - votes, 0);
  return { percent: Math.max(progress, 0), remaining, nextRank };
}

// ── Avatar gradient helper ───────────────────────────────────
function avatarGradient(name: string) {
  const hues = [65, 275, 20, 160, 200, 330];
  const h = hues[name.charCodeAt(0) % hues.length];
  return `linear-gradient(135deg, oklch(0.55 0.22 ${h}), oklch(0.35 0.18 ${h + 40}))`;
}

// ── Sample data for unauthenticated / skeleton fill ──────────
const SAMPLE_PROFILE = {
  id: "sample-1",
  name: "Rohan_K",
  bio: "Dancer & content creator from Mumbai 💃 | Weekly challenge enthusiast | Gold rank hustler",
  city: "Mumbai",
  district: "Andheri",
  rank: "Gold" as Rank,
  isLegend: false,
  avatarUrl: undefined,
  totalVotes: BigInt(3800),
  referralCode: "ROHAN7X",
  referralCount: 1,
  unlockedFeatures: false,
  createdAt: BigInt(0),
};

const SAMPLE_SUBMISSIONS = [
  {
    id: "s1",
    challengeId: "c1",
    title: "Bollywood Dance Battle",
    voteCount: BigInt(1240),
    thumbnail: null,
    category: "Dance",
  },
  {
    id: "s2",
    challengeId: "c2",
    title: "Comedy Mimicry Challenge",
    voteCount: BigInt(870),
    thumbnail: null,
    category: "Mimicry",
  },
  {
    id: "s3",
    challengeId: "c3",
    title: "Street Rap Mumbai",
    voteCount: BigInt(420),
    thumbnail: null,
    category: "Singing",
  },
];

const SAMPLE_CITY_CREATORS = [
  {
    id: "c1",
    name: "Nisha_DanceStar",
    city: "Mumbai",
    rank: "Platinum" as Rank,
    isLegend: true,
    totalVotes: BigInt(25400),
  },
  {
    id: "c2",
    name: "StreetRapper_AJ",
    city: "Mumbai",
    rank: "Gold" as Rank,
    isLegend: false,
    totalVotes: BigInt(15200),
  },
  {
    id: "c3",
    name: "CookingQueen_Puja",
    city: "Mumbai",
    rank: "Silver" as Rank,
    isLegend: false,
    totalVotes: BigInt(8900),
  },
  {
    id: "c4",
    name: "MimicryKing_Raj",
    city: "Mumbai",
    rank: "Gold" as Rank,
    isLegend: false,
    totalVotes: BigInt(7600),
  },
  {
    id: "c5",
    name: "CoderPro_Ananya",
    city: "Mumbai",
    rank: "Bronze" as Rank,
    isLegend: false,
    totalVotes: BigInt(3200),
  },
];

const MENU_ITEMS = [
  { label: "Analytics Dashboard", icon: BarChart2, badge: "Soon" as const },
  { label: "Brand Collaborations", icon: Star, badge: "Soon" as const },
  { label: "Messages", icon: MessageCircle, badge: "0" as const },
  { label: "Content Moderation", icon: Shield, badge: "Admin" as const },
];

// ── Sub-components ────────────────────────────────────────────

function StatsRow({
  votes,
  rank,
  uploads,
  unlocked,
}: {
  votes: bigint;
  rank: Rank;
  uploads: number;
  unlocked: boolean;
}) {
  const stats = [
    {
      label: "Total Votes",
      value:
        Number(votes) >= 1000
          ? `${(Number(votes) / 1000).toFixed(1)}K`
          : String(Number(votes)),
      icon: Heart,
      color: "text-accent",
    },
    {
      label: "Rank Level",
      value: rank,
      icon: Trophy,
      color: "text-primary",
    },
    {
      label: "Uploads",
      value: unlocked ? String(uploads) : "🔒",
      icon: Upload,
      color: "text-secondary",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="bg-muted rounded-xl p-3 text-center"
          data-ocid={`stat-${label.toLowerCase().replace(" ", "-")}`}
        >
          <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
          <p className={`font-display font-bold text-base ${color}`}>{value}</p>
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

function RankProgressBar({
  rank,
  votes,
}: {
  rank: Rank;
  votes: bigint;
}) {
  const voteNum = Number(votes);
  const { percent, remaining, nextRank } = getRankProgress(rank, voteNum);

  return (
    <div
      className="bg-card border border-border rounded-2xl p-4 space-y-2"
      data-ocid="rank-progress"
    >
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="font-semibold text-foreground">Rank Progress</span>
        </div>
        <RankBadge rank={rank} size="sm" />
      </div>

      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="h-2.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        {nextRank ? (
          <>
            <span className="text-primary font-semibold">
              {remaining.toLocaleString()} votes
            </span>{" "}
            to reach{" "}
            <span className="font-bold text-foreground">{nextRank}</span>
          </>
        ) : (
          <span className="text-primary font-semibold">
            🏆 Max rank achieved — You are a Legend!
          </span>
        )}
      </p>
    </div>
  );
}

function ReferralSection({
  referralCode,
  referralCount,
  isUnlocked,
}: {
  referralCode: string;
  referralCount: number;
  isUnlocked: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const progress = Math.min((referralCount / 2) * 100, 100);

  function handleCopy() {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="card-elevated rounded-2xl p-4 space-y-3"
      data-ocid="referral-section"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
          🔗 Refer &amp; Unlock
        </h3>
        {isUnlocked ? (
          <Badge
            className="bg-primary/20 text-primary border-primary/30 gap-1"
            data-ocid="unlock-badge"
          >
            <CheckCircle2 className="w-3 h-3" /> Unlocked
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-muted-foreground gap-1"
            data-ocid="lock-badge"
          >
            <Lock className="w-3 h-3" />
            {referralCount}/2 friends
          </Badge>
        )}
      </div>

      {/* Referral code */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-muted rounded-lg px-3 py-2 flex items-center justify-between min-w-0">
          <span className="font-mono font-bold text-primary text-sm tracking-widest truncate">
            {referralCode}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="shrink-0 gap-1.5"
          aria-label="Copy referral code"
          data-ocid="copy-referral-btn"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="h-2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          {isUnlocked ? (
            <>
              <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
              Video upload &amp; AI styling are unlocked — go create!
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 shrink-0" />
              Invite{" "}
              <span className="font-bold text-foreground">
                {2 - referralCount} more friend
                {2 - referralCount !== 1 ? "s" : ""}
              </span>{" "}
              to unlock video upload &amp; AI styling
            </>
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground">
          <span className="text-foreground font-bold">{referralCount}</span>{" "}
          successful referral{referralCount !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

function SubmissionItem({
  submission,
  index,
}: {
  submission: (typeof SAMPLE_SUBMISSIONS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-smooth"
      data-ocid={`submission-${submission.id}`}
    >
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <PlayCircle className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {submission.title}
        </p>
        <span className="text-xs text-muted-foreground">
          {submission.category}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs font-bold text-accent shrink-0">
        <Heart className="w-3 h-3 fill-current" />
        {Number(submission.voteCount) >= 1000
          ? `${(Number(submission.voteCount) / 1000).toFixed(1)}K`
          : String(Number(submission.voteCount))}
      </div>
    </motion.div>
  );
}

function EditProfileForm({
  profile,
  onClose,
}: {
  profile: typeof SAMPLE_PROFILE;
  onClose: () => void;
}) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [city, setCity] = useState(profile.city);

  function handleSave() {
    toast.success("Profile updated!");
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="card-elevated rounded-2xl p-4 space-y-4"
      data-ocid="edit-profile-form"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-sm text-foreground">
          Edit Profile
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close edit form"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="edit-name" className="text-xs">
            Creator Name
          </Label>
          <Input
            id="edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your creator name"
            className="h-9 text-sm"
            data-ocid="edit-name-input"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="edit-bio" className="text-xs">
            Bio
          </Label>
          <Textarea
            id="edit-bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell your story..."
            className="text-sm min-h-16 resize-none"
            data-ocid="edit-bio-input"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="edit-city" className="text-xs">
            City
          </Label>
          <select
            id="edit-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-9 bg-input border border-input rounded-md px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="edit-city-select"
          >
            {INDIAN_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-1.5"
          onClick={handleSave}
          data-ocid="save-profile-btn"
        >
          <Check className="w-3.5 h-3.5" /> Save Changes
        </Button>
      </div>
    </motion.div>
  );
}

// ── Main Profile Page ─────────────────────────────────────────

export default function Profile() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetMyProfile();
  const { data: referral } = useGetReferralInfo();
  const [isEditing, setIsEditing] = useState(false);

  const displayProfile = (profile as typeof SAMPLE_PROFILE) ?? SAMPLE_PROFILE;
  const city = displayProfile.city;

  const { data: cityCreators } = useListUsersByLocation(city);
  const topCityCreators = (cityCreators as
    | typeof SAMPLE_CITY_CREATORS
    | undefined)
    ? (cityCreators as typeof SAMPLE_CITY_CREATORS).slice(0, 5)
    : SAMPLE_CITY_CREATORS;

  type ReferralData = {
    referralCode: string;
    referralCount: number;
    isUnlocked: boolean;
  };
  const referralData: ReferralData = (referral as ReferralData | null) ?? {
    referralCode: displayProfile.referralCode,
    referralCount: displayProfile.referralCount,
    isUnlocked: displayProfile.unlockedFeatures,
  };

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-6"
        data-ocid="profile-login"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="space-y-4"
        >
          <div
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl font-display font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 65), oklch(0.35 0.18 275))",
              color: "oklch(0.96 0.01 60)",
            }}
          >
            R
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Your Profile
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              Login with Internet Identity to view your profile, track votes,
              earn badges &amp; more
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button
            onClick={login}
            className="h-12 font-bold gap-2 w-full"
            data-ocid="login-btn"
          >
            <LogIn className="w-4 h-4" /> Login with Internet Identity
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/onboarding" })}
            className="w-full"
            data-ocid="onboarding-btn"
          >
            New here? Setup Profile
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    );
  }

  const initials = displayProfile.name
    .split(/[_\s]/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-4 pb-8">
      {/* ── Profile Header Card ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated rounded-2xl p-5 space-y-4"
        data-ocid="profile-card"
      >
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display font-bold overflow-hidden"
              style={{
                background: displayProfile.avatarUrl
                  ? undefined
                  : avatarGradient(displayProfile.name),
                color: "oklch(0.96 0.01 60)",
              }}
            >
              {displayProfile.avatarUrl ? (
                <img
                  src={displayProfile.avatarUrl}
                  alt={displayProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            {displayProfile.isLegend && (
              <span className="absolute -top-2 -right-2">
                <LegendTag size="sm" />
              </span>
            )}
          </div>

          {/* Name + details */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-lg text-foreground leading-tight truncate">
                {displayProfile.name}
              </h2>
              {displayProfile.isLegend && <LegendTag />}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {displayProfile.district}, {displayProfile.city}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <RankBadge rank={displayProfile.rank} size="sm" />
            </div>
          </div>

          {/* Edit button */}
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            className="shrink-0 p-2 rounded-xl bg-muted hover:bg-muted/80 transition-smooth"
            aria-label="Edit profile"
            data-ocid="edit-profile-btn"
          >
            <Edit3 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {displayProfile.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {displayProfile.bio}
          </p>
        )}
      </motion.div>

      {/* ── Edit Profile Form (inline) ── */}
      {isEditing && (
        <EditProfileForm
          profile={displayProfile}
          onClose={() => setIsEditing(false)}
        />
      )}

      {/* ── Stats Row ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        data-ocid="stats-row"
      >
        <StatsRow
          votes={displayProfile.totalVotes}
          rank={displayProfile.rank}
          uploads={SAMPLE_SUBMISSIONS.length}
          unlocked={displayProfile.unlockedFeatures}
        />
      </motion.div>

      {/* ── Rank Progression ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
      >
        <RankProgressBar
          rank={displayProfile.rank}
          votes={displayProfile.totalVotes}
        />
      </motion.div>

      {/* ── Referral Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ReferralSection
          referralCode={
            referralData.referralCode ?? displayProfile.referralCode
          }
          referralCount={
            referralData.referralCount ?? displayProfile.referralCount
          }
          isUnlocked={
            referralData.isUnlocked ?? displayProfile.unlockedFeatures
          }
        />
      </motion.div>

      {/* ── Tabs: My Submissions | City Creators ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        data-ocid="profile-tabs"
      >
        <Tabs defaultValue="submissions">
          <TabsList className="w-full bg-muted rounded-xl p-1">
            <TabsTrigger
              value="submissions"
              className="flex-1 text-xs data-[state=active]:bg-card data-[state=active]:text-foreground"
              data-ocid="tab-submissions"
            >
              My Submissions
            </TabsTrigger>
            <TabsTrigger
              value="city"
              className="flex-1 text-xs data-[state=active]:bg-card data-[state=active]:text-foreground"
              data-ocid="tab-city"
            >
              My City Creators
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="mt-3 space-y-2">
            {SAMPLE_SUBMISSIONS.length > 0 ? (
              SAMPLE_SUBMISSIONS.map((sub, i) => (
                <SubmissionItem key={sub.id} submission={sub} index={i} />
              ))
            ) : (
              <div
                className="text-center py-10 space-y-3"
                data-ocid="submissions-empty"
              >
                <PlayCircle className="w-10 h-10 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  No submissions yet
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate({ to: "/challenges" })}
                >
                  Join a Challenge
                </Button>
              </div>
            )}
          </TabsContent>

          {/* City Creators Tab */}
          <TabsContent value="city" className="mt-3">
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-muted-foreground">
                Top creators in <span className="text-foreground">{city}</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {topCityCreators.map((creator, i) => (
                <CreatorCard key={creator.id} creator={creator} index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* ── Feature Menu ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="card-elevated rounded-2xl overflow-hidden divide-y divide-border"
        data-ocid="feature-menu"
      >
        {MENU_ITEMS.map(({ label, icon: Icon, badge }) => (
          <button
            type="button"
            key={label}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-smooth text-left"
            data-ocid={`menu-${label.toLowerCase().replace(/ /g, "-")}`}
          >
            <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="flex-1 text-sm font-medium text-foreground">
              {label}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                badge === "Soon"
                  ? "bg-muted text-muted-foreground"
                  : badge === "Admin"
                    ? "bg-secondary/20 text-secondary-foreground"
                    : "bg-primary/20 text-primary"
              }`}
            >
              {badge}
            </span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
