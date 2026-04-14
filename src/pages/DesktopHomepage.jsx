// Homepage layout — responsive shell for mobile (single column) and desktop (three columns)
import useScreenSize from '../hooks/useScreenSize';
import { Route, Routes } from 'react-router-dom';
import { useFocusTimerTick } from '../hooks/useFocusTimerTick';
import { useBreatheTimerTick } from '../hooks/useBreatheTimerTick';
import { VerticalMenu } from '../components/VerticalMenu';
import { Dashboard } from './Dashboard';
import { FocusTimerDetailed } from '../components/FocusTimer/FocusTimerDetailed';
import { MoodTrackerDetailed } from '../components/MoodTracker/MoodTrackerDetailed';
import { HabitTrackerDetailed } from '../components/HabitTracker/HabitTrackerDetailed';
import { BreatheTimerDetailed } from '../components/BreatheTimer/BreatheTimerDetailed';
import { SettingsPage } from './SettingsPage';
import { AboutPage } from '../components/About/AboutPage';
import { ABOUT_CONTENT } from '../components/About/aboutContent';
import './DesktopHomepage.css';

export const DesktopHomepage = () => {
  const { isMobile } = useScreenSize();

  // Timer tick logic — runs in background regardless of which page is visible
  useFocusTimerTick();
  useBreatheTimerTick();

  if (isMobile) {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/focus-timer" element={<FocusTimerDetailed />} />
        <Route path="/habit-tracker" element={<HabitTrackerDetailed />} />
        <Route path="/breathe-timer" element={<BreatheTimerDetailed />} />
        <Route path="/mood-tracker" element={<MoodTrackerDetailed />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/about" element={<AboutPage {...ABOUT_CONTENT.general} />} />
        <Route path="/about-focus-timer" element={<AboutPage {...ABOUT_CONTENT.focus} />} />
        <Route path="/about-habit-tracker" element={<AboutPage {...ABOUT_CONTENT.habits} />} />
        <Route path="/about-breathe-timer" element={<AboutPage {...ABOUT_CONTENT.breathe} />} />
        <Route path="/about-mood-tracker" element={<AboutPage {...ABOUT_CONTENT.mood} />} />
      </Routes>
    );
  }

  return (
    <div className="desktop-wrapper">
      <VerticalMenu />
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/focus-timer" element={<FocusTimerDetailed />} />
          <Route path="/mood-tracker" element={<MoodTrackerDetailed />} />
          <Route path="/habit-tracker" element={<HabitTrackerDetailed />} />
          <Route path="/breathe-timer" element={<BreatheTimerDetailed />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about-focus-timer" element={<FocusTimerDetailed />} />
          <Route path="/about-habit-tracker" element={<HabitTrackerDetailed />} />
          <Route path="/about-breathe-timer" element={<BreatheTimerDetailed />} />
          <Route path="/about-mood-tracker" element={<MoodTrackerDetailed />} />
          <Route path="/about" element={<Dashboard />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<AboutPage {...ABOUT_CONTENT.general} desktop />} />
        <Route path="/focus-timer" element={<AboutPage {...ABOUT_CONTENT.focus} desktop />} />
        <Route path="/habit-tracker" element={<AboutPage {...ABOUT_CONTENT.habits} desktop />} />
        <Route path="/breathe-timer" element={<AboutPage {...ABOUT_CONTENT.breathe} desktop />} />
        <Route path="/mood-tracker" element={<AboutPage {...ABOUT_CONTENT.mood} desktop />} />
        <Route path="/about" element={<AboutPage {...ABOUT_CONTENT.general} desktop />} />
        <Route path="/settings" element={<AboutPage {...ABOUT_CONTENT.general} desktop />} />
        <Route path="/about-focus-timer" element={<AboutPage {...ABOUT_CONTENT.focus} desktop />} />
        <Route path="/about-habit-tracker" element={<AboutPage {...ABOUT_CONTENT.habits} desktop />} />
        <Route path="/about-breathe-timer" element={<AboutPage {...ABOUT_CONTENT.breathe} desktop />} />
        <Route path="/about-mood-tracker" element={<AboutPage {...ABOUT_CONTENT.mood} desktop />} />
      </Routes>
    </div>
  );
};
