import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useEffect } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  variants?: any;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = true,
  variants
}: UseScrollAnimationProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};