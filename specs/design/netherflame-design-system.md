# Netherflame Combat Archive: design system

Source: the Google Stitch project "Mortal Kombat Finishers Archive" (screens: Fatalities, Brutalities, About), saved here as the written design system. The screens themselves are not copied into the repository: they contain game artwork, which this project does not use. The rules below are the reference for every screen.

---
name: Netherflame Combat Archive
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#e6bdb8'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#ac8884'
  outline-variant: '#5c403c'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690005'
  primary-container: '#dc2626'
  on-primary-container: '#fff6f5'
  inverse-primary: '#bf0715'
  secondary: '#ffb77d'
  on-secondary: '#4d2600'
  secondary-container: '#d97707'
  on-secondary-container: '#432100'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#d63135'
  on-tertiary-container: '#fff6f5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000b'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-hero:
    fontFamily: Bebas Neue
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.06em
  display-hero-mobile:
    fontFamily: Bebas Neue
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: 0.04em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 34px
    letterSpacing: 0.04em
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 26px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: 0.04em
  headline-sm:
    fontFamily: Bebas Neue
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.03em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system channels an uncompromising, visceral, cinematic fighting-game aesthetic built for arcade aficionados, tournament competitors, and lore archivists. It draws heavily from high-stakes tournament combat, grimdark fantasy, and tactile arcade HUD machinery. The mood is dark, menacing, and electric with lethal tension—reminiscing the atmospheric menace of the Netherrealm, molten fire, and cold surgical steel.

The design movement synthesizes **High-Contrast Brutalism** with **Cinematic Skeuomorphic Elements**:
- **Raw Combat Brutalism:** Hard 45-degree chamfers, sharp angular edges, heavy bordering, monospaced battle metrics, and aggressive typographic hierarchy.
- **Atmospheric Arcade Skeuomorphism:** Subtle metallic bevels, forged bronze trims, smoldering ember underglows, and deep vignetted backdrop gradients that feel like an authentic fighting-game cabinet or next-generation pause menu.
- **Visceral Tension:** Deep shadows and pitch-black abyssal planes punctuated by surgical cuts of crimson red and molten amber fire.

## Colors

The palette establishes an aggressive hierarchy steeped in lethal contrast. Pitch-black charcoal surfaces allow explosive crimson and weathered bronze to function with theatrical urgency.

- **Background & Canvas:**
  - `Canvas Base`: `#0A0A0C` (absolute void black with a cold blue-grey undertone)
  - `Surface Tier 1`: `#111116` (charcoal obsidian for primary cards and modular panels)
  - `Surface Tier 2`: `#18181F` (raised panel elevation, interactive containers, and modal dialogs)
  - `Surface Border / Inset`: `#272732` (dark gunmetal for structural division)

- **Primary (Blood Crimson):**
  - `Primary Default`: `#DC2626` (ferocious crimson for critical triggers, Fatality badges, and active state highlights)
  - `Primary Dark`: `#991B1B` (deep coagulated blood tone for button pressed states, inset borders, and gradient stops)
  - `Primary Glow`: `#EF4444` (radiant searing arterial red for neon edge accents and hover states)

- **Secondary (Weathered Relic Gold & Bronze):**
  - `Secondary Default`: `#D97706` (tarnished bronze-gold for trophy ranks, Brutality indicators, and combo notation highlights)
  - `Secondary Bright`: `#F59E0B` (forged amber flame for high-tier masteries and active tab indicator underlines)
  - `Secondary Deep`: `#B45309` (weathered bronze for frame trims and muted stat counters)

- **Text & Feedback:**
  - `Text Primary`: `#F4F4F5` (crisp bone white with 95% opacity for maximum legibility against pitch backgrounds)
  - `Text Secondary`: `#A1A1AA` (weathered ash for descriptions, frame data notes, and secondary properties)
  - `Text Muted`: `#52525B` (darkened cinder for disabled stats and inactive indices)

## Typography

The typographic strategy splits dramatically between aggressive, theatrical spectacle and high-precision tournament readouts:

- **Display & Headlines (`Bebas Neue`):** All major headings are condensed, commanding, and rendered strictly in `UPPERCASE`. They evoke fighting game victory screens, character announcement splashes, and "FINISH HIM" callouts. A subtle positive letter spacing (`0.03em` to `0.06em`) balances the condensed verticality.
- **Body & Controls (`Space Grotesk`):** Technical, sharp, and geometric. Provides immediate clarity for move inputs (e.g., `Down, Back, Forward, Punch`), frame data breakdowns, distance requirements, and lore archives without losing the futuristic arcade edge.
- **Arcade Input Micro-Labels:** Move lists and inputs should utilize `label-sm` or `label-md` with `text-transform: uppercase` and tracking to preserve readability in small controller badges.

## Layout & Spacing

The layout model is an armored 12-column grid system built around tight gutters and sharp framing to emulate arcade HUD containers and tournament bracket rosters.

- **Breakpoints:**
  - **Desktop (1200px+):** 12 columns, `gutter: 1.25rem`, `margin: 2rem`. Maximum container width is pinned at `1440px` to maintain a dense, tactical fighting-game feel.
  - **Tablet (768px – 1199px):** 8 columns, `gutter: 1rem`, `margin: 1.5rem`. Side-by-side moves and preview cards collapse to 4-column pairing.
  - **Mobile (< 768px):** 4 columns, `gutter-mobile: 0.75rem`, `margin-mobile: 1rem`. Stacks fighter rosters into vertically scrollable fighter strips and single-column finisher feeds.

