import { useNavigate } from 'react-router-dom';
import './About.css';

// About page — mobile-only informational pages
export const AboutPage = ({ title, content }) => {
  const navigate = useNavigate();

  return (
    <div className="about-wrapper">
      <div className="app-container">
        <div className="main-header">
          <div className="about-header">{title}</div>
        </div>
        <div className="about-paragraph">{content}</div>
        <button
          className="app-button"
          onClick={() => navigate(-1)}
          style={{ marginTop: '1.5rem' }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
};
