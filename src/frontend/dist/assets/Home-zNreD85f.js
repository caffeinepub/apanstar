import { c as createLucideIcon, j as jsxRuntimeExports, S as Skeleton, r as reactExports, u as useCity, a as useGetMyProfile, b as useGetRemainingCoins, d as useListChallenges, e as useListUsersByLocation, f as useCastVote, T as Trophy, L as Link, C as CoinDisplay, g as useGetReferralInfo } from "./index-Ll3reC1Q.js";
import { B as Badge } from "./badge-ZkUs0xR0.js";
import { m as motion, B as Button } from "./proxy-Bw4yEQ8F.js";
import { H as Heart, C as CreatorCard } from "./CreatorCard-7UtiqicH.js";
import { L as LegendTag, R as RankBadge, S as Star } from "./RankBadge-Da6y8BLL.js";
import { P as Play } from "./play-6cLkXcXE.js";
import { M as MessageCircle, u as useAuth, L as LogIn } from "./use-auth-BcDUH2NJ.js";
import { A as ArrowRight } from "./arrow-right-CbMxP2xG.js";
import { U as Users } from "./users-CkKKh0jE.js";
import "./map-pin-D9sLShGn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function SkeletonCreatorCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-2xl p-3 flex flex-col gap-2.5",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-full mx-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-24 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 rounded" })
        ] })
      ]
    }
  );
}
function SkeletonVideoCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-2xl overflow-hidden", "aria-busy": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full aspect-[9/16] max-h-52" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 rounded" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 rounded-lg" })
    ] })
  ] });
}
function SkeletonList({
  count = 4,
  variant = "creator"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: count }, (_, i) => `sk-${i}`).map(
    (key) => variant === "video" ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonVideoCard, {}, key) : /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCreatorCard, {}, key)
  ) });
}
function formatVotes(votes) {
  const n = typeof votes === "bigint" ? Number(votes) : votes;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}