- **Spacing Rhythm:**
  - Move execution strips use dense `space-xs` and `space-sm` gaps to group multi-button strings seamlessly.
  - Combat cards utilize `space-md` internal padding with hard structural boundaries.
  - Section blocks and combat arena showcases leverage `space-xl` for breathability between brutal action modules.

## Elevation & Depth

Visual hierarchy is communicated through **smoldering back-glows**, **chiseled metallic bevels**, and **smoky vignettes**, rather than standard diffuse drop shadows.

- **Base Elevation (Background Grounding):**
  - Surface layers sink into `#0A0A0C` via radial gradient vignettes (`radial-gradient(ellipse at top, #1A0D0D 0%, #0A0A0C 75%)`).
- **Mid Elevation (Combat Cards & Panels):**
  - Surfaces use `#111116` with a hard 1px outer rim (`border: 1px solid #272732`) and a fine 1px inset highlight (`box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`).
- **Interactive & High Elevation (Active Finishers / Selected Fighters):**
  - Panels cast a violent crimson or molten ember glow:
    - *Fatality State:* `box-shadow: 0 0 24px -4px rgba(220, 38, 38, 0.4), inset 0 0 12px 0 rgba(220, 38, 38, 0.15)`
    - *Brutality State:* `box-shadow: 0 0 24px -4px rgba(217, 119, 6, 0.4), inset 0 0 12px 0 rgba(217, 119, 6, 0.15)`
- **Atmospheric Smoke & Embers:**
  - Layer background overlays using noise textures with 3–5% opacity and faint floating ember particles to reinforce the Netherrealm heat.

## Shapes

The shape system is strictly **Sharp (`0`)**, reflecting forged blades, martial armor plating, and arcade hardware. 

- **Hard Angles & Clipped Corners:** True fighting games rely on razor edges. Zero radius (`roundedness: 0`) is applied by default across all buttons, cards, tags, and inputs.
- **Chamfered Cuts:** Key focal elements—such as primary action triggers, hero banners, and active fighter portrait cards—employ chamfered 45-degree corner clips using CSS `clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)`.
- **Divider Lines:** Slanted 45-degree tick marks and beveled vertical dividers separate attack sequences and frame notation cells.

## Components

### Buttons & Interactive Triggers
- **Primary Finish Trigger ("FINISH HIM / FATALITY"):**
  - Shape: Razor sharp (`roundedness: 0`), optionally chamfered top-left and bottom-right corners.
  - Background: Crimson red `#DC2626` transitioning to `#991B1B` on a subtle vertical gradient.
  - Border: 1px solid `#EF4444`.
  - Typography: `headline-sm`, uppercase, letter-spaced.
  - Hover: Searing red glow `box-shadow: 0 0 20px rgba(239, 68, 68, 0.6)`. Inset white top border highlight.
  - Active: Drops down 1px, background shifts to `#7F1D1D`.
- **Secondary Arcade Trigger ("BRUTALITY / VIEW COMBOS"):**
  - Background: Weathered bronze/amber gradient (`#B45309` to `#78350F`) with 1px solid `#F59E0B`.
  - Typography: `headline-sm`, uppercase.
  - Hover: Fiery golden glow `box-shadow: 0 0 18px rgba(245, 158, 11, 0.5)`.
- **Ghost / Outlined Combat Action:**
  - Background: Transparent with `#111116` interior fill on hover.
  - Border: 1px solid `#3F3F46`.
  - Typography: `label-lg`, `#F4F4F5`.

### Finisher & Move Cards
- **Fatality / Brutality Archive Card:**
  - Background: `#111116` charcoal base with subtle metallic sheen gradient.
  - Border: 1px solid `#272732`. When expanded or active, changes to crimson (`#DC2626`) or bronze (`#D97706`).
  - Header: Contains move name in `headline-md`, execution range badge (Close, Mid, Full Screen), and finisher type emblem.
  - Input Sequence Bar: Dark inset row (`#0A0A0C`) with directional d-pad and face button glyphs housed in high-contrast metallic squares.
  - Video / Animation Preview Container: 16:9 slot bordered by industrial bracket marks at the corners.

### D-Pad & Attack Notation Chips
- **Button / Input Chips:**
  - Dimensions: Fixed 32x32px or 36x36px sharp squares.
  - Surface: Inset gunmetal `#1F1F28` with 1px border `#3F3F46`.
  - Content: Directional arrows (`←`, `↓`, `→`, `↑`) in `#F4F4F5` or attack numbers (`1`, `2`, `3`, `4`) color-coded to standard fighting notations (Punch, Kick, Block, Stance Flip).

### Category Chips & Character Filters
- **Filter Chips:**
  - Sharp rectangular tags with `label-sm` typography.
  - Unselected: Dark `#18181F`, border `#272732`, text `#A1A1AA`.
  - Selected: Crimson `#DC2626` with bold bone-white text `#F4F4F5` and a red box-shadow indicator.

### Search & Move Filters (Input Fields)
- **Search Input:**
  - Background: `#0E0E13` (sunken tier).
  - Border: 1px solid `#272732`.
  - Focus State: Border transitions to `#DC2626` with a faint `box-shadow: 0 0 12px rgba(220, 38, 38, 0.3)`.
  - Placeholder: `#52525B` in `Space Grotesk`. Left icon features a crosshair or arcade targeting reticle.

### HUD Data & Frame Lists
- **Frame Data & Condition Table:**
  - Alternating row zebra fills: `#111116` and `#14141B`.
  - Headers: `label-sm`, uppercase, `#D97706` (weathered gold) with bottom gunmetal border.
  - Values: Monospaced numeric rendering for startup frames, active frames, and recovery windows.
