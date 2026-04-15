//Dashboard that loads in mobile & it's used
//as a component for Desktop/Tablet
import useScreenSize from '../hooks/useScreenSize';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DashLine } from '../assets/SVGElements';
import { calculateStreak } from '../helpers';
import { FocusTimer } from '../components/FocusTimer/FocusTimer';
import { HabitTracker } from '../components/HabitTracker/HabitTracker';
import { MoodTracker } from '../components/MoodTracker/MoodTracker';
import { BreatheTimer } from '../components/BreatheTimer/BreatheTimer';
import './Dashboard.css';

export const Dashboard = () => {
  const { isMobile } = useScreenSize();
  const settingsState = useSelector(state => state.settings);
  const historicalData = useSelector(state => state.historical.historicalData);
  const streak = calculateStreak(historicalData);

  return (
    <div className="main-wrapper">
      <div className={`app-container ${!isMobile ? 'app-container--desktop' : ''}`}>
        <h1 className="main-app-name">DevWellnessHub</h1>
        <h2 className="secondary-header">
          Hi {settingsState.name}, ready for today&apos;s session?
        </h2>
        {streak > 0 && (
          <div className="streak-badge">● {streak}-day streak</div>
        )}
        <Link to="/weekly-summary" className="weekly-link-dashboard">Weekly Summary →</Link>
        {isMobile && <DashLine />}
        <div className="app-wrapper">
          <FocusTimer />
          <HabitTracker />
          <BreatheTimer />
          <MoodTracker />
        </div>
      </div>
    </div>
  );
};
