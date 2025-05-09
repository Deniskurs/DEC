import React from "react";
import { motion } from "framer-motion";
import {
	LuBrain,
	LuEye,
	LuClock,
	LuLock,
	LuShield,
	LuZap,
} from "react-icons/lu";
import FeatureCard from "./FeatureCard";
import SectionCTA from "../CTA/SectionCTA";

// Your existing features array
const features = [
	{
		Icon: LuBrain,
		title: "Real Time Oversight",
		description:
			"Every trade executed by our algorithms is subject to continuous oversight from our dedicated risk management team, ensuring human judgment is embedded throughout the process. The team actively monitors exposure and enforces strict adherence to predefined risk parameters, combining performance targeting with disciplined risk control",
		stats: {
			value: "24%",
			label: "Annual Target",
		},
		iconLabel: "Duedilligent",
	},

	{
		Icon: LuClock,
		title: "Client Support",
		description:
			"Allocators receive daily reporting with performance data structured to reflect their specific exposure. Clients are given direct access to our investment and risk teams for updates, discussions, and clarification—without layers of delay or communication barriers.",
		stats: {
			value: "<2min",
			label: "Response Time",
		},
		iconLabel: "Always On",
	},
];

const FeaturesSection: React.FC = () => {
	return (
		<>
			<div className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50">
				{/* Optimized background effects with reduced animations */}
				<div className="absolute inset-0">
					{/* Static gradient instead of animated one for better performance */}
					<div
						className="absolute inset-0"
						style={{
							background:
								"radial-gradient(circle at 30% 30%, rgba(0, 102, 255, 0.06) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(0, 102, 255, 0.06) 0%, transparent 60%)",
						}}
					/>

					{/* Simplified grid pattern */}
					<div className="absolute inset-0 -z-0 bg-[linear-gradient(rgba(0,82,204,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,82,204,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
				</div>

				{/* Simplified glow effects */}
				<div className="absolute inset-0 -z-10 pointer-events-none">
					<div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
				</div>

				<div className="relative py-20 lg:py-28">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						{/* Simplified Header Section with reduced animations */}
						<div className="text-center mb-16">
							<div className="section-title" data-text="FEATURES">
								<motion.div
									initial={{ opacity: 0, y: 15 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6 }}
									className="flex items-center justify-center gap-2 mb-4"
								>
									<LuShield className="h-5 w-5 text-blue-600" />
									<span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
										FEATURES
									</span>
								</motion.div>

								<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
									Capital
									<span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
										Without Compromise
									</span>
								</h2>

								<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
									Our trading approach combines algorithmic execution with
									real-time oversight from a dedicated human risk team. This
									hybrid framework enables responsive intervention during
									periods of volatility, strengthening control over exposures
									and operational risk.
								</p>
							</div>
						</div>

						{/* Optimized Feature Cards Grid with staggered loading */}
						<div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
							{features.map((feature, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 15 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-50px 0px" }}
									transition={{
										duration: 0.5,
										delay: 0.1 + Math.min(index * 0.1, 0.3),
									}}
								>
									<FeatureCard {...feature} />
								</motion.div>
							))}
						</div>

						{/* Simplified Elite Status Indicators */}
						<div className="mt-16 text-center">
							<div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 px-5 sm:px-8 py-3 sm:py-4 bg-blue-50/50 rounded-full">
								<div className="flex items-center gap-2">
									<LuLock className="h-5 w-5 text-blue-600 flex-shrink-0" />
									<span className="text-sm font-medium text-blue-600 whitespace-nowrap">
										Institutional Grade Security
									</span>
								</div>
								<div className="hidden sm:block w-px h-6 bg-blue-200" />
								<div className="flex items-center gap-2">
									<LuZap className="h-5 w-5 text-blue-600 flex-shrink-0" />
									<span className="text-sm font-medium text-blue-600 whitespace-nowrap">
										24/7 Algorithmic Trading
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Enhanced CTA Section with Dark Mode */}
			<div className="bg-blue-800 relative overflow-hidden">
				{/* Background Gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-rich-blue-800 to-rich-blue-900" />

				{/* Grid Pattern */}
				<div
					className="absolute inset-0 opacity-5"
					style={{
						backgroundImage: `
                 linear-gradient(to right, rgb(255, 255, 255) 1px, transparent 1px),
                 linear-gradient(to bottom, rgb(255, 255, 255) 1px, transparent 1px)
               `,
						backgroundSize: "24px 24px",
					}}
				/>

				{/* Glow Effects */}
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[128px]" />

				{/* Actual CTA Component */}
				<div className="relative">
					<SectionCTA
						title="Technology-Driven Investment Excellence"
						description="Our proprietary algorithms work around the clock to identify opportunities and optimise positions in ways that are fundamentally different to the traditional approach"
						buttonText="Talk With A Proffesional"
						darkMode={true}
						variant="compact"
						urgencyType="exclusive-access"
						useLiveData={true}
						disclaimerText="Investment strategies involve risk and are not suitable for all investors."
					/>
				</div>
			</div>
		</>
	);
};

export default FeaturesSection;
