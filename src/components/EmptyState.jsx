import PropTypes from 'prop-types';
import './EmptyState.css';

export const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">📊</span>
      <p className="empty-state-text">{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
};
