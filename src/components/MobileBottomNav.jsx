import { NavLink } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize';
import './MobileBottomNav.css';

const NAV_ITEMS = [
  { to: '/focus-timer', label: 'Focus', icon: '⏱' },
  { to: '/habit-tracker', label: 'Habit', icon: '✓' },
  { to: '/', label: 'Home', icon: '⬡', isCenter: true },
  { to: '/breathe-timer', label: 'Breathe', icon: '◎' },
  { to: '/mood-tracker', label: 'Mood', icon: '☺' },
];

export const MobileBottomNav = () => {
  const { isDesktop } = useScreenSize();

  if (isDesktop) return null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `mobile-nav-item${item.isCenter ? ' mobile-nav-center' : ''}${isActive ? ' mobile-nav-active' : ''}`
          }
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
