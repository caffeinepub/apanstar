import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Home, Sparkles, Trophy, User, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { INDIAN_CITIES } from "../types";
import CoinDisplay from "./CoinDisplay";

const CITY_KEY = "apanstar_city";

const NAV_ITEMS = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/challenges", label: "Challenges", icon: Trophy },
  { to: "/ai-style", label: "AI Style", icon: Wand2 },
  { to: "/explore", label: "Explore", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function useCity() {
  const [city, setCity] = useState<string>(
    () => localStorage.getItem(CITY_KEY) ?? "Mumbai",
  );
  const handleSetCity = (c: string) => {
    setCity(c);
    localStorage.setItem(CITY_KEY, c);
  };
  return { city, setCity: handleSetCity };
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouterState();
  const { city, setCity } = useCity();
  const [cityOpen, setCityOpen] = useState(false);
  const currentPath = router.location.pathname;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = () => setCityOpen(false);
    if (cityOpen) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [cityOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-3"
        style={{ boxShadow: "0 2px 16px -4px oklch(0 0 0 / 0.5)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0 transition-smooth hover:opacity-90"
          data-ocid="header-logo"
        >
          <img
            src="/assets/generated/apanstar-logo-transparent.dim_200x200.png"
            alt="ApanStar"
            className="w-8 h-8 object-contain"
          />
          <span
            className="font-display font-bold text-xl tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.72 0.22 65), oklch(0.68 0.25 20))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ApanStar
          </span>
        </Link>

        <div className="flex items-center gap-2 ml-auto">
          <CoinDisplay />

          {/* City selector */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Escape") setCityOpen(false);
            }}
          >
            <button
              type="button"
              data-ocid="city-selector"
              onClick={() => setCityOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setCityOpen((v) => !v);
              }}
              className="flex items-center gap-1.5 bg-muted hover:bg-muted/80 border border-border rounded-lg px-3 py-1.5 text-sm font-medium transition-smooth"
            >
              <span className="text-foreground truncate max-w-20">{city}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${cityOpen ? "rotate-180" : ""}`}
              />
            </button>
            {cityOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-popover border border-border rounded-xl shadow-elevated z-50 overflow-hidden">
                <div className="max-h-64 overflow-y-auto scrollbar-hide py-1">
                  {INDIAN_CITIES.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => {
                        setCity(c);
                        setCityOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-smooth hover:bg-muted ${c === city ? "text-primary font-semibold" : "text-foreground"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1 pb-20">{children}</main>

      {/* ── Bottom Navigation ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border px-2 py-1"
        style={{ boxShadow: "0 -4px 20px -4px oklch(0 0 0 / 0.5)" }}
        data-ocid="bottom-nav"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const isActive =
              currentPath === to || (to !== "/" && currentPath.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                data-ocid={`nav-${label.toLowerCase().replace(" ", "-")}`}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-smooth min-w-0 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`relative ${isActive ? "scale-110" : ""} transition-transform duration-200`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "stroke-2" : "stroke-[1.5]"}`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium truncate ${isActive ? "font-bold" : ""}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Footer ── */}
      <footer className="bg-muted/40 border-t border-border py-3 px-4 text-center text-xs text-muted-foreground pb-24">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-smooth"
        >
          Built with love using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
