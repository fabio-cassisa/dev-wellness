# dev wellness

a developer-focused wellness dashboard — focus timer, breathe timer, habit tracker, and mood tracker — with daily persistence and historical stats.

**[→ view live](https://DevWellnessHub.netlify.app)**

## context

built as a collaborative project during the Technigo bootcamp with [kai lee](https://github.com/themisterkai), [kris albert lee](https://github.com/themisterkai), and [antonella morittu](https://github.com/AntonellaMorittu). 174 commits across 4 contributors with a real PR workflow — branching, reviews, merge strategy.

the idea: developers forget to take breaks, track habits, or check in on their mood. this app gives you a simple dashboard with four tools designed around a daily work session. data persists to localStorage so your progress survives refresh.

the UI adapts between mobile (single-page routing) and desktop (three-column layout with vertical menu, dashboard/detail view, and contextual about panel).

## what it does

- **focus timer** — pomodoro-style countdown with start/pause/resume/reset. tracks completed sessions per day. shows yesterday's count and overall daily average from historical data.
- **breathe timer** — guided breathing with a pulsing animation (10s cycle: breathe in → hold → breathe out → hold). CSS `@keyframes` drive the visual rhythm. tracks completed sessions.
- **habit tracker** — 5 daily habits with checkboxes. completion count per day. historical view with yesterday and overall averages.
- **mood tracker** — three sliders (mood, energy, overwhelmed) on a 1–5 scale. combined into a general mood indicator (up/stable/down). daily snapshots saved to history.
- **theme system** — 4 color palettes (dark, light, teal, earth) applied via CSS custom properties set in JS. chosen during setup, changeable in settings.
- **setup wizard** — first-run flow: name → palette → focus timer length → breathe timer length. skipped on return visits via localStorage check.
- **historical data** — all tool states saved to localStorage under date keys (`YYYY-MM-DD`). detailed views show yesterday's data and rolling averages.

## stack

`react 18` · `redux toolkit` · `react-router-dom 6` · `react-circular-progressbar` · `clsx` · `vite 4` · `netlify`

## structure

```
src/
├── pages/
│   ├── DesktopHomepage.jsx    # responsive shell — mobile routes vs desktop 3-column layout
│   ├── Dashboard.jsx          # main dashboard with 4 tile summaries
│   ├── SettingsPage.jsx       # name, timer lengths, color palette, factory reset
│   └── StartPage.jsx          # first-run setup wizard (skipped if localStorage exists)
├── components/
│   ├── FocusTimer/
│   │   ├── FocusTimer.jsx           # dashboard tile (minimized view)
│   │   ├── FocusTimerDetailed.jsx   # full view with controls + historical stats
│   │   ├── FocusTimerRenderless.jsx # tick logic (runs timer in background)
│   │   └── FocusTimerDispatch.js    # start/pause/reset dispatch helpers
│   ├── BreatheTimer/
│   │   ├── BreatheTimer.jsx           # dashboard tile
│   │   ├── BreatheTimerDetailed.jsx   # full view with pulsing animation
│   │   ├── BreatheTimerRenderless.jsx # tick logic
│   │   └── BreatheTimerDispatch.js    # start/reset dispatch helpers
│   ├── HabitTracker/
│   │   ├── HabitTracker.jsx          # dashboard tile (circle indicators)
│   │   └── HabitTrackerDetailed.jsx  # checkbox list + historical stats
│   ├── MoodTracker/
│   │   ├── MoodTracker.jsx           # dashboard tile (up/stable/down indicator)
│   │   └── MoodTrackerDetailed.jsx   # range sliders + historical averages
│   ├── HistoricalCal/                # placeholder — not yet implemented
│   ├── About/                        # contextual info panels (per feature + general)
│   ├── StartPage/                    # setup wizard steps (name, palette, timers)
│   ├── VerticalMenu.jsx              # desktop sidebar navigation
│   └── MobileBTN.jsx                 # mobile navigation buttons
├── reducers/
│   ├── combined.js       # cross-slice SAVE_DATA / LOAD_DATA to localStorage
│   ├── settings.js       # name, palette, timer lengths, factory reset
│   ├── focusTimer.js     # timer state, count, running/paused flags
│   ├── breatheTimer.js   # same pattern as focus timer
│   ├── habits.js         # habit toggle
│   ├── mood.js           # mood/energy/overwhelmed levels
│   └── historical.js     # loads date-keyed entries from localStorage
├── hooks/
│   └── useScreenSize.js  # responsive breakpoint hook (≤767px = mobile)
├── helpers.js            # date utils + color palette definitions
├── assets/
│   └── SVGElements.jsx   # all icons and decorative SVGs as components
├── MasterStyle.css       # global styles, theme variables, responsive breakpoints
├── App.jsx               # setup flow gate → DesktopHomepage
└── main.jsx              # store provider + CSS imports
```

## setup

```bash
npm install
npm run dev
```

## contributors

this was a team project — credit where it's due:

- [kai lee](https://github.com/themisterkai) — 62 commits. core architecture, habit tracker, historical data system, validation, styling
- [fabio cassisa](https://github.com/fabio-cassisa) — 86 commits. focus timer, breathe timer, mood tracker, theme system, setup wizard
- [kris albert lee](https://github.com/themisterkai) — styling, responsive layout, contrast palette
- [antonella morittu](https://github.com/AntonellaMorittu) — contributions

## status

🟢 live — [DevWellnessHub.netlify.app](https://DevWellnessHub.netlify.app)

---

<sub>built by [fabio cassisa](https://github.com/fabio-cassisa) · [kai lee](https://github.com/themisterkai) · [kris albert lee](https://github.com/themisterkai) · [antonella morittu](https://github.com/AntonellaMorittu)</sub>