const THUMB_GRADIENTS = [
  "linear-gradient(160deg, oklch(0.30 0.12 275), oklch(0.18 0.08 285))",
  "linear-gradient(160deg, oklch(0.28 0.15 20), oklch(0.18 0.10 10))",
  "linear-gradient(160deg, oklch(0.30 0.12 160), oklch(0.18 0.08 170))",
  "linear-gradient(160deg, oklch(0.32 0.14 65), oklch(0.20 0.10 75))",
  "linear-gradient(160deg, oklch(0.28 0.12 310), oklch(0.18 0.08 300))"
];
function VideoCard({
  submission,
  index = 0,
  onVote,
  canVote = true
}) {
  const [voted, setVoted] = reactExports.useState(false);
  const gradientIdx = submission.id.charCodeAt(0) % THUMB_GRADIENTS.length;
  function handleVote(e) {
    e.stopPropagation();
    if (!voted && canVote && onVote) {
      setVoted(true);
      onVote(submission.id);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: { delay: index * 0.06, duration: 0.3, ease: "easeOut" },
      whileHover: { y: -3 },
      className: "card-elevated rounded-2xl overflow-hidden flex flex-col",
      "data-ocid": `video-card-${submission.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative aspect-[9/16] max-h-52 flex items-center justify-center overflow-hidden",
            style: {
              background: submission.thumbnailUrl ? void 0 : THUMB_GRADIENTS[gradientIdx]
            },
            children: [
              submission.thumbnailUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: submission.thumbnailUrl,
                  alt: "",
                  className: "absolute inset-0 w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "relative w-12 h-12 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center border border-foreground/30 hover:bg-foreground/30 transition-smooth",
                  "aria-label": "Play video",
                  "data-ocid": `play-btn-${submission.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 fill-current text-foreground ml-0.5" })
                }
              ),
              submission.userIsLegend && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LegendTag, { size: "sm" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground truncate drop-shadow", children: submission.userName }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2.5 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: submission.userRank, size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1 truncate", children: submission.userCity })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-1.5 rounded-full hover:bg-muted transition-smooth",
                "aria-label": "Like",
                "data-ocid": `like-btn-${submission.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 text-accent" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-1.5 rounded-full hover:bg-muted transition-smooth",
                "aria-label": "Comment",
                "data-ocid": `comment-btn-${submission.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4 text-muted-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleVote,
                disabled: voted || !canVote,
                className: `button-vote py-1 px-2.5 text-xs ${voted ? "opacity-60 cursor-not-allowed" : ""}`,
                "aria-label": "Cast vote",
                "data-ocid": `vote-btn-${submission.id}`,
                children: [
                  "🪙 ",
                  formatVotes(submission.voteCount)
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const SAMPLE_CREATORS = [
  {
    id: "c1",
    name: "Nisha_DanceStar",
    city: "Mumbai",
    rank: "Gold",
    isLegend: true,
    totalVotes: BigInt(25400)
  },
  {
    id: "c2",
    name: "StreetRapper_AJ",
    city: "Mumbai",
    rank: "Platinum",
    isLegend: false,
    totalVotes: BigInt(15200)
  },
  {
    id: "c3",
    name: "CookieQueen_Priya",
    city: "Mumbai",
    rank: "Silver",
    isLegend: false,
    totalVotes: BigInt(9800)
  }
];
const SAMPLE_VIDEOS = [
  {
    id: "v1",
    challengeId: "c1",
    userName: "Nisha_DanceStar",
    userCity: "Mumbai",
    userRank: "Gold",
    userIsLegend: true,
    voteCount: BigInt(1240)
  },
  {
    id: "v2",
    challengeId: "c1",
    userName: "StreetRapper_AJ",
    userCity: "Mumbai",
    userRank: "Platinum",
    userIsLegend: false,
    voteCount: BigInt(980)
  },
  {
    id: "v3",
    challengeId: "c2",
    userName: "MimicryKing_Dev",
    userCity: "Mumbai",
    userRank: "Bronze",
    userIsLegend: false,
    voteCount: BigInt(320)
  },
  {
    id: "v4",
    challengeId: "c2",
    userName: "CookieQueen_Priya",
    userCity: "Mumbai",
    userRank: "Silver",
    userIsLegend: false,
    voteCount: BigInt(760)
  }
];
const CATEGORY_EMOJI = {
  Gaming: "🎮",
  Singing: "🎤",
  Mimicry: "🎭",
  Coding: "💻",
  Cooking: "🍳",
  Dance: "💃",
  Comedy: "😂"
};
function useCountdown(endTimestamp) {
  const [diff, setDiff] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const end = typeof endTimestamp === "bigint" ? Number(endTimestamp) / 1e6 : endTimestamp;
    const tick = () => setDiff(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1e3);
    return () => clearInterval(id);
  }, [endTimestamp]);
  const secs = Math.floor(diff / 1e3);
  const days = Math.floor(secs / 86400);
  const hrs = Math.floor(secs % 86400 / 3600);
  const mins = Math.floor(secs % 3600 / 60);
  const s = secs % 60;
  return { days, hrs, mins, secs: s, isDone: diff === 0 };
}
function CountdownUnit({ value, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center min-w-[2rem]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-primary leading-none tabular-nums", children: String(value).padStart(2, "0") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground uppercase tracking-widest", children: label })
  ] });
}
function ChallengeCountdown({ endTime }) {
  const { days, hrs, mins, secs, isDone } = useCountdown(endTime);
  if (isDone)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-accent font-bold", children: "Challenge Ended" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", "data-ocid": "challenge-countdown", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
      days > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: days, label: "d" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-bold mb-0.5", children: ":" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: hrs, label: "h" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-bold mb-0.5", children: ":" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: mins, label: "m" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-bold mb-0.5", children: ":" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { value: secs, label: "s" })
    ] })
  ] });
}
function GuestWelcome({ onLogin }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-6 py-10 text-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: "easeOut" },
        className: "flex flex-col items-center gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-24 h-24 rounded-3xl flex items-center justify-center",
              style: {
                background: "linear-gradient(135deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-12 h-12 text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-3xl text-foreground", children: [
            "Apna ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Star" }),
            " Bano"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xs leading-relaxed", children: "India ka hyper-local talent platform. Apne city ke top creators ko discover karo, weekly challenges mein compete karo, aur Legend ban jao!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: ["🎤 Singing", "🎮 Gaming", "💃 Dance", "😂 Comedy"].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "bg-muted border border-border rounded-full px-3 py-1 text-sm font-medium text-foreground",
              children: tag
            },
            tag
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3, duration: 0.4 },
        className: "flex flex-col gap-3 w-full max-w-xs",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "w-full font-bold text-base gap-2",
              onClick: onLogin,
              "data-ocid": "guest-login-cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
                "Login karo — It's Free!"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "50 daily voting coins • Weekly leaderboard • Local city feed" })
        ]
      }
    )
  ] });
}
function StatsBar({ rank, city }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      className: "card-elevated rounded-2xl p-3 flex items-center justify-between gap-3",
      "data-ocid": "home-stats-bar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank, size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground truncate", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: city }),
            " · Local Rank"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CoinDisplay, {})
      ]
    }
  );
}
function ActiveChallengeCard({ challenge }) {
  const emoji = CATEGORY_EMOJI[challenge.category] ?? "🏆";
  const endTime = challenge.endTime;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.4 },
      className: "card-elevated card-rank-border rounded-2xl p-4 space-y-3",
      "data-ocid": `active-challenge-${challenge.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-2xl shrink-0", children: emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "destructive",
                  className: "text-[10px] px-1.5 py-0 animate-pulse",
                  children: "LIVE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: challenge.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground leading-snug truncate", children: challenge.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: challenge.description })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChallengeCountdown, { endTime }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/challenges", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "gap-1.5 font-bold text-xs",
              "data-ocid": "challenge-card-cta",
              children: [
                "Join Challenge ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function FallbackChallengeCard({ city }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-2xl p-4 flex items-center gap-3",
      "data-ocid": "challenge-fallback",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl shrink-0", children: "🌟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Weekly Challenge Starting Soon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            city,
            " ke liye naya challenge aa raha hai!"
          ] })
        ] })
      ]
    }
  );
}
function ReferralBanner() {
  const { data: referral } = useGetReferralInfo();
  if (!referral || referral.isUnlocked) return null;
  const count = referral.referralCount ?? 0;
  const needed = Math.max(0, 2 - count);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4 },
      className: "rounded-2xl overflow-hidden border border-border",
      style: {
        background: "linear-gradient(135deg, oklch(0.20 0.04 60), oklch(0.18 0.06 40))"
      },
      "data-ocid": "referral-banner",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl shrink-0", children: "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: "Refer & Unlock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: needed > 0 ? `${needed} aur dost invite karo to video upload &amp; AI styling unlock ho jayega!` : "Features unlock ho gaye! Enjoy karo 🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-all duration-500",
              style: {
                width: `${Math.min(100, count / 2 * 100)}%`,
                background: "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-1", children: [
            count,
            "/2 friends invited"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "shrink-0 font-bold text-xs gap-1",
            "data-ocid": "invite-now-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
              " Invite Now"
            ]
          }
        ) })
      ] })
    }
  );
}
function Home() {
  const { city } = useCity();
  const { isAuthenticated, isInitializing, login } = useAuth();
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: coins } = useGetRemainingCoins();
  const { data: challenges, isLoading: challengesLoading } = useListChallenges(city);
  const { data: localCreators, isLoading: creatorsLoading } = useListUsersByLocation(city);
  const castVote = useCastVote();
  const isLoading = isInitializing || profileLoading;
  const needsOnboarding = isAuthenticated && !isLoading && !profile;
  reactExports.useEffect(() => {
    if (needsOnboarding) {
      window.location.href = "/onboarding";
    }
  }, [needsOnboarding]);
  if (!isAuthenticated && !isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(GuestWelcome, { onLogin: login });
  }
  if (isLoading || needsOnboarding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonList, { count: 4, variant: "video" }) })
    ] });
  }
  const userRank = (profile == null ? void 0 : profile.rank) ?? "Bronze";
  const isLegend = (profile == null ? void 0 : profile.isLegend) ?? false;
  const userName = (profile == null ? void 0 : profile.name) ?? "Creator";
  const displayCreators = localCreators && localCreators.length > 0 ? localCreators.slice(0, 3) : SAMPLE_CREATORS;
  const displayVideos = SAMPLE_VIDEOS;
  function handleVote(submissionId) {
    const video = SAMPLE_VIDEOS.find((v) => v.id === submissionId);
    if (!video) return;
    castVote.mutate({ submissionId, challengeId: video.challengeId });
  }
  const activeChallenge = challenges && challenges.length > 0 ? challenges.find((c) => c.isActive) ?? challenges[0] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-4 space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "rounded-2xl overflow-hidden relative",
        style: {
          background: "linear-gradient(135deg, oklch(0.20 0.08 65), oklch(0.16 0.10 275))",
          minHeight: "7rem"
        },
        "data-ocid": "home-hero",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-30 pointer-events-none",
              style: {
                background: "radial-gradient(circle, oklch(0.72 0.22 65), transparent)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -bottom-6 -left-4 w-24 h-24 rounded-full opacity-20 pointer-events-none",
              style: {
                background: "radial-gradient(circle, oklch(0.68 0.25 20), transparent)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-4 flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Trending in" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-primary", children: city })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground leading-tight", children: [
                "Namaste,",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    },
                    children: userName.split("_")[0]
                  }
                ),
                "! 🙏"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                coins ?? 50,
                " coins bache aaj — vote karo!"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-14 h-14 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: userRank, size: "sm", showLabel: false }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-medium", children: userRank })
              ] }),
              isLegend && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scale-75 -mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LegendTag, { size: "sm" }) })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { rank: userRank, city }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-primary" }),
          " Live Challenge"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/challenges", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs text-muted-foreground gap-1 h-auto py-1 hover:text-primary",
            "data-ocid": "see-all-challenges",
            children: [
              "See All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] }),
      challengesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-2xl" }) : activeChallenge ? /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveChallengeCard, { challenge: activeChallenge }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FallbackChallengeCard, { city })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground flex items-center gap-2", children: "🎥 Local Feed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explore", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs text-muted-foreground gap-1 h-auto py-1 hover:text-primary",
            "data-ocid": "see-all-videos",
            children: [
              "See All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: displayVideos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoCard,
        {
          submission: v,
          index: i,
          canVote: true,
          onVote: handleVote
        },
        v.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
          " Local Stars"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explore", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs text-muted-foreground gap-1 h-auto py-1 hover:text-primary",
            "data-ocid": "see-all-creators",
            children: [
              "See All ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
            ]
          }
        ) })
      ] }),
      creatorsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonList, { count: 3, variant: "creator" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: displayCreators.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CreatorCard, { creator: c, index: i }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReferralBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4 },
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "linear-gradient(135deg, oklch(0.68 0.25 20 / 0.15), oklch(0.72 0.22 65 / 0.10))"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-primary/20 rounded-2xl flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground", children: "Challenge Join Karo!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              city,
              " mein apna talent dikhao aur Legend ban jao 🌟"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/challenges", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "shrink-0 font-bold gap-1.5",
              "data-ocid": "quick-join-challenge-cta",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                " Join Now"
              ]
            }
          ) })
        ] })
      }
    )
  ] });
}
export {
  Home as default
};
