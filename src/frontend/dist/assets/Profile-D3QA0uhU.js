import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, i as cn, m as useNavigate, a as useGetMyProfile, g as useGetReferralInfo, e as useListUsersByLocation, S as Skeleton, I as INDIAN_CITIES, T as Trophy, h as ue } from "./index-Ll3reC1Q.js";
import { B as Badge } from "./badge-ZkUs0xR0.js";
import { u as useComposedRefs, m as motion, B as Button } from "./proxy-Bw4yEQ8F.js";
import { I as Input } from "./input-B-ZZANRs.js";
import { L as Label } from "./label-DCGT8vAe.js";
import { P as Primitive, b as composeEventHandlers, c as createContextScope, u as useCallbackRef, a as Presence, X } from "./index-BS7r-aTG.js";
import { c as createCollection, C as Check, U as Upload, a as CircleCheck, b as Copy } from "./index-DRG20UOg.js";
import { u as useId, a as useControllableState } from "./index-DJB4tv1u.js";
import { u as useDirection } from "./index-B4dw8_oW.js";
import { T as Textarea } from "./textarea-QX7ZEGRV.js";
import { C as CreatorCard, H as Heart } from "./CreatorCard-7UtiqicH.js";
import { L as LegendTag, R as RankBadge, S as Star, a as Shield } from "./RankBadge-Da6y8BLL.js";
import { u as useAuth, L as LogIn, M as MessageCircle } from "./use-auth-BcDUH2NJ.js";
import { M as MapPin } from "./map-pin-D9sLShGn.js";
import { C as ChevronRight, L as Lock } from "./lock-DhePo_k3.js";
import { U as Users } from "./users-CkKKh0jE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polygon", { points: "10 8 16 12 10 16 10 8", key: "1cimsy" }]
];
const CirclePlay = createLucideIcon("circle-play", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const RANK_THRESHOLDS = {
  Bronze: 0,
  Silver: 50,
  Gold: 200,
  Platinum: 500
};
const RANK_ORDER = ["Bronze", "Silver", "Gold", "Platinum"];
function getNextRank(rank) {
  const idx = RANK_ORDER.indexOf(rank);
  return idx < RANK_ORDER.length - 1 ? RANK_ORDER[idx + 1] : null;
}
function getRankProgress(rank, votes) {
  const nextRank = getNextRank(rank);
  if (!nextRank) return { percent: 100, remaining: 0, nextRank: null };
  const current = RANK_THRESHOLDS[rank];
  const next = RANK_THRESHOLDS[nextRank];
  const progress = Math.min((votes - current) / (next - current) * 100, 100);
  const remaining = Math.max(next - votes, 0);
  return { percent: Math.max(progress, 0), remaining, nextRank };
}
function avatarGradient(name) {
  const hues = [65, 275, 20, 160, 200, 330];
  const h = hues[name.charCodeAt(0) % hues.length];
  return `linear-gradient(135deg, oklch(0.55 0.22 ${h}), oklch(0.35 0.18 ${h + 40}))`;
}
const SAMPLE_PROFILE = {
  id: "sample-1",
  name: "Rohan_K",
  bio: "Dancer & content creator from Mumbai 💃 | Weekly challenge enthusiast | Gold rank hustler",
  city: "Mumbai",
  district: "Andheri",
  rank: "Gold",
  isLegend: false,
  avatarUrl: void 0,
  totalVotes: BigInt(3800),
  referralCode: "ROHAN7X",
  referralCount: 1,
  unlockedFeatures: false,
  createdAt: BigInt(0)
};
const SAMPLE_SUBMISSIONS = [
  {
    id: "s1",
    challengeId: "c1",
    title: "Bollywood Dance Battle",
    voteCount: BigInt(1240),
    thumbnail: null,
    category: "Dance"
  },
  {
    id: "s2",
    challengeId: "c2",
    title: "Comedy Mimicry Challenge",
    voteCount: BigInt(870),
    thumbnail: null,
    category: "Mimicry"
  },
  {
    id: "s3",
    challengeId: "c3",
    title: "Street Rap Mumbai",
    voteCount: BigInt(420),
    thumbnail: null,
    category: "Singing"
  }
];
const SAMPLE_CITY_CREATORS = [
  {
    id: "c1",
    name: "Nisha_DanceStar",
    city: "Mumbai",
    rank: "Platinum",
    isLegend: true,
    totalVotes: BigInt(25400)
  },
  {
    id: "c2",
    name: "StreetRapper_AJ",
    city: "Mumbai",
    rank: "Gold",
    isLegend: false,
    totalVotes: BigInt(15200)
  },
  {
    id: "c3",
    name: "CookingQueen_Puja",
    city: "Mumbai",
    rank: "Silver",
    isLegend: false,
    totalVotes: BigInt(8900)
  },
  {
    id: "c4",
    name: "MimicryKing_Raj",
    city: "Mumbai",
    rank: "Gold",
    isLegend: false,
    totalVotes: BigInt(7600)
  },
  {
    id: "c5",
    name: "CoderPro_Ananya",
    city: "Mumbai",
    rank: "Bronze",
    isLegend: false,
    totalVotes: BigInt(3200)
  }
];
const MENU_ITEMS = [
  { label: "Analytics Dashboard", icon: ChartNoAxesColumn, badge: "Soon" },
  { label: "Brand Collaborations", icon: Star, badge: "Soon" },
  { label: "Messages", icon: MessageCircle, badge: "0" },
  { label: "Content Moderation", icon: Shield, badge: "Admin" }
];
function StatsRow({
  votes,
  rank,
  uploads,
  unlocked
}) {
  const stats = [
    {
      label: "Total Votes",
      value: Number(votes) >= 1e3 ? `${(Number(votes) / 1e3).toFixed(1)}K` : String(Number(votes)),
      icon: Heart,
      color: "text-accent"
    },
    {
      label: "Rank Level",
      value: rank,
      icon: Trophy,
      color: "text-primary"
    },
    {
      label: "Uploads",
      value: unlocked ? String(uploads) : "🔒",
      icon: Upload,
      color: "text-secondary"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: stats.map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-muted rounded-xl p-3 text-center",
      "data-ocid": `stat-${label.toLowerCase().replace(" ", "-")}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 mx-auto mb-1 ${color}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display font-bold text-base ${color}`, children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight mt-0.5", children: label })
      ]
    },
    label
  )) });
}
function RankProgressBar({
  rank,
  votes
}) {
  const voteNum = Number(votes);
  const { percent, remaining, nextRank } = getRankProgress(rank, voteNum);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl p-4 space-y-2",
      "data-ocid": "rank-progress",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Rank Progress" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank, size: "sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2.5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { width: 0 },
            animate: { width: `${percent}%` },
            transition: { duration: 1, ease: "easeOut", delay: 0.3 },
            className: "h-2.5 rounded-full",
            style: {
              background: "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))"
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: nextRank ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
            remaining.toLocaleString(),
            " votes"
          ] }),
          " ",
          "to reach",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: nextRank })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "🏆 Max rank achieved — You are a Legend!" }) })
      ]
    }
  );
}
function ReferralSection({
  referralCode,
  referralCount,
  isUnlocked
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const progress = Math.min(referralCount / 2 * 100, 100);
  function handleCopy() {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      ue.success("Referral code copied!");
      setTimeout(() => setCopied(false), 2e3);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated rounded-2xl p-4 space-y-3",
      "data-ocid": "referral-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground flex items-center gap-2", children: "🔗 Refer & Unlock" }),
          isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              className: "bg-primary/20 text-primary border-primary/30 gap-1",
              "data-ocid": "unlock-badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                " Unlocked"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "text-muted-foreground gap-1",
              "data-ocid": "lock-badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
                referralCount,
                "/2 friends"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-lg px-3 py-2 flex items-center justify-between min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-primary text-sm tracking-widest truncate", children: referralCode }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleCopy,
              className: "shrink-0 gap-1.5",
              "aria-label": "Copy referral code",
              "data-ocid": "copy-referral-btn",
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                copied ? "Copied!" : "Copy"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${progress}%` },
              transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              className: "h-2 rounded-full",
              style: {
                background: "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary shrink-0" }),
            "Video upload & AI styling are unlocked — go create!"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 shrink-0" }),
            "Invite",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground", children: [
              2 - referralCount,
              " more friend",
              2 - referralCount !== 1 ? "s" : ""
            ] }),
            " ",
            "to unlock video upload & AI styling"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-bold", children: referralCount }),
            " ",
            "successful referral",
            referralCount !== 1 ? "s" : ""
          ] })
        ] })
      ]
    }
  );
}
function SubmissionItem({
  submission,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06 },
      className: "flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-smooth",
      "data-ocid": `submission-${submission.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: submission.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: submission.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-bold text-accent shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3 h-3 fill-current" }),
          Number(submission.voteCount) >= 1e3 ? `${(Number(submission.voteCount) / 1e3).toFixed(1)}K` : String(Number(submission.voteCount))
        ] })
      ]
    }
  );
}
function EditProfileForm({
  profile,
  onClose
}) {
  const [name, setName] = reactExports.useState(profile.name);
  const [bio, setBio] = reactExports.useState(profile.bio);
  const [city, setCity] = reactExports.useState(profile.city);
  function handleSave() {
    ue.success("Profile updated!");
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
      className: "card-elevated rounded-2xl p-4 space-y-4",
      "data-ocid": "edit-profile-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm text-foreground", children: "Edit Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Close edit form",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", className: "text-xs", children: "Creator Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Your creator name",
                className: "h-9 text-sm",
                "data-ocid": "edit-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-bio", className: "text-xs", children: "Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-bio",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                placeholder: "Tell your story...",
                className: "text-sm min-h-16 resize-none",
                "data-ocid": "edit-bio-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-city", className: "text-xs", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "edit-city",
                value: city,
                onChange: (e) => setCity(e.target.value),
                className: "w-full h-9 bg-input border border-input rounded-md px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "edit-city-select",
                children: INDIAN_CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "flex-1",
              onClick: onClose,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "flex-1 gap-1.5",
              onClick: handleSave,
              "data-ocid": "save-profile-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                " Save Changes"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Profile() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useGetMyProfile();
  const { data: referral } = useGetReferralInfo();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const displayProfile = profile ?? SAMPLE_PROFILE;
  const city = displayProfile.city;
  const { data: cityCreators } = useListUsersByLocation(city);
  const topCityCreators = cityCreators ? cityCreators.slice(0, 5) : SAMPLE_CITY_CREATORS;
  const referralData = referral ?? {
    referralCode: displayProfile.referralCode,
    referralCount: displayProfile.referralCount,
    isUnlocked: displayProfile.unlockedFeatures
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-6",
        "data-ocid": "profile-login",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { type: "spring", stiffness: 200, damping: 20 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl font-display font-bold",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.55 0.22 65), oklch(0.35 0.18 275))",
                      color: "oklch(0.96 0.01 60)"
                    },
                    children: "R"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Your Profile" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 max-w-xs", children: "Login with Internet Identity to view your profile, track votes, earn badges & more" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 w-full max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: login,
                className: "h-12 font-bold gap-2 w-full",
                "data-ocid": "login-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  " Login with Internet Identity"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => navigate({ to: "/onboarding" }),
                className: "w-full",
                "data-ocid": "onboarding-btn",
                children: "New here? Setup Profile"
              }
            )
          ] })
        ]
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" })
    ] });
  }
  const initials = displayProfile.name.split(/[_\s]/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto px-4 py-4 space-y-4 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        className: "card-elevated rounded-2xl p-5 space-y-4",
        "data-ocid": "profile-card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display font-bold overflow-hidden",
                  style: {
                    background: displayProfile.avatarUrl ? void 0 : avatarGradient(displayProfile.name),
                    color: "oklch(0.96 0.01 60)"
                  },
                  children: displayProfile.avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: displayProfile.avatarUrl,
                      alt: displayProfile.name,
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: initials })
                }
              ),
              displayProfile.isLegend && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2 -right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LegendTag, { size: "sm" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground leading-tight truncate", children: displayProfile.name }),
                displayProfile.isLegend && /* @__PURE__ */ jsxRuntimeExports.jsx(LegendTag, {})
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  displayProfile.district,
                  ", ",
                  displayProfile.city
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank: displayProfile.rank, size: "sm" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsEditing((v) => !v),
                className: "shrink-0 p-2 rounded-xl bg-muted hover:bg-muted/80 transition-smooth",
                "aria-label": "Edit profile",
                "data-ocid": "edit-profile-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-4 h-4 text-muted-foreground" })
              }
            )
          ] }),
          displayProfile.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: displayProfile.bio })
        ]
      }
    ),
    isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileForm,
      {
        profile: displayProfile,
        onClose: () => setIsEditing(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.08 },
        "data-ocid": "stats-row",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatsRow,
          {
            votes: displayProfile.totalVotes,
            rank: displayProfile.rank,
            uploads: SAMPLE_SUBMISSIONS.length,
            unlocked: displayProfile.unlockedFeatures
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.14 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          RankProgressBar,
          {
            rank: displayProfile.rank,
            votes: displayProfile.totalVotes
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReferralSection,
          {
            referralCode: referralData.referralCode ?? displayProfile.referralCode,
            referralCount: referralData.referralCount ?? displayProfile.referralCount,
            isUnlocked: referralData.isUnlocked ?? displayProfile.unlockedFeatures
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.26 },
        "data-ocid": "profile-tabs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "submissions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-muted rounded-xl p-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "submissions",
                className: "flex-1 text-xs data-[state=active]:bg-card data-[state=active]:text-foreground",
                "data-ocid": "tab-submissions",
                children: "My Submissions"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "city",
                className: "flex-1 text-xs data-[state=active]:bg-card data-[state=active]:text-foreground",
                "data-ocid": "tab-city",
                children: "My City Creators"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "submissions", className: "mt-3 space-y-2", children: SAMPLE_SUBMISSIONS.length > 0 ? SAMPLE_SUBMISSIONS.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionItem, { submission: sub, index: i }, sub.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-10 space-y-3",
              "data-ocid": "submissions-empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-10 h-10 text-muted-foreground mx-auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No submissions yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => navigate({ to: "/challenges" }),
                    children: "Join a Challenge"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "city", className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground", children: [
                "Top creators in ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: city })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-5", children: topCityCreators.map((creator, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CreatorCard, { creator, index: i }, creator.id)) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.32 },
        className: "card-elevated rounded-2xl overflow-hidden divide-y divide-border",
        "data-ocid": "feature-menu",
        children: MENU_ITEMS.map(({ label, icon: Icon, badge }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-smooth text-left",
            "data-ocid": `menu-${label.toLowerCase().replace(/ /g, "-")}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium text-foreground", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${badge === "Soon" ? "bg-muted text-muted-foreground" : badge === "Admin" ? "bg-secondary/20 text-secondary-foreground" : "bg-primary/20 text-primary"}`,
                  children: badge
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
            ]
          },
          label
        ))
      }
    )
  ] });
}
export {
  Profile as default
};
