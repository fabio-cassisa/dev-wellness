//Vertical Menu for desktop & tablet only
import { NavLink } from 'react-router-dom';
import './VerticalMenu.css';

export const VerticalMenu = () => {
  return (
    <div className="vertical-menu-bar">
      <div className="menu-items">
        <NavLink className="menu-link" to="/" end>DASHBOARD</NavLink>
        <div className="functionality-menu-items">
          <NavLink className="menu-link" to="/focus-timer">. FOCUS</NavLink>
          <NavLink className="menu-link" to="/mood-tracker">. MOOD</NavLink>
          <NavLink className="menu-link" to="/habit-tracker">. HABIT</NavLink>
          <NavLink className="menu-link" to="/breathe-timer">. BREATHE</NavLink>
        </div>
        <NavLink className="menu-link" to="/weekly-summary">WEEKLY</NavLink>
        <NavLink className="menu-link" to="/settings">SETTINGS</NavLink>
      </div>
    </div>
  );
};
