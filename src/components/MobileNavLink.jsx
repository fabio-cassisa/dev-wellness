import useScreenSize from '../hooks/useScreenSize';
import { DashLine } from '../assets/SVGElements';
import { Link } from 'react-router-dom';
import './MobileNavLink.css';

// Generic mobile navigation link — renders only on mobile
// Pass a single link or an array of links: [{ to, label }, ...]
export const MobileNavLink = ({ to, label, links }) => {
  const { isMobile } = useScreenSize();

  if (!isMobile) return null;

  // Single link mode
  if (to && label && !links) {
    return (
      <>
        <DashLine />
        <Link className="back-dash-link" to={to}>
          {label}
        </Link>
      </>
    );
  }

  // Multiple links mode
  if (links) {
    return (
      <>
        <DashLine />
        <div className="mobile-back-btn-wrapper">
          {links.map((link, i) => (
            <Link key={i} className="back-dash-link" to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>
      </>
    );
  }

  return null;
};
