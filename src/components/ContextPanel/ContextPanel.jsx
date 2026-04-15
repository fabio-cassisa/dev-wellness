// ContextPanel — desktop-only right sidebar that shows route-aware live data
// Replaces the old static AboutPage 3rd column
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRecentDays, getYesterdayDate, calculateStreak, millisToMinutesAndSeconds } from '../../helpers';
import { WeekDots } from '../WeekDots';
import './ContextPanel.css';

const DashboardContext = () => {
  const settings = useSelector(s => s.settings);
  const historical = useSelector(s => s.historical.historicalData);
  const focusTimer = useSelector(s => s.focusTimer);
  const breatheTimer = useSelector(s => s.breatheTimer);
  const habits = useSelector(s => s.habits.habits);
  const streak = calculateStreak(historical);

  const habitsCompleted = habits.filter(h => h.isComplete).length;
  const totalDays = Object.keys(historical).length;

  return (
    <>
      <h2 className="ctx-title">Today</h2>
      <div className="ctx-stat-grid">
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{focusTimer.focusTimerCount}</span>
          <span className="ctx-stat-label">Focus sessions</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{breatheTimer.breatheTimerCount}</span>
          <span className="ctx-stat-label">Breathe sessions</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{habitsCompleted}/{habits.length}</span>
          <span className="ctx-stat-label">Habits done</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{streak > 0 ? `${streak}d` : '—'}</span>
          <span className="ctx-stat-label">Streak</span>
        </div>
      </div>
      {totalDays > 0 && (
        <p className="ctx-hint">{totalDays} day{totalDays !== 1 ? 's' : ''} tracked so far. Keep showing up.</p>
      )}
      <p className="ctx-tip">
        <strong>Tip:</strong> {settings.focusTimerLengthMS >= 25 * 60 * 1000
          ? 'Long focus sessions work best with a break in between.'
          : 'Short timers are great for building the habit. Increase duration when ready.'}
      </p>
    </>
  );
};

const FocusContext = () => {
  const historical = useSelector(s => s.historical.historicalData);
  const focusTimer = useSelector(s => s.focusTimer);
  const focusTimerLengthMS = useSelector(s => s.settings.focusTimerLengthMS);
  const yesterdayDate = getYesterdayDate();
  const dataYesterday = historical[yesterdayDate];
  const recentDays = getRecentDays(historical);

  // Personal best (most sessions in a single day)
  let personalBest = 0;
  Object.values(historical).forEach(day => {
    if (day.focusTimer?.focusTimerCount > personalBest) {
      personalBest = day.focusTimer.focusTimerCount;
    }
  });

  const weekDots = recentDays.map(day => ({
    dayLabel: day.dayLabel,
    value: day.data ? Math.min(day.data.focusTimer.focusTimerCount / 4, 1) : 0,
    display: day.data ? `${day.data.focusTimer.focusTimerCount} sessions` : undefined,
  }));

  return (
    <>
      <h2 className="ctx-title">Focus</h2>
      <div className="ctx-stat-grid">
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{focusTimer.focusTimerCount}</span>
          <span className="ctx-stat-label">Today</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{dataYesterday?.focusTimer?.focusTimerCount ?? '—'}</span>
          <span className="ctx-stat-label">Yesterday</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{personalBest || '—'}</span>
          <span className="ctx-stat-label">Best day</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{millisToMinutesAndSeconds(focusTimerLengthMS)}</span>
          <span className="ctx-stat-label">Timer length</span>
        </div>
      </div>
      <WeekDots days={weekDots} label="Last 7 days" />
      {focusTimer.isFocusTimerRunning && !focusTimer.isFocusTimerPaused && (
        <p className="ctx-hint ctx-active">Session in progress — stay focused.</p>
      )}
      {focusTimer.isFocusTimerPaused && (
        <p className="ctx-hint">Paused. Click the timer to resume.</p>
      )}
    </>
  );
};

const BreatheContext = () => {
  const historical = useSelector(s => s.historical.historicalData);
  const breatheTimer = useSelector(s => s.breatheTimer);
  const breatheTimerLengthMS = useSelector(s => s.settings.breatheTimerLengthMS);
  const yesterdayDate = getYesterdayDate();
  const dataYesterday = historical[yesterdayDate];
  const recentDays = getRecentDays(historical);

  let totalSessions = 0;
  Object.values(historical).forEach(day => {
    totalSessions += day.breatheTimer?.breatheTimerCount || 0;
  });

  const weekDots = recentDays.map(day => ({
    dayLabel: day.dayLabel,
    value: day.data ? Math.min(day.data.breatheTimer.breatheTimerCount / 4, 1) : 0,
    display: day.data ? `${day.data.breatheTimer.breatheTimerCount} sessions` : undefined,
  }));

  return (
    <>
      <h2 className="ctx-title">Breathe</h2>
      <div className="ctx-stat-grid">
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{breatheTimer.breatheTimerCount}</span>
          <span className="ctx-stat-label">Today</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{dataYesterday?.breatheTimer?.breatheTimerCount ?? '—'}</span>
          <span className="ctx-stat-label">Yesterday</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{totalSessions || '—'}</span>
          <span className="ctx-stat-label">All time</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{millisToMinutesAndSeconds(breatheTimerLengthMS)}</span>
          <span className="ctx-stat-label">Timer length</span>
        </div>
      </div>
      <WeekDots days={weekDots} label="Last 7 days" />
      <div className="ctx-breathe-guide">
        <p className="ctx-hint">Breathing pattern</p>
        <div className="ctx-breathe-steps">
          <span>Breathe in — 5s</span>
          <span>Hold — 0s</span>
          <span>Breathe out — 5s</span>
          <span>Hold — 0s</span>
        </div>
      </div>
    </>
  );
};

