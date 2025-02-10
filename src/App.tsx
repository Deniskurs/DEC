// src/App.tsx
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
import EnquiryPage from "./components/Enquiry/EnquiryPage";

const HomePage = () => {
  // Create a ref for the hero section
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section id="about">
        <HeroSection ref={heroRef} />
      </section>
      <section id="problem">
        <ProblemSection />
      </section>
      <section>
        <InvestmentCalculator />
      </section>
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="performance">
        <PerformanceSection />
      </section>
      <section id="liquidity">
        <LiquidityProviders />
      </section>
      <section id="faq">
        <FAQSection />
      </section>
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
      setHideNavbar(
        currentScrollY > lastScrollY.current && currentScrollY > 100
      );
      lastScrollY.current = currentScrollY;
    };

    // Create an IntersectionObserver to watch the hero section
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the hero section is mostly out of view (intersection ratio < 0.05),
        // assume the background behind the navbar is dark.
        setIsDarkBackground(entry.intersectionRatio < 0.05);
      },
      {
        threshold: [0.05],
        rootMargin: "-80px 0px 0px 0px", // adjust if needed to account for navbar height
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

  // Scroll to the proper section when the hash changes on the homepage
  useEffect(() => {
    if (location.pathname === "/") {
      if (location.hash) {
        setTimeout(() => {
          const section = document.querySelector(location.hash);
          if (section) {
            const headerOffset = 100; // adjust to your navbar height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        }, 300);
      } else {
        window.scrollTo(0, 0);
      }
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
          <Route path="/enquiry" element={<EnquiryPage />} />
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
