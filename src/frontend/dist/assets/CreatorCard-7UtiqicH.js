import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-Ll3reC1Q.js";
import { L as LegendTag, R as RankBadge } from "./RankBadge-Da6y8BLL.js";
import { m as motion } from "./proxy-Bw4yEQ8F.js";
import { M as MapPin } from "./map-pin-D9sLShGn.js";
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
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
function formatVotes(votes) {
  const n = typeof votes === "bigint" ? Number(votes) : votes;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}
function avatarGradient(id) {
  const hues = [65, 275, 20, 160, 200, 330, 120];
  const h = hues[id.charCodeAt(0) % hues.length];
  return `linear-gradient(135deg, oklch(0.55 0.20 ${h}), oklch(0.35 0.15 ${h + 30}))`;
}
function CreatorCard({
  creator,
  index = 0,
  onClick
}) {
  const initials = creator.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.35, ease: "easeOut" },
      whileHover: { y: -2 },
      onClick,
      className: "card-elevated rounded-2xl p-3 flex flex-col gap-2.5 cursor-pointer transition-smooth",
      "data-ocid": `creator-card-${creator.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center text-xl font-display font-bold text-foreground overflow-hidden",
              style: {
                background: creator.avatarUrl ? void 0 : avatarGradient(creator.id)
              },
              children: creator.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: creator.avatarUrl,
                  alt: creator.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.96 0.01 60)" }, children: initials })
            }
          ),
          creator.isLegend && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LegendTag, { size: "sm" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground truncate", children: creator.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1 text-xs text-muted-foreground mt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: creator.city })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: creator.rank, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-bold text-accent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 fill-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatVotes(creator.totalVotes) })
          ] })
        ] })
      ]
    }
  );
}
export {
  CreatorCard as C,
  Heart as H
};
