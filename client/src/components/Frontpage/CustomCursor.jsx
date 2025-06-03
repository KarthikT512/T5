"use client";

import { useEffect } from "react";

const CustomCursor = ({ cursorVariant }) => {
  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      const setCursor = () => {
        if (cursorVariant === "hover") {
          document.body.style.cursor = "pointer"; // Cursor changes to pointer on hover
        } else if (cursorVariant === "click") {
          document.body.style.cursor = "grabbing"; // Optional: different style for click
        } else {
          document.body.style.cursor = "auto"; // Default cursor
        }
      };

      setCursor();

      // Reset cursor to default on unmount
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [cursorVariant]);

  return null; // No custom cursor element needed
};

export default CustomCursor;
