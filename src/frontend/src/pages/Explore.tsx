import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  MapPin,
  Search,
  Star,
  Trophy,
  Users,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { User } from "../backend.d";
import CreatorCard from "../components/CreatorCard";
import LegendTag from "../components/LegendTag";
import RankBadge from "../components/RankBadge";
import {
  useGetRemainingCoins,
  useListUsersByLocation,
} from "../hooks/use-backend";
import { INDIAN_CITIES } from "../types";
import type { Rank } from "../types";

// ── Static seed creators for first-load experience ───────────────────────────
interface SeedCreator {
  id: string;
  creatorName: string;
  city: string;
  rank: Rank;
  hasLegendTag: boolean;
  totalVotesReceived: bigint;
  bio: string;
  videoCount: bigint;
}

const SEED_CREATORS: SeedCreator[] = [
  {
    id: "s1",
    creatorName: "Nisha_DanceStar",
    city: "Mumbai",
    rank: "Gold",
    hasLegendTag: true,
    totalVotesReceived: BigInt(25400),
    bio: "Mumbai ki queen 👑 Dance is my language",
    videoCount: BigInt(48),
  },
  {
    id: "s2",
    creatorName: "StreetRapper_AJ",
    city: "Delhi",
    rank: "Platinum",
    hasLegendTag: false,
    totalVotesReceived: BigInt(15200),
    bio: "Delhi se hoon, rap se jeeta hoon 🎤",
    videoCount: BigInt(62),
  },
  {
    id: "s3",
    creatorName: "CookieQueen_Priya",
    city: "Bangalore",
    rank: "Silver",
    hasLegendTag: false,
    totalVotesReceived: BigInt(9800),
    bio: "Cooking stories one bite at a time 🍳",
    videoCount: BigInt(31),
  },
  {
    id: "s4",
    creatorName: "MimicryKing_Dev",
    city: "Pune",
    rank: "Bronze",
    hasLegendTag: false,
    totalVotesReceived: BigInt(4100),
    bio: "Aawaz hi meri pehchaan hai 🎭",
    videoCount: BigInt(22),
  },
  {
    id: "s5",
    creatorName: "ComedyAce_Riya",
    city: "Chennai",
    rank: "Gold",
    hasLegendTag: true,
    totalVotesReceived: BigInt(18600),
    bio: "Life is short, laugh loud 😂",
    videoCount: BigInt(57),
  },
  {
    id: "s6",
    creatorName: "GamingLord_Arjun",
    city: "Hyderabad",
    rank: "Platinum",
    hasLegendTag: false,
    totalVotesReceived: BigInt(31000),
    bio: "Pro gamer, content creator, Hyderabad ka star 🎮",
    videoCount: BigInt(95),
  },
  {
    id: "s7",
    creatorName: "SingerSoul_Aanya",
    city: "Mumbai",
    rank: "Silver",
    hasLegendTag: false,
    totalVotesReceived: BigInt(7700),
    bio: "Classical meets pop 🎵 Mumbai dreams",
    videoCount: BigInt(28),
  },
  {
    id: "s8",
    creatorName: "CinematicVibes_Sam",
    city: "Kolkata",
    rank: "Bronze",
    hasLegendTag: false,
    totalVotesReceived: BigInt(2900),
    bio: "Visual storyteller from the City of Joy 🎬",
    videoCount: BigInt(15),
  },
  {
    id: "s9",
    creatorName: "BollywoodQueen_Zara",
    city: "Mumbai",
    rank: "Gold",
    hasLegendTag: false,
    totalVotesReceived: BigInt(12300),
    bio: "Bollywood dance covers & original choreography ✨",
    videoCount: BigInt(41),
  },
  {
    id: "s10",
    creatorName: "TechStar_Kiran",
    city: "Bangalore",
    rank: "Silver",
    hasLegendTag: false,
    totalVotesReceived: BigInt(6400),
    bio: "Coding tutorials with a creative twist 💻",
    videoCount: BigInt(33),
  },
];

const EXPLORE_CITIES = ["All", ...INDIAN_CITIES.slice(0, 9)];

