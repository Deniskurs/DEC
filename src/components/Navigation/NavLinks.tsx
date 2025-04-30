// src/components/Navigation/NavLinks.tsx
import React from "react";
import { Link } from "react-router-dom";

interface NavLinksProps {
	navTextColorClass: string;
	navHoverColorClass: string;
	buttonBgClass: string;
	isDarkBackground: boolean; // kept for compatibility
}

const NavLinks: React.FC<NavLinksProps> = ({
	navTextColorClass,
	buttonBgClass,
}) => {
	const navItems = [
		{ label: "The Team", href: "/team" },
		{ label: "Problem", href: "#problem" },
		{ label: "Performance", href: "#performance" },
		{ label: "Features", href: "#features" },
		{ label: "Liquidity", href: "#liquidity" },
		{ label: "FAQ", href: "#faq" },
	];

	return (
		<ul className="hidden md:flex items-center space-x-8 pointer-events-auto">
			{navItems.map((item) => (
				<li key={item.label} className="relative group">
					{item.href.startsWith("#") ? (
						<Link
							to={{ pathname: "/", hash: item.href }}
							className={`inline-block ${navTextColorClass} transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:scale-105`}
						>
							<span className="relative z-10">{item.label}</span>
							{/* Animated gradient underline */}
							<span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-300"></span>
						</Link>
					) : (
						<Link
							to={item.href}
							className={`inline-block ${navTextColorClass} transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:scale-105`}
						>
							<span className="relative z-10">{item.label}</span>
							<span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-300"></span>
						</Link>
					)}
				</li>
			))}
			{/* Desktop CTA Button - Enhanced Design */}
			<li>
				<Link
					to="https://2znr0q4ymmj.typeform.com/to/CA5GAbp9?typeform-source=localhost"
					className="relative inline-flex items-center px-6 py-2.5 rounded-xl font-bold overflow-hidden group transition-all duration-300 shadow-md"
					style={{
						background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
					}}
				>
					<span className="relative z-10 text-white transform transition-transform duration-300 group-hover:scale-105 flex items-center">
						<span>Enquire</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</span>
					<span className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-blue-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
				</Link>
			</li>
		</ul>
	);
};

export default NavLinks;
