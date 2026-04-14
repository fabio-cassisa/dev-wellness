import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBreatheTimerLengthMS } from '../../reducers/settings';
import { StepDots } from './StepDots';
import './Start.css';

export const StartPageBreatheTimer = ({
  handleSubmitName,
  onSetupComplete,
}) => {
  const dispatch = useDispatch();
  const settingsState = useSelector(state => state.settings);

  const [breatheMinutes, setBreatheMinutes] = useState(
    settingsState.breatheTimerLengthMS / (60 * 1000)
  );

  const handleFinish = () => {
    dispatch(
      updateBreatheTimerLengthMS({
        breatheTimerLengthMS: breatheMinutes * 60 * 1000,
      })
    );
    handleSubmitName();
    onSetupComplete();
  };

  return (
    <div className="start-page">
      <StepDots currentStep={3} />
      <header className="main-header">
        <div className="main-app-name">Breathe Timer</div>
      </header>
      <h1 className="secondary-header">
        How long should each breathing break be?
      </h1>

      <div className="start-page-input-wrapper">
        <div className="timer-slider-wrapper">
          <div className="timer-value-display">
            {breatheMinutes}<span>min</span>
          </div>
          <input
            className="timer-range"
            type="range"
            min="1"
            max="60"
            value={breatheMinutes}
            aria-label="Breathe Timer length in minutes"
            onChange={e => setBreatheMinutes(Number(e.target.value))}
          />
          <div className="timer-range-labels">
            <span>1 min</span>
            <span>60 min</span>
          </div>
        </div>

        <div className="start-page-button">
          <button className="app-button" onClick={handleFinish}>
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

StartPageBreatheTimer.propTypes = {
  handleSubmitName: PropTypes.func.isRequired,
  onSetupComplete: PropTypes.func.isRequired,
};
