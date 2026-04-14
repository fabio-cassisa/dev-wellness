import PropTypes from 'prop-types';
import './WeekDots.css';

// A row of 7 dots representing the last 7 days
// Each dot is filled/colored based on whether data exists and its value
// value: 0-1 normalized intensity (0 = empty, 1 = full)
export const WeekDots = ({ days, label }) => {
  return (
    <div className="week-dots">
      {label && <span className="week-dots-label">{label}</span>}
      <div className="week-dots-row">
        {days.map((day, i) => (
          <div key={i} className="week-dot-col">
            <div
              className={`week-dot${day.value > 0 ? ' week-dot-filled' : ''}`}
              style={day.value > 0 ? { opacity: 0.3 + day.value * 0.7 } : undefined}
              title={`${day.dayLabel}: ${day.display || 'no data'}`}
            />
            <span className="week-dot-day">{day.dayLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

WeekDots.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      dayLabel: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired, // 0-1
      display: PropTypes.string,
    })
  ).isRequired,
  label: PropTypes.string,
};
