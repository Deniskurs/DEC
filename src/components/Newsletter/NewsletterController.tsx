// src/components/Newsletter/NewsletterController.tsx
import React, { useState, useEffect } from "react";
import NewsletterPopup from "./NewsletterPopup";

const STORAGE_KEY = "hasSeenNewsletterPopup";

const NewsletterController: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [isReadyToTrack, setIsReadyToTrack] = useState(false);

  // Clear localStorage on mount
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Initial delay before tracking scroll
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsReadyToTrack(true);
    }, 45000); // 45 second initial delay

    return () => clearTimeout(initialDelay);
  }, []);

  // Scroll tracking
  useEffect(() => {
    if (!isReadyToTrack) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let hasTriggeredScroll = false;

    const handleScroll = () => {
      if (hasTriggeredScroll) return;

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;

      if (scrollPercentage > 32 && !hasShownPopup) {
        hasTriggeredScroll = true;

        timeoutId = setTimeout(() => {
          setShowPopup(true);
          setHasShownPopup(true);
          localStorage.setItem(STORAGE_KEY, "true");
        }, 32000); // 32 second delay after scroll threshold
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isReadyToTrack, hasShownPopup]);

  return (
    <NewsletterPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
  );
};

export default NewsletterController;
