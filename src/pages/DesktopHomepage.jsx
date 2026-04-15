// Homepage layout — responsive shell for mobile (single column) and desktop (three columns)
import useScreenSize from '../hooks/useScreenSize';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useFocusTimerTick } from '../hooks/useFocusTimerTick';
import { useBreatheTimerTick } from '../hooks/useBreatheTimerTick';
import { VerticalMenu } from '../components/VerticalMenu';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ContextPanel } from '../components/ContextPanel/ContextPanel';
import { Dashboard } from './Dashboard';
import { FocusTimerDetailed } from '../components/FocusTimer/FocusTimerDetailed';
import { MoodTrackerDetailed } from '../components/MoodTracker/MoodTrackerDetailed';
import { HabitTrackerDetailed } from '../components/HabitTracker/HabitTrackerDetailed';
import { BreatheTimerDetailed } from '../components/BreatheTimer/BreatheTimerDetailed';
import { SettingsPage } from './SettingsPage';
import { WeeklySummary } from './WeeklySummary';
import { AboutPage } from '../components/About/AboutPage';
import { ABOUT_CONTENT } from '../components/About/aboutContent';
import './DesktopHomepage.css';

export const DesktopHomepage = () => {
  const { isMobile } = useScreenSize();
  const location = useLocation();

  // Timer tick logic — runs in background regardless of which page is visible
  useFocusTimerTick();
  useBreatheTimerTick();

  if (isMobile) {
    return (
      <>
        <div className="page-transition" key={location.key}>
          <Routes location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/focus-timer" element={<FocusTimerDetailed />} />
            <Route path="/habit-tracker" element={<HabitTrackerDetailed />} />
            <Route path="/breathe-timer" element={<BreatheTimerDetailed />} />
            <Route path="/mood-tracker" element={<MoodTrackerDetailed />} />
            <Route path="/weekly-summary" element={<WeeklySummary />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage {...ABOUT_CONTENT.general} />} />
            <Route path="/about-focus-timer" element={<AboutPage {...ABOUT_CONTENT.focus} />} />
            <Route path="/about-habit-tracker" element={<AboutPage {...ABOUT_CONTENT.habits} />} />
            <Route path="/about-breathe-timer" element={<AboutPage {...ABOUT_CONTENT.breathe} />} />
            <Route path="/about-mood-tracker" element={<AboutPage {...ABOUT_CONTENT.mood} />} />
          </Routes>
        </div>
        <MobileBottomNav />
      </>
    );
  }

  return (
    <div className="desktop-wrapper">
      <VerticalMenu />
      <div className="page-transition" key={location.key}>
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/focus-timer" element={<FocusTimerDetailed />} />
          <Route path="/mood-tracker" element={<MoodTrackerDetailed />} />
          <Route path="/habit-tracker" element={<HabitTrackerDetailed />} />
          <Route path="/breathe-timer" element={<BreatheTimerDetailed />} />
          <Route path="/weekly-summary" element={<WeeklySummary />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
      <ContextPanel />
    </div>
  );
};
