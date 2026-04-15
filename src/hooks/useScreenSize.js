// useScreenSize.js
import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => classify(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setScreenSize(classify(window.innerWidth));

    const handleOrientationChange = () => {
      // Wait briefly after orientation change for viewport to settle
      setTimeout(() => setScreenSize(classify(window.innerWidth)), 200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return screenSize;
};

function classify(width) {
  return {
    isMobile: width <= 767,
    isTablet: width >= 768 && width <= 1024,
    isDesktop: width > 1024,
  };
}

export default useScreenSize;
