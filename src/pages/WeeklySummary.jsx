import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecentDays } from '../helpers';
import { WeekDots } from '../components/WeekDots';
import { DashLine } from '../assets/SVGElements';
import './WeeklySummary.css';

export const WeeklySummary = () => {
  const historical = useSelector(state => state.historical.historicalData);
  const recentDays = getRecentDays(historical, 7);

  // --- Aggregate focus data ---
  let totalFocusSessions = 0;
  const focusDots = recentDays.map(day => {
    if (!day.data) return { dayLabel: day.dayLabel, value: 0 };
    const count = day.data.focusTimer.focusTimerCount;
    totalFocusSessions += count;
    return {
      dayLabel: day.dayLabel,
      value: Math.min(count / 4, 1),
      display: `${count} sessions`,
    };
  });

  // --- Aggregate breathe data ---
  let totalBreatheSessions = 0;
  const breatheDots = recentDays.map(day => {
    if (!day.data) return { dayLabel: day.dayLabel, value: 0 };
    const count = day.data.breatheTimer.breatheTimerCount;
    totalBreatheSessions += count;
    return {
      dayLabel: day.dayLabel,
      value: Math.min(count / 4, 1),
      display: `${count} sessions`,
    };
  });

  // --- Aggregate habit data ---
  let totalHabitsDone = 0;
  let totalHabitsAvailable = 0;
  const habitDots = recentDays.map(day => {
    if (!day.data) return { dayLabel: day.dayLabel, value: 0 };
    const habits = day.data.habits.habits;
    const done = habits.filter(h => h.isComplete).length;
    const total = habits.length || 1;
    totalHabitsDone += done;
    totalHabitsAvailable += total;
    return {
      dayLabel: day.dayLabel,
      value: done / total,
      display: `${done}/${total} completed`,
    };
  });

  // --- Aggregate mood data ---
  let moodSum = 0;
  let moodCount = 0;
  const moodDots = recentDays.map(day => {
    if (!day.data || !day.data.mood) return { dayLabel: day.dayLabel, value: 0 };
    const m = day.data.mood;
    const composite =
      parseInt(m.moodLevel) + parseInt(m.energyLevel) - parseInt(m.overwhelmedLevel);
    moodSum += composite;
    moodCount++;
    return {
      dayLabel: day.dayLabel,
      value: Math.max(0, Math.min(1, (composite + 3) / 12)),
      display: `mood ${m.moodLevel}, energy ${m.energyLevel}, stress ${m.overwhelmedLevel}`,
    };
  });

  const avgMood = moodCount > 0 ? (moodSum / moodCount).toFixed(1) : null;
  const moodTrend =
    avgMood === null ? 'no data' : avgMood > 4 ? 'positive' : avgMood == 4 ? 'stable' : 'could be better';

  const daysWithData = recentDays.filter(d => d.data).length;
  const hasData = daysWithData > 0;

  return (
    <div className="main-wrapper">
      <div className="app-container">
        <header className="main-header">
          <div className="main-app-name">. WEEKLY</div>
        </header>
        <h2 className="secondary-header">Your week in review</h2>

        {!hasData ? (
          <div className="weekly-empty">
            <p>No data from the last 7 days yet.</p>
            <p>Use the app daily and come back to see your trends.</p>
            <Link to="/" className="app-button">Back to Dashboard</Link>
          </div>
        ) : (
          <div className="weekly-content">
            <div className="weekly-stat-grid">
              <div className="weekly-stat-card">
                <span className="weekly-stat-icon">⏱</span>
                <span className="weekly-stat-value">{totalFocusSessions}</span>
                <span className="weekly-stat-label">Focus sessions</span>
              </div>
              <div className="weekly-stat-card">
                <span className="weekly-stat-icon">◎</span>
                <span className="weekly-stat-value">{totalBreatheSessions}</span>
                <span className="weekly-stat-label">Breathe sessions</span>
              </div>
              <div className="weekly-stat-card">
                <span className="weekly-stat-icon">✓</span>
                <span className="weekly-stat-value">{totalHabitsDone}/{totalHabitsAvailable}</span>
                <span className="weekly-stat-label">Habits completed</span>
              </div>
              <div className="weekly-stat-card">
                <span className="weekly-stat-icon">☺</span>
                <span className="weekly-stat-value">{moodTrend}</span>
                <span className="weekly-stat-label">Mood trend</span>
              </div>
            </div>

            <div className="weekly-days-active">
              {daysWithData}/7 days active
            </div>

            <DashLine />

            <div className="weekly-sparklines">
              <WeekDots days={focusDots} label="Focus" />
              <WeekDots days={breatheDots} label="Breathe" />
              <WeekDots days={habitDots} label="Habits" />
              <WeekDots days={moodDots} label="Mood" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
