import { c as createLucideIcon, r as reactExports, e as useListUsersByLocation, j as jsxRuntimeExports, S as Skeleton, I as INDIAN_CITIES, b as useGetRemainingCoins, T as Trophy, h as ue } from "./index-Ll3reC1Q.js";
import { B as Badge } from "./badge-ZkUs0xR0.js";
import { m as motion, B as Button } from "./proxy-Bw4yEQ8F.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-ZSJw0iJe.js";
import { I as Input } from "./input-B-ZZANRs.js";
import { C as CreatorCard, H as Heart } from "./CreatorCard-7UtiqicH.js";
import { S as Star, L as LegendTag, R as RankBadge } from "./RankBadge-Da6y8BLL.js";
import { X } from "./index-BS7r-aTG.js";
import { M as MapPin } from "./map-pin-D9sLShGn.js";
import { U as Users } from "./users-CkKKh0jE.js";
import { A as AnimatePresence } from "./index-CK9CveLY.js";
import "./index-DJB4tv1u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const SEED_CREATORS = [
  {
    id: "s1",
    creatorName: "Nisha_DanceStar",
    city: "Mumbai",
    rank: "Gold",
    hasLegendTag: true,
    totalVotesReceived: BigInt(25400),
    bio: "Mumbai ki queen 👑 Dance is my language",
    videoCount: BigInt(48)
  },
  {
    id: "s2",
    creatorName: "StreetRapper_AJ",
    city: "Delhi",
    rank: "Platinum",
    hasLegendTag: false,
    totalVotesReceived: BigInt(15200),
    bio: "Delhi se hoon, rap se jeeta hoon 🎤",
    videoCount: BigInt(62)
  },
  {
    id: "s3",
    creatorName: "CookieQueen_Priya",
    city: "Bangalore",
    rank: "Silver",
    hasLegendTag: false,
    totalVotesReceived: BigInt(9800),
    bio: "Cooking stories one bite at a time 🍳",
    videoCount: BigInt(31)
  },
  {
    id: "s4",
    creatorName: "MimicryKing_Dev",
    city: "Pune",
    rank: "Bronze",
    hasLegendTag: false,
    totalVotesReceived: BigInt(4100),
    bio: "Aawaz hi meri pehchaan hai 🎭",
    videoCount: BigInt(22)
  },
  {
    id: "s5",
    creatorName: "ComedyAce_Riya",
    city: "Chennai",
    rank: "Gold",
    hasLegendTag: true,
    totalVotesReceived: BigInt(18600),
    bio: "Life is short, laugh loud 😂",
    videoCount: BigInt(57)
  },
  {
    id: "s6",
    creatorName: "GamingLord_Arjun",
    city: "Hyderabad",
    rank: "Platinum",
    hasLegendTag: false,
    totalVotesReceived: BigInt(31e3),
    bio: "Pro gamer, content creator, Hyderabad ka star 🎮",
    videoCount: BigInt(95)
  },
  {
    id: "s7",
    creatorName: "SingerSoul_Aanya",
    city: "Mumbai",
    rank: "Silver",
    hasLegendTag: false,
    totalVotesReceived: BigInt(7700),
    bio: "Classical meets pop 🎵 Mumbai dreams",
    videoCount: BigInt(28)
  },
  {
    id: "s8",
    creatorName: "CinematicVibes_Sam",
    city: "Kolkata",
    rank: "Bronze",
    hasLegendTag: false,
    totalVotesReceived: BigInt(2900),
    bio: "Visual storyteller from the City of Joy 🎬",
    videoCount: BigInt(15)
  },
  {
    id: "s9",
    creatorName: "BollywoodQueen_Zara",
    city: "Mumbai",
    rank: "Gold",
    hasLegendTag: false,
    totalVotesReceived: BigInt(12300),
    bio: "Bollywood dance covers & original choreography ✨",
    videoCount: BigInt(41)
  },
  {
    id: "s10",
    creatorName: "TechStar_Kiran",
    city: "Bangalore",
    rank: "Silver",
    hasLegendTag: false,
    totalVotesReceived: BigInt(6400),
    bio: "Coding tutorials with a creative twist 💻",
    videoCount: BigInt(33)
  }
];
const EXPLORE_CITIES = ["All", ...INDIAN_CITIES.slice(0, 9)];
function avatarGradient(id) {
  const hues = [65, 275, 20, 160, 200, 330, 120];
  const h = hues[id.charCodeAt(0) % hues.length];
  return `linear-gradient(135deg, oklch(0.55 0.20 ${h}), oklch(0.35 0.15 ${h + 30}))`;
}
function formatVotes(v) {
  const n = typeof v === "bigint" ? Number(v) : v;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}