// ── Gradient avatar helper ────────────────────────────────────────────────────
function avatarGradient(id: string) {
  const hues = [65, 275, 20, 160, 200, 330, 120];
  const h = hues[id.charCodeAt(0) % hues.length];
  return `linear-gradient(135deg, oklch(0.55 0.20 ${h}), oklch(0.35 0.15 ${h + 30}))`;
}

function formatVotes(v: bigint | number) {
  const n = typeof v === "bigint" ? Number(v) : v;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// ── Creator Profile Modal ─────────────────────────────────────────────────────
interface ProfileModalProps {
  creator: SeedCreator | null;
  onClose: () => void;
}

function CreatorProfileModal({ creator, onClose }: ProfileModalProps) {
  const { data: coins } = useGetRemainingCoins();
  const [voteAmt, setVoteAmt] = useState(5);
  const [voted, setVoted] = useState(false);

  if (!creator) return null;

  const remaining = Number(coins ?? 50);
  const initials = creator.creatorName.slice(0, 2).toUpperCase();

  // Mock submissions for this creator
  const mockSubs = [
    {
      id: "m1",
      title: "Weekly Dance Battle",
      votes: BigInt(Math.floor(Number(creator.totalVotesReceived) * 0.4)),
      effect: "Cinematic",
    },
    {
      id: "m2",
      title: "Local Talent Showcase",
      votes: BigInt(Math.floor(Number(creator.totalVotesReceived) * 0.3)),
      effect: "Professional Edit",
    },
    {
      id: "m3",
      title: "City Champions Cup",
      votes: BigInt(Math.floor(Number(creator.totalVotesReceived) * 0.3)),
      effect: "Cartoon Style",
    },
  ];

  const handleVote = () => {
    if (remaining < voteAmt) {
      toast.error(`Not enough coins! You have ${remaining} coins left today.`);
      return;
    }
    setVoted(true);
    toast.success(`🪙 ${voteAmt} coins sent to ${creator.creatorName}!`);
  };

  return (
    <Dialog open={!!creator} onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm rounded-2xl bg-card border-border p-0 overflow-hidden"
        data-ocid="creator-profile-modal"
      >
        {/* Banner */}
        <div
          className="h-20 w-full"
          style={{ background: avatarGradient(creator.id) }}
        />

        {/* Avatar overlapping banner */}
        <div className="px-4 pb-4 -mt-10">
          <div className="flex items-end justify-between mb-3">
            <div
              className="w-20 h-20 rounded-full border-4 border-card flex items-center justify-center text-2xl font-display font-bold overflow-hidden"
              style={{ background: avatarGradient(creator.id) }}
            >
              <span style={{ color: "oklch(0.96 0.01 60)" }}>{initials}</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mb-1 p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-smooth"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <DialogHeader className="text-left space-y-1 pb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <DialogTitle className="font-display font-bold text-lg text-foreground">
                {creator.creatorName}
              </DialogTitle>
              {creator.hasLegendTag && <LegendTag size="sm" />}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <RankBadge rank={creator.rank} size="sm" />
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {creator.city}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Video className="w-3 h-3" /> {creator.videoCount.toString()}{" "}
                videos
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{creator.bio}</p>
          </DialogHeader>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="font-display font-bold text-lg text-primary">
                {formatVotes(creator.totalVotesReceived)}
              </p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Heart className="w-3 h-3" /> Total Votes
              </p>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <p className="font-display font-bold text-lg text-foreground">
                #{SEED_CREATORS.indexOf(creator) + 1}
              </p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Trophy className="w-3 h-3" /> City Rank
              </p>
            </div>
          </div>

          {/* Submissions */}
          <div className="space-y-2 mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Challenge Submissions
            </p>
            {mockSubs.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between bg-muted/60 rounded-xl px-3 py-2.5"
                data-ocid={`submission-${sub.id}`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {sub.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{sub.effect}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-accent shrink-0 ml-2">
                  <Heart className="w-3 h-3 fill-current" />
                  {formatVotes(sub.votes)}
                </div>
              </div>
            ))}
          </div>

          {/* Vote section */}
          {!voted ? (
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Send Coins
                </p>
                <span className="text-xs text-muted-foreground">
                  {remaining} coins left today
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 5, 10, 25].map((amt) => (
                  <button
                    type="button"
                    key={amt}
                    onClick={() => setVoteAmt(amt)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-smooth ${
                      voteAmt === amt
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-muted border-border text-muted-foreground hover:text-foreground"
                    }`}
                    data-ocid={`vote-amt-${amt}`}
                  >
                    🪙{amt}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleVote}
                className="button-vote w-full justify-center"
                data-ocid="cast-vote-btn"
              >
                🪙 Vote {voteAmt} Coins
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="border-t border-border pt-4 text-center space-y-1"
            >
              <p className="text-2xl">🎉</p>
              <p className="font-bold text-foreground">Vote cast!</p>
              <p className="text-xs text-muted-foreground">
                Thanks for supporting local talent
              </p>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Explore Page ──────────────────────────────────────────────────────────────
export default function Explore() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [activeCreator, setActiveCreator] = useState<SeedCreator | null>(null);

  // Try live data
  const { data: liveUsers, isLoading } = useListUsersByLocation(
    selectedCity === "All" ? "Mumbai" : selectedCity,
  );

  // Merge live with seed, prefer live when available
  const creators: SeedCreator[] = (() => {
    if (liveUsers && liveUsers.length > 0) {
      return (liveUsers as User[]).map((u) => ({
        id: u.id.toString(),
        creatorName: u.creatorName,
        city: u.city,
        rank: u.rank as Rank,
        hasLegendTag: u.hasLegendTag,
        totalVotesReceived: u.totalVotesReceived,
        bio: u.bio,
        videoCount: u.videoCount,
      }));
    }
    return SEED_CREATORS;
  })();

  const filtered = creators
    .filter((c) => {
      const matchName = c.creatorName
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchCity = selectedCity === "All" || c.city === selectedCity;
      return matchName && matchCity;
    })
    .sort((a, b) => (b.totalVotesReceived > a.totalVotesReceived ? 1 : -1));

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-0.5"
      >
        <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2">
          <Star className="w-6 h-6 text-primary" /> Explore Creators
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover local talent in your city
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search creators by name..."
          className="pl-9 bg-card border-border rounded-xl"
          data-ocid="explore-search"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-smooth" />
          </button>
        )}
      </div>

      {/* City filter pills */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Filter by City
          </span>
        </div>
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
          data-ocid="city-filter"
        >
          {EXPLORE_CITIES.map((c) => (
            <motion.button
              type="button"
              key={c}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCity(c)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth flex items-center gap-1 ${
                selectedCity === c
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`city-filter-${c.toLowerCase()}`}
            >
              {c !== "All" && <MapPin className="w-3 h-3" />}
              {c}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          creators
          {selectedCity !== "All" && <span> in {selectedCity}</span>}
        </p>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Sorted by votes</span>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-44 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 space-y-3"
          data-ocid="explore-empty"
        >
          <div className="text-5xl">🔍</div>
          <p className="font-display font-bold text-lg text-foreground">
            {selectedCity !== "All"
              ? `No creators in ${selectedCity} yet`
              : "No creators found"}
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            {selectedCity !== "All"
              ? "Be the first local star in your city — upload a video and start your journey!"
              : "Try a different city or clear your search"}
          </p>
          {selectedCity !== "All" && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setSelectedCity("All")}
            >
              View All Cities
            </Button>
          )}
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-2 gap-3" data-ocid="creators-grid">
            {filtered.map((creator, i) => (
              <motion.div
                key={creator.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <CreatorCard
                  creator={{
                    id: creator.id,
                    name: creator.creatorName,
                    city: creator.city,
                    rank: creator.rank,
                    isLegend: creator.hasLegendTag,
                    totalVotes: creator.totalVotesReceived,
                  }}
                  index={i}
                  onClick={() => setActiveCreator(creator)}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* Legend info */}
      {filtered.length > 0 && (
        <div className="flex items-center gap-2 py-1">
          <Badge
            variant="outline"
            className="text-xs text-muted-foreground gap-1 border-border"
          >
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            Legend = Top voted creator of the week
          </Badge>
        </div>
      )}

      {/* Profile modal */}
      <CreatorProfileModal
        creator={activeCreator}
        onClose={() => setActiveCreator(null)}
      />
    </div>
  );
}
