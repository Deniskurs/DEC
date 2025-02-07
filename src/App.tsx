import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import BlogSection from "./components/Blog/BlogSection";
import BlogPost from "./pages/Blog/BlogPost";

interface ScrollObserverEntry extends IntersectionObserverEntry {
  intersectionRatio: number;
}

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <HeroSection ref={heroRef} />
      <ProblemSection />
      <InvestmentCalculator />
      <FeaturesSection />
      <PerformanceSection />
      <LiquidityProviders />
      <FAQSection />
      <BlogSection />
    </>
  );
};

function App(): JSX.Element {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(() => {
    try {
      const { hasAccepted } = termsManager.checkAcceptance();
      return hasAccepted;
    } catch (e) {
      console.error("Error checking terms acceptance:", e);
      return false;
    }
  });

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(true);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);

  const lastScrollY = useRef<number>(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const showCTA = useScrollTrigger(800);
  const location = useLocation();

  useEffect(() => {
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
  }, [hasAcceptedTerms]);

  useEffect(() => {
    if (location.hash === "#blog-section") {
      setTimeout(() => {
        const section = document.querySelector("section#blog-section");
        if (section) {
          const headerOffset = 100;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 300); // Increased timeout to ensure DOM is ready
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const handleTermsAccept = (): void => {
    try {
      termsManager.acceptTerms();
      setHasAcceptedTerms(true);
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>

      <Footer />
      {showCTA && location.pathname === "/" && (
        <CTABanner isVisible={showCTA} />
      )}
      <NewsletterController />
    </div>
  );
}

export default App;
