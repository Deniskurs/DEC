import React from "react";
import { motion } from "framer-motion";
import {
	LuArrowRight,
	LuTimer,
	LuStar,
	LuShield,
	LuChartNoAxesCombined,
	LuZap,
	LuClock,
	LuArrowUpRight,
} from "react-icons/lu";
import { useAccountData } from "../../hooks/useAccountData";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface PerformanceMetricProps {
	label: string;
	value: string;
	trend?: "up" | "down" | "neutral";
}

interface TestimonialProps {
	quote: string;
	author: string;
	position?: string;
}

interface SectionCTAProps {
	title: string;
	description: string;
	buttonText: string;
	darkMode?: boolean;
	variant?: "standard" | "premium" | "conversion" | "compact";
	urgencyType?:
		| "limited-capacity"
		| "time-limited"
		| "exclusive-access"
		| "none";
	performanceMetric?: PerformanceMetricProps;
	testimonial?: TestimonialProps;
	disclaimerText?: string;
	useLiveData?: boolean;
	dataShown?: "inception" | "ytd" | "current-month";
}

const SectionCTA: React.FC<SectionCTAProps> = ({
	title,
	description,
	buttonText,
	darkMode = false,
	variant = "standard",
	urgencyType,
	performanceMetric,
	testimonial,
	disclaimerText,
	useLiveData = false,
	dataShown = "inception",
}) => {
	// Media query for responsive design - used for conditional rendering
	const isMobile = useMediaQuery("(max-width: 768px)");

	// Get live data from the API
	const { accountQuery } = useAccountData();
	const { data: accountData, isLoading } = accountQuery;

	// Determine the urgency indicator text and icon based on urgencyType
	const getUrgencyContent = () => {
		switch (urgencyType) {
			case "limited-capacity":
				return {
					icon: (
						<LuTimer
							className={`h-4 w-4 ${
								darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
							}`}
						/>
					),
					text: "Limited Capacity",
				};
			case "time-limited":
				return {
					icon: (
						<LuClock
							className={`h-4 w-4 ${
								darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
							}`}
						/>
					),
					text: "Limited Time Offer",
				};
			case "exclusive-access":
				return {
					icon: (
						<LuShield
							className={`h-4 w-4 ${
								darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
							}`}
						/>
					),
					text: "Explore Exclusive Access",
				};
			case "none":
			default:
				return null;
		}
	};

	const urgencyContent = getUrgencyContent();

	// Get live metrics if useLiveData is true
	const getLiveMetric = (): PerformanceMetricProps | undefined => {
		if (!useLiveData || isLoading || !accountData) return performanceMetric;

		// Use the live data from the API
		const deltaEdgeValue = () => {
			if (isLoading || !accountData) return "+24%";

			// if (accountData.monthly) {
			// 	// First, log the raw value to help with debugging

			// 	// Determine if the monthly value is already decimal or percentage
			// 	// If accountData.monthly is something like 1.3 (meaning 1.3%)
			// 	const monthlyRateDecimal = accountData.monthly / 100;

			// 	// Calculate compound annual return
			// 	const compoundAnnualRate =
			// 		(Math.pow(1 + monthlyRateDecimal, 12) - 1) * 100;

			// 	// Log the calculated value

			// 	return `+${compoundAnnualRate.toFixed(2)}%`;
			// }

			return `+${accountData.gain}`;
		};

		const dataMapping = {
			inception: {
				label: "Since Inception",
				value: `${deltaEdgeValue()}`,
				trend: "up",
			},
			ytd: {
				label: "Year to Date",
				value: `+${accountData.ytdGain.toFixed(2)}%`,
				trend: "up",
			},
			"current-month": {
				label: "This Month's Gain",
				value: `+${accountData.currentMonthGain.toFixed(2)}%`,
				trend: "up",
			},
		};

		return dataMapping[dataShown] as PerformanceMetricProps;
	};

	const activeMetric = getLiveMetric() || performanceMetric;

	// Performance metric component with elegant design
	const PerformanceMetric = ({
		metric,
	}: {
		metric: PerformanceMetricProps;
	}) => {
		const trendIcon =
			metric.trend === "up" ? (
				<LuArrowUpRight
					className={`h-3.5 w-3.5 ${
						darkMode ? "text-green-400" : "text-green-500"
					}`}
				/>
			) : metric.trend === "down" ? (
				<LuArrowUpRight
					className={`h-3.5 w-3.5 rotate-180 ${
						darkMode ? "text-red-400" : "text-red-500"
					}`}
				/>
			) : null;

		return (
			<div className="flex flex-col">
				<div
					className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
						darkMode ? "bg-rich-blue-700/40" : "bg-rich-blue-50/70"
					} backdrop-blur-sm border ${
						darkMode ? "border-rich-blue-600/20" : "border-rich-blue-100/50"
					}`}
				>
					<LuChartNoAxesCombined
						className={`h-4 w-4 ${
							darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
						}`}
					/>
					<div className="flex flex-col">
						<div className="flex items-center gap-1">
							<span
								className={`font-bold text-sm ${
									darkMode ? "text-cream-50" : "text-rich-blue-800"
								}`}
							>
								{metric.value}
							</span>
							{trendIcon}
						</div>
						<span
							className={`text-xs ${
								darkMode ? "text-cream-50/70" : "text-rich-blue-600/70"
							}`}
						>
							{metric.label}
						</span>
					</div>
					{useLiveData && (
						<motion.div
							className="ml-1"
							animate={{ scale: [1, 1.2, 1] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<LuZap
								className={`h-3 w-3 ${
									darkMode ? "text-cream-50/70" : "text-rich-blue-600/70"
								}`}
							/>
						</motion.div>
					)}
				</div>
			</div>
		);
	};

	// Testimonial component with elegant design
	const Testimonial = ({ testimonial }: { testimonial: TestimonialProps }) => (
		<div
			className={`mt-3 italic text-sm ${
				darkMode ? "text-cream-50/80" : "text-rich-blue-600/80"
			}`}
		>
			<p className="mb-1 leading-relaxed">"{testimonial.quote}"</p>
			<p className="font-medium">
				{testimonial.author}
				{testimonial.position && (
					<span className="opacity-70"> — {testimonial.position}</span>
				)}
			</p>
		</div>
	);

	// Disclaimer component with elegant design
	const Disclaimer = ({ text }: { text: string }) => (
		<div
			className={`mt-3 text-xs ${
				darkMode ? "text-cream-50/60" : "text-rich-blue-600/60"
			}`}
		>
			<div className="flex items-start gap-1.5">
				<LuShield
					className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${
						darkMode ? "text-cream-50/40" : "text-rich-blue-600/40"
					}`}
				/>
				<p className="leading-relaxed">{text}</p>
			</div>
		</div>
	);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	// Compact variant - elegant and minimal
	if (variant === "compact") {
		return (
			<div
				className={`reveal py-8 sm:py-10 relative ${
					darkMode
						? "bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-900"
						: "bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50"
				}`}
			>
				{/* Subtle background elements */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Elegant grid pattern */}
					<div
						className="absolute inset-0 opacity-5"
						style={{
							backgroundImage: `
                linear-gradient(to right, ${
									darkMode
										? "rgba(255, 255, 255, 0.1)"
										: "rgba(0, 82, 204, 0.1)"
								} 1px, transparent 1px),
                linear-gradient(to bottom, ${
									darkMode
										? "rgba(255, 255, 255, 0.1)"
										: "rgba(0, 82, 204, 0.1)"
								} 1px, transparent 1px)
              `,
							backgroundSize: "30px 30px",
						}}
					/>

					{/* Subtle gradient overlay */}
					<div
						className={`absolute inset-0 ${
							darkMode
								? "bg-gradient-to-r from-rich-blue-600/5 via-rich-blue-400/10 to-rich-blue-600/5"
								: "bg-gradient-to-r from-cream-200/20 via-cream-300/30 to-cream-200/20"
						}`}
					/>

					{/* Elegant accent lines */}
					<div
						className={`absolute top-0 left-1/4 right-1/4 h-px ${
							darkMode ? "bg-rich-blue-400/20" : "bg-rich-blue-200/30"
						}`}
					/>
					<div
						className={`absolute bottom-0 left-1/3 right-1/3 h-px ${
							darkMode ? "bg-rich-blue-400/20" : "bg-rich-blue-200/30"
						}`}
					/>
				</div>

				<motion.div
					className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
				>
					<div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
						{/* Left side with title and description */}
						<div className="md:flex-1 text-center md:text-left">
							{urgencyContent && (
								<motion.div
									variants={itemVariants}
									className="flex items-center gap-2 mb-2 justify-center md:justify-start"
								>
									{urgencyContent.icon}
									<span
										className={`text-xs font-medium ${
											darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
										}`}
									>
										{urgencyContent.text}
									</span>
								</motion.div>
							)}

							<motion.h3
								className={`${
									isMobile ? "text-lg" : "text-xl sm:text-2xl"
								} font-bold mb-2 leading-tight ${
									darkMode ? "text-cream-50" : "text-rich-blue-800"
								}`}
								variants={itemVariants}
							>
								{title}
							</motion.h3>

							<motion.p
								className={`text-sm leading-relaxed max-w-2xl ${
									darkMode ? "text-cream-100/90" : "text-rich-blue-600/90"
								}`}
								variants={itemVariants}
							>
								{description}
							</motion.p>

							{testimonial && (
								<motion.div variants={itemVariants}>
									<Testimonial testimonial={testimonial} />
								</motion.div>
							)}
						</div>

						{/* Right side with metrics and CTA */}
						<motion.div
							variants={itemVariants}
							className="flex flex-col items-center md:items-end gap-4"
						>
							{/* Performance metrics */}
							{activeMetric && <PerformanceMetric metric={activeMetric} />}

							{/* Ultra-premium CTA Button with advanced effects */}
							<div className="relative w-full md:w-auto group">
								{/* Magnetic hover area - larger than the button itself */}
								<div className="absolute -inset-4 rounded-xl opacity-0" />

								{/* Outer glow effect that appears on hover */}
								<motion.div
									className={`absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 ${
										darkMode ? "bg-cream-50/20" : "bg-rich-blue-600/20"
									}`}
									initial={false}
									animate={{ scale: [0.95, 1.05, 0.95] }}
									transition={{
										duration: 2,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								/>

								{/* Button with 3D effect */}
								<motion.button
									onClick={() =>
										window.open(
											"https://2znr0q4ymmj.typeform.com/to/CA5GAbp9",
											"_blank"
										)
									}
									className={`
                    relative overflow-hidden
                    w-full md:w-auto 
                    ${
											darkMode
												? "bg-cream-50 text-rich-blue-800 hover:bg-cream-100"
												: "bg-rich-blue-800 text-cream-50 hover:bg-rich-blue-700"
										} 
                    px-6 py-2.5 rounded-lg font-bold text-sm
                    border ${
											darkMode
												? "border-cream-200/20"
												: "border-rich-blue-900/10"
										}
                    transition-all duration-300
                    shadow-[0_2px_0_0_rgba(0,0,0,0.1),0_0_0_0_rgba(0,0,0,0.1)]
                    hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.1),0_1px_0_0_rgba(0,0,0,0.1)]
                    active:shadow-[0_0px_0px_0_rgba(0,0,0,0.1),inset_0_1px_2px_0_rgba(0,0,0,0.1)]
                  `}
									whileHover={{
										y: -2,
										scale: 1.02,
										transition: { type: "spring", stiffness: 400, damping: 10 },
									}}
									whileTap={{
										y: 0,
										scale: 0.98,
										transition: { type: "spring", stiffness: 400, damping: 10 },
									}}
								>
									{/* Animated gradient border */}
									<motion.div
										className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
										style={{
											background: `linear-gradient(90deg, ${
												darkMode ? "rgba(0,82,204,0)" : "rgba(252,249,240,0)"
											} 0%, ${
												darkMode
													? "rgba(0,82,204,0.2)"
													: "rgba(252,249,240,0.2)"
											} 50%, ${
												darkMode ? "rgba(0,82,204,0)" : "rgba(252,249,240,0)"
											} 100%)`,
										}}
										animate={{
											backgroundPosition: ["0% 0%", "100% 0%"],
										}}
										transition={{
											duration: 1.5,
											ease: "linear",
											repeat: Infinity,
										}}
									/>

									{/* Elegant shimmer effect */}
									<motion.div
										className={`absolute inset-0 z-10 bg-gradient-to-r from-transparent ${
											darkMode ? "via-rich-blue-600/20" : "via-white/20"
										} to-transparent -skew-x-12`}
										animate={{
											x: ["-100%", "100%"],
										}}
										transition={{
											duration: 2,
											ease: "easeInOut",
											repeat: Infinity,
											repeatDelay: 3,
										}}
									/>

									{/* Button content with animated icon */}
									<span className="relative z-10 flex uppercase items-center justify-center whitespace-nowrap">
										{buttonText}
										<motion.div
											animate={{ x: [0, 4, 0] }}
											transition={{
												duration: 1.5,
												repeat: Infinity,
												repeatType: "reverse",
												ease: "easeInOut",
												repeatDelay: 1,
											}}
										>
											<LuArrowRight className="ml-2 h-4 w-4" />
										</motion.div>
									</span>
								</motion.button>
							</div>

							{/* Disclaimer text */}
							{disclaimerText && (
								<motion.div variants={itemVariants} className="mt-2">
									<Disclaimer text={disclaimerText} />
								</motion.div>
							)}
						</motion.div>
					</div>
				</motion.div>
			</div>
		);
	}

	// Standard variant - elegant and full-featured
	return (
		<div
			className={`reveal py-10 sm:py-12 relative ${
				darkMode
					? "bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-900"
					: "bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50"
			}`}
		>
			{/* Elegant background elements */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Subtle gradient overlay */}
				<div
					className={`absolute inset-0 ${
						darkMode
							? "bg-gradient-to-r from-rich-blue-600/10 via-rich-blue-400/5 to-rich-blue-600/10"
							: "bg-gradient-to-r from-cream-200/30 via-cream-300/20 to-cream-200/30"
					}`}
				/>

				{/* Elegant grid pattern */}
				<div
					className="absolute inset-0 opacity-5"
					style={{
						backgroundImage: `
              linear-gradient(45deg, ${
								darkMode ? "rgba(252, 249, 240, 0.1)" : "rgba(0, 82, 204, 0.1)"
							} 1px, transparent 1px)
            `,
						backgroundSize: "20px 20px",
					}}
				/>

				{/* Subtle accent elements */}
				<div
					className={`absolute top-0 left-1/4 w-px h-12 ${
						darkMode ? "bg-rich-blue-400/20" : "bg-rich-blue-200/30"
					}`}
				/>
				<div
					className={`absolute bottom-0 right-1/4 w-px h-12 ${
						darkMode ? "bg-rich-blue-400/20" : "bg-rich-blue-200/30"
					}`}
				/>
				<div
					className={`absolute top-1/2 left-12 w-2 h-2 rounded-full ${
						darkMode ? "bg-rich-blue-400/10" : "bg-rich-blue-200/20"
					}`}
				/>
				<div
					className={`absolute top-1/3 right-12 w-1 h-1 rounded-full ${
						darkMode ? "bg-rich-blue-400/10" : "bg-rich-blue-200/20"
					}`}
				/>
			</div>

			<motion.div
				className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
			>
				<div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
					{/* Left side with title, description, and testimonial */}
					<div className="md:flex-1 text-center md:text-left">
						{urgencyContent && (
							<motion.div
								variants={itemVariants}
								className="flex items-center gap-2 mb-3 justify-center md:justify-start"
							>
								{urgencyContent.icon}
								<span
									className={`text-xs font-medium ${
										darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
									}`}
								>
									{urgencyContent.text}
								</span>
							</motion.div>
						)}

						<motion.h3
							className={`${
								isMobile ? "text-xl" : "text-2xl sm:text-3xl"
							} font-bold mb-2 leading-tight ${
								darkMode ? "text-cream-50" : "text-rich-blue-800"
							}`}
							variants={itemVariants}
						>
							{title}
						</motion.h3>

						<motion.p
							className={`text-base leading-relaxed max-w-2xl ${
								darkMode ? "text-cream-100/90" : "text-rich-blue-600/90"
							}`}
							variants={itemVariants}
						>
							{description}
						</motion.p>

						{testimonial && (
							<motion.div variants={itemVariants}>
								<Testimonial testimonial={testimonial} />
							</motion.div>
						)}

						{disclaimerText && (
							<motion.div variants={itemVariants} className="mt-4">
								<Disclaimer text={disclaimerText} />
							</motion.div>
						)}
					</div>

					{/* Right side with metrics and CTA */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col items-center md:items-end gap-4"
					>
						{/* Performance metrics */}
						{activeMetric && <PerformanceMetric metric={activeMetric} />}

						{/* Ultra-premium CTA Button with advanced effects */}
						<div className="relative w-full md:w-auto group">
							{/* Magnetic hover area - larger than the button itself */}
							<div className="absolute -inset-4 rounded-xl opacity-0" />

							{/* Outer glow effect that appears on hover */}
							<motion.div
								className={`absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 ${
									darkMode ? "bg-cream-50/20" : "bg-rich-blue-600/20"
								}`}
								initial={false}
								animate={{ scale: [0.95, 1.05, 0.95] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>

							{/* Button with 3D effect */}
							<motion.button
								onClick={() =>
									window.open(
										"https://2znr0q4ymmj.typeform.com/to/CA5GAbp9",
										"_blank"
									)
								}
								className={`
                  relative overflow-hidden
                  w-full md:w-auto 
                  group
                  ${
										darkMode
											? "bg-cream-50 text-rich-blue-800 hover:bg-cream-100"
											: "bg-rich-blue-800 text-cream-50 hover:bg-rich-blue-700"
									} 
                  px-6 py-3 rounded-lg font-bold text-sm
                  border ${
										darkMode ? "border-cream-200/20" : "border-rich-blue-900/10"
									}
                  transition-all duration-300
                  shadow-[0_2px_0_0_rgba(0,0,0,0.1),0_0_0_0_rgba(0,0,0,0.1)]
                  hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.1),0_1px_0_0_rgba(0,0,0,0.1)]
                  active:shadow-[0_0px_0px_0_rgba(0,0,0,0.1),inset_0_1px_2px_0_rgba(0,0,0,0.1)]
                `}
								whileHover={{
									y: -2,
									scale: 1.03,
									transition: { type: "spring", stiffness: 400, damping: 10 },
								}}
								whileTap={{
									y: 0,
									scale: 0.98,
									transition: { type: "spring", stiffness: 400, damping: 10 },
								}}
							>
								{/* Animated gradient border */}
								<motion.div
									className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
									style={{
										background: `linear-gradient(90deg, ${
											darkMode ? "rgba(0,82,204,0)" : "rgba(252,249,240,0)"
										} 0%, ${
											darkMode ? "rgba(0,82,204,0.2)" : "rgba(252,249,240,0.2)"
										} 50%, ${
											darkMode ? "rgba(0,82,204,0)" : "rgba(252,249,240,0)"
										} 100%)`,
									}}
									animate={{
										backgroundPosition: ["0% 0%", "100% 0%"],
									}}
									transition={{
										duration: 1.5,
										ease: "linear",
										repeat: Infinity,
									}}
								/>

								{/* Elegant shimmer effect */}
								<motion.div
									className={`absolute inset-0 z-10 bg-gradient-to-r from-transparent ${
										darkMode ? "via-rich-blue-600/30" : "via-white/30"
									} to-transparent -skew-x-12`}
									animate={{
										x: ["-100%", "100%"],
									}}
									transition={{
										duration: 1.5,
										ease: "easeInOut",
										repeat: Infinity,
										repeatDelay: 1,
									}}
								/>

								{/* Button content with animated icon */}
								<span className="relative z-10 flex items-center justify-center whitespace-nowrap">
									{buttonText}
									<motion.div
										animate={{ x: [0, 4, 0] }}
										transition={{
											duration: 1.5,
											repeat: Infinity,
											repeatType: "reverse",
											ease: "easeInOut",
											repeatDelay: 1,
										}}
									>
										<LuArrowRight className="ml-2 h-4 w-4" />
									</motion.div>
								</span>
							</motion.button>
						</div>

						{/* Trustpilot Rating */}
						{/* <div className="flex items-center gap-2 mt-2">
							<div
								className={`flex items-center text-sm font-semibold ${
									darkMode ? "text-cream-50" : "text-rich-blue-800"
								}`}
							>
								<span className="mr-2 text-xs">Excellent</span>
								<div className="flex items-center gap-0.5">
									{[...Array(5)].map((_, i) => (
										<LuStar
											key={i}
											className={`h-3.5 w-3.5 fill-current ${
												darkMode ? "text-green-400" : "text-green-500"
											}`}
										/>
									))}
								</div>
							</div>
							<span
								className={`text-xs ${
									darkMode ? "text-cream-50/80" : "text-rich-blue-600/80"
								}`}
							>
								5.0 / 5.0
							</span>
						</div> */}
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default SectionCTA;