function CreatorProfileModal({ creator, onClose }) {
  const { data: coins } = useGetRemainingCoins();
  const [voteAmt, setVoteAmt] = reactExports.useState(5);
  const [voted, setVoted] = reactExports.useState(false);
  if (!creator) return null;
  const remaining = Number(coins ?? 50);
  const initials = creator.creatorName.slice(0, 2).toUpperCase();
  const mockSubs = [
    {
      id: "m1",
      title: "Weekly Dance Battle",
      votes: BigInt(Math.floor(Number(creator.totalVotesReceived) * 0.4)),
      effect: "Cinematic"
    },
    {
      id: "m2",
      title: "Local Talent Showcase",
      votes: BigInt(Math.floor(Number(creator.totalVotesReceived) * 0.3)),
      effect: "Professional Edit"
    },
    {
      id: "m3",
      title: "City Champions Cup",
      votes: BigInt(Math.floor(Number(creator.totalVotesReceived) * 0.3)),
      effect: "Cartoon Style"
    }
  ];
  const handleVote = () => {
    if (remaining < voteAmt) {
      ue.error(`Not enough coins! You have ${remaining} coins left today.`);
      return;
    }
    setVoted(true);
    ue.success(`🪙 ${voteAmt} coins sent to ${creator.creatorName}!`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!creator, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm rounded-2xl bg-card border-border p-0 overflow-hidden",
      "data-ocid": "creator-profile-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-20 w-full",
            style: { background: avatarGradient(creator.id) }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 -mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-20 rounded-full border-4 border-card flex items-center justify-center text-2xl font-display font-bold overflow-hidden",
                style: { background: avatarGradient(creator.id) },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.96 0.01 60)" }, children: initials })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "mb-1 p-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-smooth",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "text-left space-y-1 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display font-bold text-lg text-foreground", children: creator.creatorName }),
              creator.hasLegendTag && /* @__PURE__ */ jsxRuntimeExports.jsx(LegendTag, { size: "sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: creator.rank, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                " ",
                creator.city
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3" }),
                " ",
                creator.videoCount.toString(),
                " ",
                "videos"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: creator.bio })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-primary", children: formatVotes(creator.totalVotesReceived) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3" }),
                " Total Votes"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted rounded-xl p-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground", children: [
                "#",
                SEED_CREATORS.indexOf(creator) + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" }),
                " City Rank"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Challenge Submissions" }),
            mockSubs.map((sub) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between bg-muted/60 rounded-xl px-3 py-2.5",
                "data-ocid": `submission-${sub.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: sub.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: sub.effect })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-bold text-accent shrink-0 ml-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 fill-current" }),
                    formatVotes(sub.votes)
                  ] })
                ]
              },
              sub.id
            ))
          ] }),
          !voted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Send Coins" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                remaining,
                " coins left today"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 5, 10, 25].map((amt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setVoteAmt(amt),
                className: `flex-1 py-2 rounded-xl text-sm font-bold border transition-smooth ${voteAmt === amt ? "bg-primary/20 border-primary text-primary" : "bg-muted border-border text-muted-foreground hover:text-foreground"}`,
                "data-ocid": `vote-amt-${amt}`,
                children: [
                  "🪙",
                  amt
                ]
              },
              amt
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleVote,
                className: "button-vote w-full justify-center",
                "data-ocid": "cast-vote-btn",
                children: [
                  "🪙 Vote ",
                  voteAmt,
                  " Coins"
                ]
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              className: "border-t border-border pt-4 text-center space-y-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl", children: "🎉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "Vote cast!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Thanks for supporting local talent" })
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function Explore() {
  const [query, setQuery] = reactExports.useState("");
  const [selectedCity, setSelectedCity] = reactExports.useState("All");
  const [activeCreator, setActiveCreator] = reactExports.useState(null);
  const { data: liveUsers, isLoading } = useListUsersByLocation(
    selectedCity === "All" ? "Mumbai" : selectedCity
  );
  const creators = (() => {
    if (liveUsers && liveUsers.length > 0) {
      return liveUsers.map((u) => ({
        id: u.id.toString(),
        creatorName: u.creatorName,
        city: u.city,
        rank: u.rank,
        hasLegendTag: u.hasLegendTag,
        totalVotesReceived: u.totalVotesReceived,
        bio: u.bio,
        videoCount: u.videoCount
      }));
    }
    return SEED_CREATORS;
  })();
  const filtered = creators.filter((c) => {
    const matchName = c.creatorName.toLowerCase().includes(query.toLowerCase());
    const matchCity = selectedCity === "All" || c.city === selectedCity;
    return matchName && matchCity;
  }).sort((a, b) => b.totalVotesReceived > a.totalVotesReceived ? 1 : -1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-4 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "space-y-0.5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-6 h-6 text-primary" }),
            " Explore Creators"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Discover local talent in your city" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Search creators by name...",
          className: "pl-9 bg-card border-border rounded-xl",
          "data-ocid": "explore-search"
        }
      ),
      query && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setQuery(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2",
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground hover:text-foreground transition-smooth" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Filter by City" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-2 overflow-x-auto scrollbar-hide pb-1",
          "data-ocid": "city-filter",
          children: EXPLORE_CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              type: "button",
              whileTap: { scale: 0.95 },
              onClick: () => setSelectedCity(c),
              className: `shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth flex items-center gap-1 ${selectedCity === c ? "bg-primary/20 border-primary text-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`,
              "data-ocid": `city-filter-${c.toLowerCase()}`,
              children: [
                c !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3" }),
                c
              ]
            },
            c
          ))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
        " ",
        "creators",
        selectedCity !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          " in ",
          selectedCity
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Sorted by votes" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-2xl" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        className: "text-center py-16 space-y-3",
        "data-ocid": "explore-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: "🔍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground", children: selectedCity !== "All" ? `No creators in ${selectedCity} yet` : "No creators found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mx-auto", children: selectedCity !== "All" ? "Be the first local star in your city — upload a video and start your journey!" : "Try a different city or clear your search" }),
          selectedCity !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "mt-2",
              onClick: () => setSelectedCity("All"),
              children: "View All Cities"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", "data-ocid": "creators-grid", children: filtered.map((creator, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { delay: i * 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CreatorCard,
          {
            creator: {
              id: creator.id,
              name: creator.creatorName,
              city: creator.city,
              rank: creator.rank,
              isLegend: creator.hasLegendTag,
              totalVotes: creator.totalVotesReceived
            },
            index: i,
            onClick: () => setActiveCreator(creator)
          }
        )
      },
      creator.id
    )) }) }),
    filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        variant: "outline",
        className: "text-xs text-muted-foreground gap-1 border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 text-yellow-400 fill-current" }),
          "Legend = Top voted creator of the week"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreatorProfileModal,
      {
        creator: activeCreator,
        onClose: () => setActiveCreator(null)
      }
    )
  ] });
}
export {
  Explore as default
};
