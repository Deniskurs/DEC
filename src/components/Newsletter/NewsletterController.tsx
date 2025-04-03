// src/components/Newsletter/NewsletterController.tsx
import React, { useState, useEffect, useRef } from "react";
import NewsletterPopup from "./NewsletterPopup";

const STORAGE_KEY = "hasSeenNewsletterPopup";
const MAX_DISPLAYS = 3; // Maximum number of times to show the popup
const REDISPLAY_DELAY = 100000; // 100 seconds in milliseconds
const INITIAL_DELAY = 45000; // 45 seconds before first popup
const SCROLL_THRESHOLDS = [32, 60, 85]; // Scroll percentage thresholds

const NewsletterController: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [isReadyToTrack, setIsReadyToTrack] = useState(false);
  const [canShowAgain, setCanShowAgain] = useState(false);
  const [lastDismissalTime, setLastDismissalTime] = useState<number | null>(
    null
  );

  // Ref to track which scroll thresholds have been triggered
  const triggeredThresholdsRef = useRef<boolean[]>([false, false, false]);

  // Clear localStorage on mount to ensure testing works
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Initial delay before tracking scroll
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsReadyToTrack(true);
    }, INITIAL_DELAY);

    return () => clearTimeout(initialDelay);
  }, []);

  // Handle popup dismissal
  const handleClose = () => {
    setShowPopup(false);
    setLastDismissalTime(Date.now());

    // Start timer to allow showing again after delay
    setTimeout(() => {
      setCanShowAgain(true);
    }, REDISPLAY_DELAY);
  };

  // Timer to check if we can show the popup again after dismissal
  useEffect(() => {
    if (!lastDismissalTime || !canShowAgain || displayCount >= MAX_DISPLAYS)
      return;

    // Reset the state so it only triggers once per cycle
    setCanShowAgain(false);

    // Only show if we haven't hit the max display count
    if (displayCount < MAX_DISPLAYS) {
      setShowPopup(true);
      setDisplayCount((prev) => prev + 1);
    }
  }, [canShowAgain, lastDismissalTime, displayCount]);

  // Scroll tracking
  useEffect(() => {
    if (!isReadyToTrack) return;

    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const handleScroll = () => {
      if (showPopup || displayCount >= MAX_DISPLAYS) return;

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;

      // Check each threshold
      SCROLL_THRESHOLDS.forEach((threshold, index) => {
        // If this threshold has already been triggered, skip it
        if (triggeredThresholdsRef.current[index]) return;

        if (scrollPercentage > threshold) {
          // Mark this threshold as triggered
          const newTriggered = [...triggeredThresholdsRef.current];
          newTriggered[index] = true;
          triggeredThresholdsRef.current = newTriggered;

          // Different delay times based on threshold
          const delayTime = 5000 + index * 10000; // 5s, 15s, 25s

          // Create timeout to show popup
          const timeoutId = setTimeout(() => {
            // Only show if no popup is currently showing and we haven't hit max
            if (!showPopup && displayCount < MAX_DISPLAYS) {
              setShowPopup(true);
              setDisplayCount((prev) => prev + 1);
            }
          }, delayTime);

          timeoutIds.push(timeoutId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case user is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [isReadyToTrack, showPopup, displayCount]);

  return <NewsletterPopup isOpen={showPopup} onClose={handleClose} />;
};

export default NewsletterController;
