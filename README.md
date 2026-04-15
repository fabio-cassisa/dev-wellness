# dev wellness

a developer-focused wellness dashboard — focus timer, breathe timer, habit tracker, and mood tracker — with daily persistence, historical stats, and a weekly summary.

**[→ view live](https://dev-wellness.vercel.app)**

## context

built as a collaborative project during the Technigo bootcamp with [kai lee](https://github.com/themisterkai), [kris albert lee](https://github.com/themisterkai), and [antonella morittu](https://github.com/AntonellaMorittu). 200+ commits across 4 contributors with a real PR workflow — branching, reviews, merge strategy.

the idea: developers forget to take breaks, track habits, or check in on their mood. this app gives you a simple dashboard with four tools designed around a daily work session. data persists to localStorage so your progress survives refresh.

the UI adapts across three breakpoints — mobile (single-column + bottom nav), tablet (two-column + bottom nav), and desktop (three-column bento layout with sidebar nav and context panel). no scrolling on the desktop dashboard — it fills the window edge-to-edge.

## what it does

- **focus timer** — pomodoro-style countdown with start/pause/resume/reset. tracks completed sessions per day. shows yesterday's count and overall daily average from historical data.
- **breathe timer** — guided breathing with a pulsing animation (10s cycle: breathe in → hold → breathe out → hold). CSS `@keyframes` drive the visual rhythm. tracks completed sessions. pause/resume support.
- **habit tracker** — 5 daily habits with checkboxes. completion count per day. historical view with yesterday and overall averages.
- **mood tracker** — three sliders (mood, energy, overwhelmed) on a 1–5 scale. combined into a general mood indicator (up/stable/down). daily snapshots saved to history.
- **weekly summary** — 7-day dot charts for all four tools, streak counter, combined activity overview.
- **theme system** — 4 color palettes (dark, light, teal, earth) applied via CSS custom properties set in JS. chosen during setup, changeable in settings. danger colors use semantic CSS variables.
- **setup wizard** — first-run flow: name → palette → focus timer length → breathe timer length. skipped on return visits via localStorage check.
- **historical data** — all tool states saved to localStorage under date keys (`YYYY-MM-DD`). detailed views show yesterday's data and rolling averages.
- **context panel** — desktop/tablet sidebar showing route-specific stats, streaks, and about-page info alongside the main content.
- **accessibility** — keyboard-navigable timer controls (Enter/Space), focus-trapped confirm dialog with Escape-to-close, `aria-label` on interactive elements.
- **error boundary** — app-level crash recovery with a clean reload screen.

## stack

`react 18` · `redux toolkit` · `react-router-dom 6` · `react-circular-progressbar` · `clsx` · `vite 4` · `vercel`

## structure

```
src/
├── pages/
│   ├── DesktopHomepage.jsx    # responsive shell — 3 render branches (mobile/tablet/desktop)
│   ├── Dashboard.jsx          # main dashboard with 4 tile summaries + streak badge
│   ├── WeeklySummary.jsx      # 7-day dot charts for all tools
│   ├── SettingsPage.jsx       # name, timer lengths, color palette, factory reset
│   └── StartPage.jsx          # first-run setup wizard (skipped if localStorage exists)
├── components/
│   ├── FocusTimer/
│   │   ├── FocusTimer.jsx           # dashboard tile (minimized view)
│   │   ├── FocusTimerDetailed.jsx   # full view with controls + historical stats
│   │   └── FocusTimerDispatch.js    # start/pause/reset dispatch helpers
│   ├── BreatheTimer/
│   │   ├── BreatheTimer.jsx           # dashboard tile
│   │   ├── BreatheTimerDetailed.jsx   # full view with pulsing animation + pause/resume
│   │   └── BreatheTimerDispatch.js    # start/pause/reset dispatch helpers
│   ├── HabitTracker/
│   │   ├── HabitTracker.jsx          # dashboard tile (circle indicators)
│   │   └── HabitTrackerDetailed.jsx  # checkbox list + historical stats
│   ├── MoodTracker/
│   │   ├── MoodTracker.jsx           # dashboard tile (up/stable/down indicator)
│   │   └── MoodTrackerDetailed.jsx   # range sliders + historical averages
│   ├── ContextPanel/               # route-specific stats sidebar (desktop/tablet)
│   ├── About/                      # contextual info panels (per feature + general)
│   ├── StartPage/                  # setup wizard steps (name, palette, timers)
│   ├── VerticalMenu.jsx            # desktop sidebar navigation (NavLink with active state)
│   ├── MobileBottomNav.jsx         # mobile + tablet bottom navigation
│   ├── ConfirmDialog.jsx           # focus-trapped modal with Escape support
│   ├── ErrorBoundary.jsx           # app-level crash recovery
│   ├── WeekDots.jsx                # 7-day dot indicator component
│   ├── EmptyState.jsx              # friendly empty state for missing historical data
│   └── Toast.jsx                   # transient notification
├── reducers/
│   ├── combined.js       # cross-slice SAVE_DATA / LOAD_DATA to localStorage
│   ├── settings.js       # name, palette, timer lengths, factory reset
│   ├── focusTimer.js     # timer state, count, running/paused flags
│   ├── breatheTimer.js   # same pattern as focus timer
│   ├── habits.js         # habit toggle
│   ├── mood.js           # mood/energy/overwhelmed levels
│   └── historical.js     # loads date-keyed entries from localStorage
├── hooks/
│   ├── useScreenSize.js      # responsive breakpoint hook (mobile/tablet/desktop)
│   ├── useFocusTimerTick.js  # focus timer interval logic
│   └── useBreatheTimerTick.js # breathe timer interval logic
├── helpers.js            # date utils, color palette definitions, time formatting
├── assets/
│   └── SVGElements.jsx   # icons and decorative SVGs as components
├── MasterStyle.css       # global styles, theme variables, semantic colors, responsive breakpoints
├── App.jsx               # setup flow gate → DesktopHomepage
└── main.jsx              # store provider, error boundary, CSS imports
```

## setup

```bash
npm install
npm run dev
```

## contributors

this was a team project — credit where it's due:

- [fabio cassisa](https://github.com/fabio-cassisa) — 115 commits. focus timer, breathe timer, mood tracker, theme system, setup wizard, desktop layout, responsive breakpoints, context panel, weekly summary, accessibility, full codebase audit
- [kai lee](https://github.com/themisterkai) — 25 commits. core architecture, habit tracker, historical data system, validation
- [kris albert lee](https://github.com/themisterkai) — 62 commits. styling, responsive layout, contrast palette
- [antonella morittu](https://github.com/AntonellaMorittu) — contributions

## status

🟢 live — [dev-wellness.vercel.app](https://dev-wellness.vercel.app)

---

<sub>built by [fabio cassisa](https://github.com/fabio-cassisa) · [kai lee](https://github.com/themisterkai) · [kris albert lee](https://github.com/themisterkai) · [antonella morittu](https://github.com/AntonellaMorittu)</sub>
