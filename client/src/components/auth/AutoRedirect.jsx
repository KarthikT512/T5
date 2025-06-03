import React, { useEffect } from "react";

const AutoRedirect = ({ delay = 1000, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  return null; // This component doesn't render anything
};

export default AutoRedirect;
