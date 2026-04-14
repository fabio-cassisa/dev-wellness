import { PropTypes } from 'prop-types';

const TOTAL_STEPS = 4;

export const StepDots = ({ currentStep }) => (
  <div className="step-dots">
    {Array.from({ length: TOTAL_STEPS }, (_, i) => (
      <div
        key={i}
        className={`step-dot${i === currentStep ? ' active' : i < currentStep ? ' completed' : ''}`}
      />
    ))}
  </div>
);

StepDots.propTypes = {
  currentStep: PropTypes.number.isRequired,
};
