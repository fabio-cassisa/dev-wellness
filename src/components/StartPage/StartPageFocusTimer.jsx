import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFocusTimerLengthMS } from '../../reducers/settings';
import { StepDots } from './StepDots';
import './Start.css';

export const StartPageFocusTimer = ({ page, setPage }) => {
  const dispatch = useDispatch();
  const settingsState = useSelector(state => state.settings);

  const [focusMinutes, setFocusMinutes] = useState(
    settingsState.focusTimerLengthMS / (60 * 1000)
  );

  const handleNext = () => {
    dispatch(
      updateFocusTimerLengthMS({
        focusTimerLengthMS: focusMinutes * 60 * 1000,
      })
    );
    setPage(page + 1);
  };

  return (
    <div className="start-page">
      <StepDots currentStep={2} />
      <header className="main-header">
        <div className="main-app-name">Focus Timer</div>
      </header>
      <h1 className="secondary-header">
        How long should each focus session be?
      </h1>

      <div className="start-page-input-wrapper">
        <div className="timer-slider-wrapper">
          <div className="timer-value-display">
            {focusMinutes}<span>min</span>
          </div>
          <input
            className="timer-range"
            type="range"
            min="1"
            max="60"
            value={focusMinutes}
            aria-label="Focus Timer length in minutes"
            onChange={e => setFocusMinutes(Number(e.target.value))}
          />
          <div className="timer-range-labels">
            <span>1 min</span>
            <span>60 min</span>
          </div>
        </div>

        <div className="start-page-button">
          <button className="app-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

StartPageFocusTimer.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
