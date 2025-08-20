// src/App.tsx
import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import HoldingsSection from "./components/Holdings/HoldingsSection";
import Footer from "./components/Footer/Footer";
import LoadingAndTerms from "./components/LoadingandTerms/LoadingAndTerms";
import { termsManager } from "./utils/termsManager";
import { throttle } from "./utils/throttle";

const HomePage = () => {
	return <HoldingsSection />;
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
	const location = useLocation();

	useEffect(() => {
		// Skip on server-side rendering
		if (typeof window === "undefined" || !hasAcceptedTerms) return;

		// Throttled scroll handler for better performance
		const handleScroll = throttle(() => {
			const currentScrollY = window.scrollY;
			setScrolled(currentScrollY > 20);
			setHideNavbar(
				currentScrollY > lastScrollY.current && currentScrollY > 100
			);
			lastScrollY.current = currentScrollY;
		}, 100); // Throttle to 100ms

		// Create an IntersectionObserver to watch the hero section
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });

		// Only create observer if IntersectionObserver is available
		if (typeof IntersectionObserver !== "undefined") {
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

			return () => {
				window.removeEventListener("scroll", handleScroll);
				observer.disconnect();
			};
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [hasAcceptedTerms]);

	// Optimized scroll to section when hash changes (SSR-safe)
	useEffect(() => {
		// Skip on server-side rendering
		if (typeof window === "undefined") return;

		if (location.pathname === "/") {
			if (location.hash) {
				// Debounce hash-based scrolling for better performance
				const scrollTimeout = setTimeout(() => {
					// Use requestAnimationFrame for smoother performance
					requestAnimationFrame(() => {
						const section = document.querySelector(location.hash);
						if (section) {
							const headerOffset = 100; // adjust to your navbar height
							const elementPosition = section.getBoundingClientRect().top;
							const offsetPosition =
								elementPosition + window.scrollY - headerOffset;

							// Scroll with native API is faster than smooth behavior on mobile
							if (window.innerWidth < 768) {
								window.scrollTo(0, offsetPosition);
							} else {
								window.scrollTo({ top: offsetPosition, behavior: "smooth" });
							}
						}
					});
				}, 10); // small delay to batch potential updates

				return () => clearTimeout(scrollTimeout);
			} else {
				window.scrollTo(0, 0);
			}
		}
	}, [location.pathname, location.hash]);

	//   const handleTermsAccept = (): void => {
	//     try {
	//       termsManager.acceptTerms();
	//       setHasAcceptedTerms(true);
	//       setScrolled(window.scrollY > 20);
	//       setIsMenuOpen(false);
	//       setIsDarkBackground(true);
	//       setHideNavbar(false);
	//     } catch (e) {
	//       console.error("Failed to save terms acceptance:", e);
	//     }
	//   };

	//   if (!hasAcceptedTerms) {
	//     return <LoadingAndTerms onAccept={handleTermsAccept} />;
	//   }

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
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
