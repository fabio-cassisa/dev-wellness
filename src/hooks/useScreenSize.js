// useScreenSize.js
import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    const handleOrientationChange = () => {
      // Wait briefly after orientation change for viewport to settle
      setTimeout(() => {
        setIsMobile(window.innerWidth <= 767);
      }, 200);
    };

    // Initial setup
    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return { isMobile };
};

export default useScreenSize;
