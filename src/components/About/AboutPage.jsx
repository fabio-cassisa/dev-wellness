import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileNavLink } from '../MobileNavLink';
import useScreenSize from '../../hooks/useScreenSize';
import './About.css';

// Single about page component — renders different content based on props
export const AboutPage = ({ title, content, desktopRedirect, desktop }) => {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();

  // On desktop, about pages redirect to their parent route
  // (about content is shown in the third column instead)
  useEffect(() => {
    if (!isMobile && !desktop && desktopRedirect) {
      navigate(desktopRedirect);
    }
  }, [isMobile]);

  return (
    <div className="about-wrapper">
      <div className="app-container">
        <div className="main-header">
          <div className="about-header">{title}</div>
        </div>
        <div className="about-paragraph">{content}</div>
        {!desktop && <MobileNavLink to="../" label=". BACK" />}
      </div>
    </div>
  );
};
