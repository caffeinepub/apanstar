import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Check,
  CheckCircle2,
  Copy,
  Crown,
  Link2,
  Medal,
  Sparkles,
  Trophy,
  Upload,
  Users,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { VideoEffect } from "../backend.d";
import { useGetReferralInfo, useListChallenges } from "../hooks/use-backend";
import { useGetMyProfile } from "../hooks/use-backend";

interface EffectOption {
  id: VideoEffect;
  label: string;
  description: string;
  thumbnail: string;
  gradient: string;
  icon: string;
}

const EFFECTS: EffectOption[] = [
  {
    id: VideoEffect.Professional,
    label: "Professional Edit",
    description: "Cinematic color grading with smooth transitions & warm tones",
    thumbnail: "/assets/generated/effect-professional.dim_400x225.jpg",
    gradient:
      "linear-gradient(135deg, oklch(0.30 0.15 220), oklch(0.20 0.10 230))",
    icon: "🎬",
  },
  {
    id: VideoEffect.Cartoon,
    label: "Cartoon Style",
    description: "Bold anime outlines with vibrant, cel-shaded neon colors",
    thumbnail: "/assets/generated/effect-cartoon.dim_400x225.jpg",
    gradient:
      "linear-gradient(135deg, oklch(0.35 0.20 330), oklch(0.22 0.15 290))",
    icon: "🎨",
  },
  {
    id: VideoEffect.Cinematic,
    label: "Cinematic",
    description: "Widescreen letterbox with film grain and Hollywood bokeh",
    thumbnail: "/assets/generated/effect-cinematic.dim_400x225.jpg",
    gradient:
      "linear-gradient(135deg, oklch(0.28 0.10 60), oklch(0.18 0.06 45))",
    icon: "🎞️",
  },
];

// ── Referral Leaderboard mock data ──────────────────────────────────────────
const REFERRAL_TOP: Array<{
  rank: number;
  name: string;
  city: string;
  count: number;
}> = [
  { rank: 1, name: "Rohan_K", city: "Mumbai", count: 24 },
  { rank: 2, name: "Priya_DanceStar", city: "Mumbai", count: 17 },
  { rank: 3, name: "AjayRaps", city: "Mumbai", count: 12 },
  { rank: 4, name: "NishaVibes", city: "Mumbai", count: 9 },
  { rank: 5, name: "CodeKing_Dev", city: "Mumbai", count: 6 },
];

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-4 h-4 text-primary" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-muted-foreground" />;
  if (rank === 3) return <Crown className="w-4 h-4 text-accent" />;
  return (
    <span className="w-4 h-4 text-center text-xs font-bold text-muted-foreground">
      {rank}
    </span>
  );
}

