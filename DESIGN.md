# Design Brief: ApanStar

## Direction & Purpose
Vibrant, youthful India-inspired short-video platform for micro-influencers and skill-based challenges. Dark mode social feed with energetic gamification UI. Users discover local talent by city, vote with coins, earn rank badges, and compete in weekly challenges. Design serves celebration of emerging creators.

## Tone & Aesthetic
Bold, energetic, culturally confident. Premium but accessible. Playful gamification paired with clean information hierarchy. Micro-interactions reward engagement. No corporate coldness; celebrate the performer and community.

## Differentiation
**Gamification Hierarchy**: Bronze/Silver/Gold/Platinum badges with distinct color coding separate rank tiers. **Hyper-Local Tags**: City/district badges on creator cards establish geographic pride. **Coin Voting UI**: Celebratory counters and visual feedback on vote actions. **Challenge Categories**: Gaming, Singing, Mimicry, Coding, Cooking each get visual distinction.

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-------------|-----------|---------|
| Primary | 0.65 0.22 65 (Warm Orange) | 0.72 0.22 65 | Energetic primary, India-inspired warmth |
| Secondary | 0.35 0.18 275 (Deep Indigo) | 0.50 0.18 275 | Trust, rank progression, leaderboards |
| Accent | 0.60 0.25 20 (Vibrant Coral) | 0.68 0.25 20 | CTAs, vote buttons, highlight actions |
| Muted | 0.92 0.01 60 (Light Neutral) | 0.22 0.02 60 | Secondary backgrounds, disabled states |
| Success | 0.58 0.20 160 (Emerald) | 0.70 0.20 160 | Legend tag, achievement unlock |
| Destructive | 0.55 0.22 25 (Red) | 0.65 0.19 22 | Error, warning states |
| Background | 0.96 0.01 60 (Cream) | 0.12 0.02 60 | Primary surface (light/dark) |
| Card | 0.98 0.01 60 (White) | 0.16 0.02 60 | Elevated containers |

## Typography
**Display**: Bricolage Grotesque — bold, geometric, youthful. Rank badges, hero headlines, challenge titles.  
**Body**: DM Sans — clean, hyper-readable, friendly. Content, descriptions, metadata.  
**Mono**: Geist Mono — code, stats, leaderboard rank numbers, video effect presets.

## Elevation & Depth
**3-tier shadow hierarchy**: `shadow-card` (light surface elevation), `shadow-elevated` (prominent cards/popovers), `shadow-badge` (accent highlights). Dark mode maintains depth through lightness shift, not opacity hacks. Card borders use `border-border` for subtle definition.

## Structural Zones

| Zone | Light Treatment | Dark Treatment | Purpose |
|------|-----------------|-----------------|---------|
| Header | `bg-card border-b border-border` | `bg-card border-b border-border` | Sticky city selector, profile icon. Persistent navigation. |
| Hero Feed | `bg-background` with `bg-card` containers | `bg-background` with `bg-card` containers | Creator cards, challenge feed, video thumbnails. Full-width scroll. |
| Leaderboard | Tiered `bg-muted` backgrounds for rank tiers | Tiered `bg-muted` backgrounds for rank tiers | Rank 1 darkest, rank 10 lightest. Badge badges via utility classes. |
| Unlock Gate | `bg-card` with `border-primary` overlay | `bg-card` with `border-primary` overlay | Referral tracker, copy button for invite code. Centered modal. |
| Bottom Nav | `bg-card border-t border-border` | `bg-card border-t border-border` | Tab icons: Home, Discover, Challenge, Create, Profile. Sticky. |

## Spacing & Rhythm
**Token**: `--radius: 0.5rem`. Apply to buttons, badges, cards.  
**Density**: Compact on leaderboards (badges inline), generous on feed (video cards get breathing room).  
**Spacing scale**: 4px, 8px, 12px, 16px, 24px. Maintain consistent gutters in grid layouts.

## Component Patterns
**Vote Button**: `button-vote` utility — coral accent, rounded-lg, hover opacity fade.  
**Badge Stack**: `.badge-{bronze|silver|gold|platinum|legend}` utilities via Tailwind. Inline-flex, rounded-md, distinct color per rank.  
**Creator Card**: `card-elevated` base + creator avatar, name, rank badge, city tag, coin count, legend tag if earned.  
**Challenge Card**: Category label (Gaming, Singing, etc.), thumbnail, leaderboard preview, "View Challenge" CTA.

## Motion & Animation
**Entrance**: `animate-badge-pop` on new badges/achievements (0.4s cubic-bezier scale + fade).  
**Ambient**: `animate-float` on decorative elements (3s ease-in-out).  
**Feedback**: `animate-pulse-soft` on vote counters (2s). `transition-smooth` on all interactive elements.  
**No bouncy easing**: Avoid overdone bounce; use cubic-bezier(0.34, 1.56, 0.64, 1) sparingly for impact moments only.

## Signature Detail
**Rank Badge Animation**: When user earns new rank, badge scales and fades in with celebratory entrance. Leaderboard numbers use monospace for precision, visual distinction from body text. City names beside creator avatars serve hyper-local pride.

## Constraints
- **No generic default shadows**: All shadows custom-tuned to dark mode readability.
- **Gamification clarity**: Rank tiers must be instantly recognizable by color + icon.
- **Mobile-first**: Card-based layout works from 320px up. Tab nav expands to sidebar on tablet+.
- **Accessibility**: All coin/vote counters have ARIA labels. Rank badges use distinct colors + text, not color alone.
