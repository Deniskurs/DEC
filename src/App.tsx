import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navigation/Navbar";
import HeroSection from "./components/Hero/HeroSection";
import ProblemSection from "./components/Problem/ProblemSection";
import LiquidityProviders from "./components/LiquidityProviders/LiquidityProviders";
import InvestmentCalculator from "./components/Calculator/InvestmentCalculator";
import FeaturesSection from "./components/Features/FeaturesSection";
import PerformanceSection from "./components/Performance/PerformanceSection";
import FAQSection from "./components/FAQ/FAQSection";
import CTABanner from "./components/CTA/CTABanner";
import Footer from "./components/Footer/Footer";
import NewsletterController from "./components/Newsletter/NewsletterController";
import { LoadingAndTerms } from "./components/LoadingandTerms";
import { useScrollTrigger } from "./hooks/useScrollTrigger";
import { termsManager } from "./utils/termsManager";

interface ScrollObserverEntry extends IntersectionObserverEntry {
  intersectionRatio: number;
}

function App(): JSX.Element {
  // Terms acceptance state
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(() => {
    try {
      const { hasAccepted } = termsManager.checkAcceptance();
      return hasAccepted;
    } catch (e) {
      console.error("Error checking terms acceptance:", e);
      return false;
    }
  });

  // UI states - Only initialize if terms are accepted
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(true);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);

  const lastScrollY = useRef<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const showCTA = useScrollTrigger(800);

  useEffect(() => {
    // Only add scroll listeners if terms are accepted
    if (!hasAcceptedTerms) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
      lastScrollY.current = currentScrollY;
    };

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        setIsDarkBackground(entry.intersectionRatio > 0.05);
      },
      {
        threshold: [0.05, 0.2],
        rootMargin: "-80px 0px 0px 0px",
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [hasAcceptedTerms]); // Added hasAcceptedTerms as dependency

  const handleTermsAccept = (): void => {
    try {
      termsManager.acceptTerms();
      setHasAcceptedTerms(true);
      // Reset UI states when terms are accepted
      setScrolled(window.scrollY > 20);
      setIsMenuOpen(false);
      setIsDarkBackground(true);
      setHideNavbar(false);
    } catch (e) {
      console.error("Failed to save terms acceptance:", e);
    }
  };

  if (!hasAcceptedTerms) {
    return <LoadingAndTerms onAccept={handleTermsAccept} />;
  }

  return (
    <div className="relative w-full max-w-full overflow-x-hidden bg-white">
      <Navbar
        scrolled={scrolled}
        isDarkBackground={isDarkBackground}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        hidden={hideNavbar}
      />

      <main className="relative w-full">
        <HeroSection ref={heroRef} />
        <ProblemSection />
        <InvestmentCalculator />
        <FeaturesSection />
        <PerformanceSection />
        <LiquidityProviders />
        <FAQSection />
      </main>

      <Footer />

      {showCTA && <CTABanner isVisible={showCTA} />}
      <NewsletterController />
    </div>
  );
}

export default App;
