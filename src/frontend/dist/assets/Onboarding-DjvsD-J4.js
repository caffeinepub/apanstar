import { c as createLucideIcon, m as useNavigate, t as useRegisterUser, r as reactExports, j as jsxRuntimeExports, I as INDIAN_CITIES, U as User, h as ue } from "./index-Ll3reC1Q.js";
import { m as motion, B as Button } from "./proxy-Bw4yEQ8F.js";
import { I as Input } from "./input-B-ZZANRs.js";
import { L as Label } from "./label-DCGT8vAe.js";
import { T as Textarea } from "./textarea-QX7ZEGRV.js";
import { M as MapPin } from "./map-pin-D9sLShGn.js";
import { A as ArrowRight } from "./arrow-right-CbMxP2xG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const STEP_LABELS = ["Pick City", "Your Name", "Your Bio"];
function Onboarding() {
  const navigate = useNavigate();
  const { mutateAsync: register, isPending } = useRegisterUser();
  const [step, setStep] = reactExports.useState(0);
  const [city, setCity] = reactExports.useState("");
  const [district, setDistrict] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  async function handleFinish() {
    if (!name.trim()) {
      ue.error("Please enter your name");
      return;
    }
    try {
      await register({
        name: name.trim(),
        bio: bio.trim(),
        city,
        district: district.trim() || city
      });
      ue.success("Welcome to ApanStar! 🌟");
      navigate({ to: "/" });
    } catch {
      ue.error("Something went wrong. Please try again.");
    }
  }
  function handleNext() {
    if (step === 0 && !city) {
      ue.error("Please select your city");
      return;
    }
    if (step === 1 && !name.trim()) {
      ue.error("Please enter your name");
      return;
    }
    setStep((s) => s + 1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 pt-10 pb-6 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/assets/generated/apanstar-logo-transparent.dim_200x200.png",
          alt: "ApanStar",
          className: "w-12 h-12"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-display font-extrabold text-3xl",
          style: {
            background: "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          },
          children: "ApanStar"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 px-6 mb-8", children: STEP_LABELS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/20 border-2 border-primary text-primary" : "bg-muted text-muted-foreground"}`,
            children: i < step ? "✓" : i + 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[10px] font-medium hidden sm:block ${i === step ? "text-primary" : "text-muted-foreground"}`,
            children: label
          }
        )
      ] }),
      i < STEP_LABELS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-0.5 mb-3 rounded transition-smooth ${i < step ? "bg-primary" : "bg-border"}`
        }
      )
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 max-w-md mx-auto w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -30 },
          transition: { duration: 0.3, ease: "easeOut" },
          children: [
            step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-primary mx-auto mb-2 animate-float" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Where are you from?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "We'll show you creators from your area" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select City *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-2 gap-2 max-h-60 overflow-y-auto scrollbar-hide pr-1",
                    "data-ocid": "city-grid",
                    children: INDIAN_CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setCity(c),
                        className: `px-3 py-2.5 rounded-xl text-sm font-medium border transition-smooth text-left ${city === c ? "bg-primary/20 border-primary text-primary font-bold" : "bg-card border-border text-foreground hover:border-primary/50"}`,
                        "data-ocid": `city-option-${c.toLowerCase()}`,
                        children: c
                      },
                      c
                    ))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "district", children: "District (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "district",
                    value: district,
                    onChange: (e) => setDistrict(e.target.value),
                    placeholder: "e.g., Andheri, Bandra...",
                    className: "bg-card border-border",
                    "data-ocid": "district-input"
                  }
                )
              ] })
            ] }),
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-10 h-10 text-primary mx-auto mb-2 animate-float" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "What's your name?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This is how other creators will know you" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "creator-name", children: "Creator Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "creator-name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "e.g., Rohan_DanceStar",
                    maxLength: 40,
                    className: "bg-card border-border text-lg h-12",
                    autoFocus: true,
                    "data-ocid": "name-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                  name.length,
                  "/40"
                ] })
              ] })
            ] }),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-10 h-10 text-primary mx-auto mb-2 animate-float" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Tell your story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Let people know what you're about" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", children: "Bio (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "bio",
                    value: bio,
                    onChange: (e) => setBio(e.target.value),
                    placeholder: "e.g., Local dance champion from Mumbai 💃 | Weekly challenge winner...",
                    maxLength: 160,
                    rows: 4,
                    className: "bg-card border-border resize-none",
                    "data-ocid": "bio-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
                  bio.length,
                  "/160"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-2xl p-4 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground", children: name || "Your Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  city,
                  district ? `, ${district}` : ""
                ] }),
                bio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: bio })
              ] })
            ] })
          ]
        },
        step
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pb-10", children: step < 2 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleNext,
          className: "w-full h-12 font-bold text-base gap-2",
          "data-ocid": "onboarding-next",
          children: [
            "Continue ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleFinish,
          disabled: isPending,
          className: "w-full h-12 font-bold text-base gap-2",
          "data-ocid": "onboarding-finish",
          style: {
            background: "linear-gradient(135deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))"
          },
          children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            " Joining..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Join ApanStar ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🌟" })
          ] })
        }
      ) })
    ] })
  ] });
}
export {
  Onboarding as default
};
