import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import { BreathCircle } from '../../assets/SVGElements';
import { millisToMinutesAndSeconds } from '../../helpers';
import './BreatheTimer.css';

// This is the component shown in the Dashboard
export const BreatheTimer = () => {
  const isBreatheTimerRunning = useSelector(
    state => state.breatheTimer.isBreatheTimerRunning
  );
  const liveBreatheTimerMS = useSelector(
    state => state.breatheTimer.breatheTimer
  );
  const liveBreatheTimer = millisToMinutesAndSeconds(liveBreatheTimerMS);
  const breatheTimerCount = useSelector(
    state => state.breatheTimer.breatheTimerCount
  );

  return (
    <div className={clsx('tile-wrapper tile-breathe', isBreatheTimerRunning && 'tile-active')}>
      <Link to="/breathe-timer">
        <div className="tile-main-name">. BREATHE</div>
        <div className="breath-timer-done-counter">{breatheTimerCount}</div>
        <div className="breath-circle">
          <BreathCircle />
          <div className="breath-circle-text-wrapper">
            <div className="breath-timer-text">
              {isBreatheTimerRunning ? liveBreatheTimer : 'BREAK'}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
