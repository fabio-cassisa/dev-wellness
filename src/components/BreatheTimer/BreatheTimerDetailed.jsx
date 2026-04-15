import { clsx } from 'clsx';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleResetBreatheTimer,
  handleStartBreatheTimer,
  handlePauseBreatheTimer,
} from './BreatheTimerDispatch';
import { getYesterdayDate, getRecentDays, millisToMinutesAndSeconds } from '../../helpers';
import { DashLine, ResetIcon } from '../../assets/SVGElements';
import { EmptyState } from '../EmptyState';
import { WeekDots } from '../WeekDots';
import './BreatheTimerDetailed.css';

export const BreatheTimerDetailed = () => {
  const dispatch = useDispatch();
  const yesterdayDate = getYesterdayDate();

  const breatheTimer = useSelector(state => state.breatheTimer);
  const breatheTimerLengthMS = useSelector(
    state => state.settings.breatheTimerLengthMS
  );

  const historical = useSelector(state => state.historical.historicalData);
  const dataYesterday = historical[yesterdayDate];

  const historicalBreatheData = Object.entries(historical).reduce(
    (acc, curr) => {
      acc.count += 1;
      acc.done += curr[1].breatheTimer.breatheTimerCount;
      return acc;
    },
    {
      done: 0,
      count: 0,
    }
  );

  const percentage = (breatheTimer.breatheTimer / breatheTimerLengthMS) * 100;

  const handleClickTimer = () => {
    if (!breatheTimer.isBreatheTimerRunning) {
      handleStartBreatheTimer(dispatch, breatheTimer, breatheTimerLengthMS);
    } else {
      handlePauseBreatheTimer(dispatch);
    }
  };

  const renderBreatheTimerText = () => {
    if (!breatheTimer.isBreatheTimerRunning) {
      return 'S T A R T';
    } else if (
      breatheTimer.isBreatheTimerRunning &&
      !breatheTimer.isBreatheTimerPaused
    ) {
      return 'P A U S E';
    } else if (
      breatheTimer.isBreatheTimerRunning &&
      breatheTimer.isBreatheTimerPaused
    ) {
      return 'R E S U M E';
    }
  };

  const breatheTimerClassnames = clsx({
    'focus-detailed-circular-progress-bar': true,
    'breathe-ring': true,
    pulsing:
      breatheTimer.isBreatheTimerRunning && !breatheTimer.isBreatheTimerPaused,
  });

  const withHistoricalData =
    dataYesterday != null && historicalBreatheData.count != 0;

  const recentDays = getRecentDays(historical);
  const weekDots = recentDays.map(day => ({
    dayLabel: day.dayLabel,
    value: day.data ? Math.min(day.data.breatheTimer.breatheTimerCount / 4, 1) : 0,
    display: day.data ? `${day.data.breatheTimer.breatheTimerCount} sessions` : undefined,
  }));

  return (
    <div className="main-wrapper">
      <div className="app-container">
        <header className="main-header">
          <div className="main-app-name">. BREATHE</div>
        </header>
        <h2 className="secondary-header">Breathe and Relax</h2>
        <div
          className="focus-detailed-reset-icon"
          onClick={() =>
            handleResetBreatheTimer(dispatch, breatheTimerLengthMS)
          }
        >
          <ResetIcon />
        </div>
        <div
          className={breatheTimerClassnames}
          onClick={() => handleClickTimer()}
        >
          <CircularProgressbarWithChildren
            value={percentage}
            circleRatio={0.75}
            strokeWidth={6}
            styles={buildStyles({
              pathTransitionDuration: 0.5,
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: 'round',
              trailColor: 'var(--secondary-accent-color)',
              pathColor: 'var(--primary-accent-color)',
            })}
          >
            <h1 className="focus-timer-elapsing">
              {millisToMinutesAndSeconds(breatheTimer.breatheTimer)}
            </h1>
            <h6 className="focus-timer-next">{renderBreatheTimerText()}</h6>
          </CircularProgressbarWithChildren>
        </div>
        <p className="focus-done-day">
          Breathe timers done today: {breatheTimer.breatheTimerCount}
        </p>
        {withHistoricalData ? (
          <>
            <WeekDots days={weekDots} label="Last 7 days" />
            <DashLine />
            <div className="breathe-history">
              {dataYesterday != null && (
                <div className="breathe-history-yesterday">
                  Yesterday&apos;s data:
                  <p />
                  Count: {dataYesterday.breatheTimer.breatheTimerCount}
                </div>
              )}
              {historicalBreatheData.count != 0 && (
                <div className="breathe-history-overall">
                  Overall data:
                  <p />
                  Average per day:{' '}
                  {Math.round(historicalBreatheData.done / historicalBreatheData.count)}
                </div>
              )}
            </div>
          </>
        ) : (
          <EmptyState message="Keep breathing — your session history will appear here tomorrow." />
        )}
      </div>
    </div>
  );
};