// ── Locked Gate ──────────────────────────────────────────────────────────────
function ReferralGate({
  referralCount,
  referralCode,
}: { referralCount: number; referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const referralLink = `${typeof window !== "undefined" ? window.location.origin : ""}/onboarding?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const progress = Math.min((referralCount / 2) * 100, 100);

  return (
    <div
      className="max-w-lg mx-auto px-4 py-6 space-y-6"
      data-ocid="ai-style-locked"
    >
      {/* Hero illustration */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="flex justify-center"
      >
        <img
          src="/assets/generated/referral-unlock-illustration.dim_400x300.png"
          alt="Invite friends to unlock"
          className="w-64 h-48 object-cover rounded-2xl"
          style={{ boxShadow: "0 0 40px -8px oklch(0.72 0.22 65 / 0.4)" }}
        />
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-center space-y-2"
      >
        <h2 className="font-display font-bold text-2xl text-foreground flex items-center justify-center gap-2">
          <span>🔒</span> Unlock AI Styling
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Invite <strong className="text-foreground">2 friends</strong> to
          ApanStar and unlock one-click AI video effects
        </p>
      </motion.div>

      {/* Progress card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="card-elevated rounded-2xl p-5 space-y-4"
      >
        {/* Counter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Friends Invited
            </span>
          </div>
          <span className="font-display font-bold text-lg text-primary">
            {referralCount}
            <span className="text-muted-foreground font-normal text-base">
              /2
            </span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="h-3 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{referralCount} invited</span>
            <span>{Math.max(0, 2 - referralCount)} more needed</span>
          </div>
        </div>

        {/* Referral link */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Link2 className="w-3 h-3" /> Your Referral Link
          </p>
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5 border border-border">
            <span className="flex-1 text-xs text-muted-foreground truncate font-mono">
              {referralLink}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 transition-smooth hover:text-primary"
              aria-label="Copy referral link"
              data-ocid="copy-referral-link"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-4 h-4 text-primary" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <Button
          className="w-full gap-2 font-bold"
          onClick={handleCopy}
          data-ocid="unlock-invite-btn"
        >
          <Share className="w-4 h-4" /> Share & Invite Friends
        </Button>
      </motion.div>

      {/* City Referral Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="card-elevated rounded-2xl p-5 space-y-3"
      >
        <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" /> Top Referrers in Your City
        </h3>
        <div className="space-y-2">
          {REFERRAL_TOP.map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-3 py-1.5"
              data-ocid={`referral-leaderboard-${entry.rank}`}
            >
              <div className="w-5 flex justify-center">
                <RankMedal rank={entry.rank} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {entry.name}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-primary shrink-0">
                <Users className="w-3 h-3" />
                <span>{entry.count} refs</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center pt-1">
          Top referrers unlock exclusive badges & early features 🏆
        </p>
      </motion.div>
    </div>
  );
}

// ── Publishing modal ─────────────────────────────────────────────────────────
interface PublishModalProps {
  open: boolean;
  onClose: () => void;
  effect: VideoEffect | null;
}

function PublishModal({ open, onClose, effect }: PublishModalProps) {
  const { data: challenges, isLoading } = useListChallenges();
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState("");
  const [published, setPublished] = useState(false);

  const activeChalls = (challenges ?? []).filter((c) => {
    const now = BigInt(Date.now()) * BigInt(1_000_000);
    return c.endTime > now;
  });

  const handlePublish = () => {
    if (!videoUrl.trim() || !selectedChallenge) {
      toast.error("Please add a video URL and pick a challenge");
      return;
    }
    setPublished(true);
    setTimeout(() => {
      toast.success("Video published successfully! 🎉", { duration: 4000 });
      onClose();
      setPublished(false);
      setVideoUrl("");
      setSelectedChallenge("");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm rounded-2xl bg-card border-border"
        data-ocid="publish-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Apply & Publish
          </DialogTitle>
        </DialogHeader>

        {published ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 flex flex-col items-center gap-3 text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-primary" />
            <p className="font-display font-bold text-lg text-foreground">
              Published! 🎉
            </p>
            <p className="text-sm text-muted-foreground">
              Your video is live in the challenge
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Effect preview */}
            {effect && (
              <div className="rounded-xl overflow-hidden relative">
                {EFFECTS.find((e) => e.id === effect) && (
                  <img
                    src={EFFECTS.find((e) => e.id === effect)!.thumbnail}
                    alt={EFFECTS.find((e) => e.id === effect)!.label}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <Badge className="bg-primary/80 text-primary-foreground text-xs font-bold">
                    {EFFECTS.find((e) => e.id === effect)?.icon}{" "}
                    {EFFECTS.find((e) => e.id === effect)?.label}
                  </Badge>
                </div>
              </div>
            )}

            {/* Video URL */}
            <div className="space-y-1.5">
              <label
                htmlFor="video-url"
                className="text-xs font-medium text-muted-foreground"
              >
                Video URL
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="video-url"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste video link or upload..."
                  className="w-full bg-muted border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-smooth"
                  data-ocid="publish-video-url"
                />
              </div>
            </div>

            {/* Challenge selector */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Submit to Challenge
              </p>
              {isLoading ? (
                <Skeleton className="h-10 w-full rounded-xl" />
              ) : (
                <Select
                  value={selectedChallenge}
                  onValueChange={setSelectedChallenge}
                >
                  <SelectTrigger
                    className="bg-muted border-border rounded-xl"
                    data-ocid="challenge-selector"
                  >
                    <SelectValue placeholder="Select active challenge..." />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border rounded-xl">
                    {activeChalls.length > 0 ? (
                      activeChalls.map((c) => (
                        <SelectItem
                          key={c.id.toString()}
                          value={c.id.toString()}
                        >
                          {c.title} · {c.category}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="singing-week">
                          🎤 Singing Battle – Week 15
                        </SelectItem>
                        <SelectItem value="dance-week">
                          💃 Dance-Off – Week 15
                        </SelectItem>
                        <SelectItem value="comedy-week">
                          😂 Comedy Clash – Week 15
                        </SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Button
              className="w-full font-bold gap-2 h-11"
              onClick={handlePublish}
              disabled={!videoUrl.trim() || !selectedChallenge}
              data-ocid="confirm-publish-btn"
            >
              <Sparkles className="w-4 h-4" /> Apply Effect & Publish
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Main AI Style Page ───────────────────────────────────────────────────────
export default function AiStyle() {
  const { data: referral, isLoading: loadingReferral } = useGetReferralInfo();
  const { data: profile } = useGetMyProfile();
  const [selected, setSelected] = useState<VideoEffect | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);

  const isUnlocked = referral?.isUnlocked ?? profile?.isUnlocked ?? false;
  const referralCount = Number(referral?.referralCount ?? 0);
  const referralCode =
    referral?.referralCode ?? profile?.referralCode ?? "APAN123";

  if (loadingReferral) {
    return (
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <Skeleton className="h-8 w-48 rounded-xl" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-36 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <ReferralGate referralCount={referralCount} referralCode={referralCode} />
    );
  }

  return (
    <div
      className="max-w-lg mx-auto px-4 py-4 space-y-6"
      data-ocid="ai-style-unlocked"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-primary" /> AI Video Effects
        </h1>
        <p className="text-sm text-muted-foreground">
          One-click styles to transform your content before publishing
        </p>
      </motion.div>

      {/* Effect cards */}
      <div className="space-y-4" data-ocid="effects-grid">
        {EFFECTS.map((effect, i) => {
          const isSelected = selected === effect.id;
          return (
            <motion.button
              type="button"
              key={effect.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setSelected(effect.id)}
              className={`w-full rounded-2xl overflow-hidden text-left transition-smooth ${
                isSelected
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "ring-1 ring-border"
              }`}
              data-ocid={`effect-${effect.id.toLowerCase()}`}
            >
              {/* Thumbnail */}
              <div className="relative w-full h-36 overflow-hidden">
                <img
                  src={effect.thumbnail}
                  alt={`${effect.label} preview`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="text-2xl">{effect.icon}</span>
                  <p className="font-display font-bold text-base text-white drop-shadow">
                    {effect.label}
                  </p>
                  {isSelected && (
                    <Badge className="text-[10px] bg-primary text-primary-foreground border-0 font-bold">
                      Selected
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-card px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  {effect.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Apply & Publish CTA */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <Button
              className="w-full h-12 font-bold gap-2 text-base"
              onClick={() => setPublishOpen(true)}
              data-ocid="apply-publish-btn"
            >
              <Sparkles className="w-5 h-5" />
              Apply {EFFECTS.find((e) => e.id === selected)?.label} & Publish
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-muted-foreground pb-2">
        🎬 Select an effect above, then apply it to your video before publishing
      </p>

      <PublishModal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        effect={selected}
      />
    </div>
  );
}

// ── Inline SVG Share icon ─────────────────────────────────────────────────────
function Share({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx={18} cy={5} r={3} />
      <circle cx={6} cy={12} r={3} />
      <circle cx={18} cy={19} r={3} />
      <line x1={8.59} y1={13.51} x2={15.42} y2={17.49} />
      <line x1={15.41} y1={6.51} x2={8.59} y2={10.49} />
    </svg>
  );
}