const MoodContext = () => {
  const historical = useSelector(s => s.historical.historicalData);
  const currentMood = useSelector(s => s.mood);
  const recentDays = getRecentDays(historical);

  let moodSum = 0;
  let moodCount = 0;
  const moodDots = recentDays.map(day => {
    if (!day.data?.mood) return { dayLabel: day.dayLabel, value: 0 };
    const m = day.data.mood;
    const composite = parseInt(m.moodLevel) + parseInt(m.energyLevel) - parseInt(m.overwhelmedLevel);
    moodSum += composite;
    moodCount++;
    return {
      dayLabel: day.dayLabel,
      value: Math.max(0, Math.min(1, (composite + 3) / 12)),
      display: `mood ${m.moodLevel}, energy ${m.energyLevel}, stress ${m.overwhelmedLevel}`,
    };
  });

  const avgMood = moodCount > 0 ? (moodSum / moodCount).toFixed(1) : null;
  const moodTrend = avgMood === null ? '—' : avgMood > 4 ? '↑ positive' : avgMood == 4 ? '→ stable' : '↓ dip';

  const moodEmoji = ['', '😫', '😟', '😐', '🙂', '😊', '😄', '🤩', '🥳', '🌟', '✨'];

  return (
    <>
      <h2 className="ctx-title">Mood</h2>
      <div className="ctx-stat-grid">
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{moodEmoji[currentMood.moodLevel] || currentMood.moodLevel}</span>
          <span className="ctx-stat-label">Mood now</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{currentMood.energyLevel}/10</span>
          <span className="ctx-stat-label">Energy</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{currentMood.overwhelmedLevel}/10</span>
          <span className="ctx-stat-label">Stress</span>
        </div>
        <div className="ctx-stat-card">
          <span className="ctx-stat-value">{moodTrend}</span>
          <span className="ctx-stat-label">7-day trend</span>
        </div>
      </div>
      <WeekDots days={moodDots} label="Last 7 days" />
    </>
  );
};

const HabitContext = () => {
  const historical = useSelector(s => s.historical.historicalData);
  const habits = useSelector(s => s.habits.habits);
  const recentDays = getRecentDays(historical);

  // Per-habit streak calculation (consecutive days completed, walking back from yesterday)
  const habitStreaks = habits.map(habit => {
    let streak = 0;
    // Walk backwards from most recent day
    for (let i = recentDays.length - 1; i >= 0; i--) {
      const dayData = recentDays[i].data;
      if (!dayData?.habits?.habits) break;
      const h = dayData.habits.habits.find(x => x.id === habit.id);
      if (h?.isComplete) streak++;
      else break;
    }
    return { ...habit, streak };
  });

  const habitsCompleted = habits.filter(h => h.isComplete).length;

  const habitDots = recentDays.map(day => {
    if (!day.data?.habits?.habits) return { dayLabel: day.dayLabel, value: 0 };
    const done = day.data.habits.habits.filter(h => h.isComplete).length;
    const total = day.data.habits.habits.length || 1;
    return {
      dayLabel: day.dayLabel,
      value: done / total,
      display: `${done}/${total} completed`,
    };
  });

  return (
    <>
      <h2 className="ctx-title">Habits</h2>
      <div className="ctx-today-status">
        <span className="ctx-stat-value">{habitsCompleted}/{habits.length}</span>
        <span className="ctx-stat-label">completed today</span>
      </div>
      <div className="ctx-habit-list">
        {habitStreaks.map(h => (
          <div key={h.id} className={`ctx-habit-row ${h.isComplete ? 'ctx-habit-done' : ''}`}>
            <span className="ctx-habit-check">{h.isComplete ? '✓' : '○'}</span>
            <span className="ctx-habit-desc">{h.description}</span>
            {h.streak > 0 && <span className="ctx-habit-streak">{h.streak}d</span>}
          </div>
        ))}
      </div>
      <WeekDots days={habitDots} label="Last 7 days" />
    </>
  );
};

const MinimalContext = ({ title, message }) => (
  <>
    <h2 className="ctx-title">{title}</h2>
    <p className="ctx-hint">{message}</p>
  </>
);

const ROUTE_PANELS = {
  '/': () => <DashboardContext />,
  '/focus-timer': () => <FocusContext />,
  '/breathe-timer': () => <BreatheContext />,
  '/mood-tracker': () => <MoodContext />,
  '/habit-tracker': () => <HabitContext />,
  '/weekly-summary': () => <MinimalContext title="Weekly" message="Your week at a glance — all the data is in the main view." />,
  '/settings': () => <MinimalContext title="Settings" message="Customize your timers, theme, and habits." />,
};

export const ContextPanel = () => {
  const { pathname } = useLocation();

  // Match route — fall back to dashboard for unknown paths (including /about-*)
  const Panel = ROUTE_PANELS[pathname] || ROUTE_PANELS['/'];

  return (
    <div className="context-panel">
      <Panel />
    </div>
  );
};
