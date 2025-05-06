import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LuTrendingUp, LuChartSpline, LuRefreshCw } from "react-icons/lu";
import { useAccountData } from "../../hooks/useAccountData";

interface MetricCardProps {
	icon: React.ReactNode;
	value: string;
	label: string;
	description: string;
	index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
	icon,
	value,
	label,
	description,
	index,
}) => {
	const cardRef = useRef<HTMLDivElement>(null);
	const valueRef = useRef<HTMLSpanElement>(null);
	const isInView = useInView(cardRef, { once: true, amount: 0.3 });
	const [isMobile, setIsMobile] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [animateValue, setAnimateValue] = useState(false);

	// Parse the numeric value from the string for animation
	const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
	const valueFormat = value.includes("%")
		? "%"
		: value.includes("£")
		? "£"
		: "";
	const hasPlus = value.includes("+");

	// Generate a random number within 30% of the actual value
	const getRandomValue = () => {
		const min = numericValue * 0.7;
		const max = numericValue * 1.3;
		return Math.random() * (max - min) + min;
	};

	// Trigger value counter animation when in view
	useEffect(() => {
		if (isInView) {
			// Delay to make it more dramatic
			const timer = setTimeout(() => {
				setAnimateValue(true);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isInView]);

	// Number animation effect
	useEffect(() => {
		if (!animateValue || !valueRef.current) return;

		let startValue = getRandomValue();
		const duration = 2000; // 2 seconds
		const startTime = Date.now();

		const updateValue = () => {
			const currentTime = Date.now();
			const elapsed = currentTime - startTime;

			if (elapsed < duration) {
				// Easing function for smooth animation
				const progress = 1 - Math.pow(1 - elapsed / duration, 3);
				const currentValue =
					startValue + (numericValue - startValue) * progress;

				// Format the value based on its type
				if (valueFormat === "%") {
					valueRef.current!.textContent = `${
						hasPlus ? "+" : ""
					}${currentValue.toFixed(1)}%`;
				} else if (valueFormat === "£") {
					valueRef.current!.textContent = `£${Math.round(
						currentValue
					).toLocaleString()}`;
				} else {
					valueRef.current!.textContent = currentValue.toFixed(1);
				}

				requestAnimationFrame(updateValue);
			} else {
				// Set final value
				valueRef.current!.textContent = value;
			}
		};

		requestAnimationFrame(updateValue);
	}, [animateValue, numericValue, value, valueFormat]);

	// Check if device is mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Enhanced animation patterns
	const variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.165, 0.84, 0.44, 1],
			},
		},
		hover: {
			y: -4,
			boxShadow: "0 20px 30px -10px rgba(0, 82, 204, 0.15)",
			transition: {
				duration: 0.3,
				ease: [0.165, 0.84, 0.44, 1],
			},
		},
	};

	// Generate a gradient based on index
	const getGradient = (idx: number) => {
		const gradients = [
			"from-rich-blue-800 to-rich-blue-700",
			"from-rich-blue-700 to-rich-blue-600",
			"from-rich-blue-600 to-rich-blue-500",
		];
		return gradients[idx % gradients.length];
	};

	return (
		<motion.div
			ref={cardRef}
			className="relative group"
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			whileHover="hover"
			variants={variants}
			onMouseEnter={() => !isMobile && setIsHovered(true)}
			onMouseLeave={() => !isMobile && setIsHovered(false)}
		>
			{/* Enhanced background glow effect */}
			<motion.div
				className="absolute -inset-4 rounded-3xl opacity-0 bg-gradient-to-r from-rich-blue-500/5 via-rich-blue-400/10 to-rich-blue-500/5 blur-xl"
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 0 },
					hover: { opacity: 1 },
				}}
			/>

			{/* Refined Card Shadow - Professional & Subtle */}
			<motion.div
				className="absolute -inset-px rounded-2xl shadow-lg"
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 1 },
					hover: { opacity: 1 },
				}}
			>
				{/* Professional subtle shadow */}
				<div className="absolute inset-0 rounded-2xl bg-rich-blue-50/50" />
			</motion.div>

			{/* Premium border effect on hover */}
			<motion.div
				className="absolute -inset-[1.5px] rounded-2xl overflow-hidden opacity-0"
				variants={{
					hidden: { opacity: 0 },
					visible: { opacity: 0 },
					hover: {
						opacity: 1,
						transition: { duration: 0.2 },
					},
				}}
			>
				<motion.div
					className="absolute inset-0 rounded-2xl"
					animate={{
						background: [
							"linear-gradient(90deg, rgba(0,82,204,0.1) 0%, rgba(59,130,246,0.2) 50%, rgba(0,82,204,0.1) 100%)",
							"linear-gradient(90deg, rgba(59,130,246,0.2) 0%, rgba(0,82,204,0.1) 50%, rgba(59,130,246,0.2) 100%)",
							"linear-gradient(90deg, rgba(0,82,204,0.1) 0%, rgba(59,130,246,0.2) 50%, rgba(0,82,204,0.1) 100%)",
						],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</motion.div>

			{/* Clean Professional Card Content */}
			<div className="relative rounded-2xl overflow-hidden h-full shadow-sm">
				{/* Clean white background for optimal readability */}
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-white" />
					<div className="absolute inset-0 rounded-2xl border border-rich-blue-100" />

					{/* Subtle top highlight for depth */}
					<div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-rich-blue-100/0 via-rich-blue-200/50 to-rich-blue-100/0" />

					{/* Particle effect background (subtle) */}
					<div className="absolute inset-0 overflow-hidden rounded-2xl opacity-10">
						{Array.from({ length: 8 }).map((_, i) => (
							<motion.div
								key={i}
								className="absolute w-1 h-1 rounded-full bg-rich-blue-500"
								style={{
									top: `${Math.random() * 100}%`,
									left: `${Math.random() * 100}%`,
								}}
								animate={{
									y: [0, -15, 0],
									opacity: [0, 1, 0],
									scale: [0, 1, 0],
								}}
								transition={{
									duration: 4 + Math.random() * 4,
									repeat: Infinity,
									delay: Math.random() * 5,
								}}
							/>
						))}
					</div>
				</div>

				<div className="relative p-6 md:p-8 h-full flex flex-col z-10">
					{/* Professional header with animated icon */}
					<div className="flex items-center mb-5">
						{/* Clean modern icon treatment with animation */}
						<div className="flex-shrink-0 mr-4">
							<motion.div
								className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-rich-blue-600 to-rich-blue-700 shadow-sm flex items-center justify-center"
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.2 },
								}}
							>
								<motion.div
									animate={isHovered ? { rotateY: 360 } : { rotateY: 0 }}
									transition={{
										duration: 0.8,
										ease: "easeInOut",
										type: "tween",
									}}
								>
									{React.cloneElement(icon as React.ReactElement, {
										className: "h-6 w-6 text-white",
									})}
								</motion.div>

								{/* Subtle accent line with animation */}
								<motion.div
									className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-rich-blue-500/30 rounded-full"
									animate={{
										width: isHovered ? "70%" : "60%",
										opacity: isHovered ? 0.7 : 0.3,
									}}
									transition={{ duration: 0.8 }}
								/>

								{/* Pulse effect around icon */}
								<motion.div
									className="absolute inset-0 rounded-lg border border-rich-blue-400/20"
									animate={
										isHovered
											? {
													scale: 1.1,
													opacity: 0.5,
													borderColor: "rgba(59,130,246,0.4)",
											  }
											: {
													scale: 1,
													opacity: 0,
													borderColor: "rgba(0,82,204,0)",
											  }
									}
									transition={{
										duration: 0.3,
										ease: "easeOut",
									}}
								/>
							</motion.div>
						</div>

						{/* Category label - clean professional design */}
						<div className="flex flex-col">
							<motion.span
								className="text-xs font-semibold text-rich-blue-600 uppercase tracking-wide"
								animate={
									isHovered
										? {
												color: [
													"rgb(0,82,204)",
													"rgb(59,130,246)",
													"rgb(0,82,204)",
												],
										  }
										: { color: "rgb(0,82,204)" }
								}
								transition={{
									duration: 2,
									ease: "easeInOut",
									type: "tween",
								}}
							>
								{label}
							</motion.span>

							{/* Value with animated counter effect */}
							<motion.span
								ref={valueRef}
								className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rich-blue-800 to-rich-blue-600 bg-clip-text text-transparent"
							>
								{value}
							</motion.span>
						</div>
					</div>

					{/* Description with professional styling and staggered animation */}
					<div className="space-y-3 flex-grow">
						{description.split(". ").map((sentence, idx) => (
							<motion.div
								key={idx}
								className="flex items-start gap-2 text-sm text-rich-blue-700/90"
								variants={{
									hidden: { y: 10, opacity: 0 },
									visible: {
										y: 0,
										opacity: 1,
										transition: { delay: idx * 0.1 + 0.2 },
									},
									hover: {
										y: 0,
										opacity: 1,
										x: isHovered ? [0, 2, 0] : 0,
										transition: {
											x: {
												delay: idx * 0.05,
												duration: 0.5,
												ease: "easeInOut",
											},
										},
									},
								}}
							>
								{/* Enhanced bullet point design */}
								<motion.div
									className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-rich-blue-500"
									animate={
										isHovered
											? {
													scale: 1.5,
													opacity: 1,
													backgroundColor: "rgba(59,130,246,0.8)",
											  }
											: {
													scale: 1,
													opacity: 0.5,
													backgroundColor: "rgba(0,82,204,0.5)",
											  }
									}
									transition={{
										duration: 0.3,
										ease: "easeOut",
									}}
								/>
								<p>
									{sentence}
									{sentence.endsWith(".") ? "" : "."}
								</p>
							</motion.div>
						))}
					</div>

					{/* Animated bottom accent */}
					<motion.div
						className="absolute bottom-3 right-3"
						animate={
							isHovered ? { x: 0, opacity: 0.7 } : { x: 0, opacity: 0.3 }
						}
						transition={{ duration: 0.3, ease: "easeOut" }}
					>
						<div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-rich-blue-400/50 to-transparent" />
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

const PerformanceMetrics: React.FC = () => {
	const { accountQuery } = useAccountData();
	const {
		isLoading,
		data: accountData,
		isError,
		refetch,
		error,
	} = accountQuery;

	// Loading state with animation matching feature cards
	if (isLoading) {
		return (
			<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
				{[1, 2].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						className="relative h-80 bg-gradient-to-br from-rich-blue-800/40 to-rich-blue-900/40 rounded-2xl border border-cream-50/10 p-8"
					>
						<div className="absolute inset-0 flex items-center justify-center">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
								className="w-12 h-12 border-2 border-rich-blue-500/30 border-t-rich-blue-500/80 rounded-full"
							/>
						</div>
					</motion.div>
				))}
			</div>
		);
	}

	// Error state with animation
	if (isError) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="p-8 bg-gradient-to-br from-rich-blue-900/90 to-rich-blue-800/90 rounded-2xl border border-red-500/20"
			>
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-bold text-cream-50 mb-2">
							Unable to Load Performance Data
						</h3>
						<p className="text-cream-50/80">
							{error instanceof Error
								? error.message
								: "An error occurred while fetching performance data"}
						</p>
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => refetch()}
						className="px-5 py-3 bg-cream-50/10 text-cream-50 rounded-xl border border-cream-50/20 hover:bg-cream-50/20 transition-colors"
					>
						<LuRefreshCw className="h-5 w-5" />
					</motion.button>
				</div>
			</motion.div>
		);
	}

	// Format metrics data for display
	const metricsData = [
		{
			icon: <LuTrendingUp />,
			label: "Returns",
			value: accountData?.gain ? `${accountData.gain.toFixed(2)}%` : "+27.5%",
			description:
				"Our algorithmic strategies aim to optimise returns while managing risk. Past performance is not indicative of future results",
		},
		{
			icon: <LuChartSpline />,
			label: "Success",
			value: accountData?.successRate
				? `${accountData.successRate.toFixed(1)}%`
				: "78.3%",
			description:
				"Precision trading with algorithmic discipline. Our execution rate demonstrates systematic excellence in all markets",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
			{metricsData.map((metric, index) => (
				<MetricCard
					key={index}
					icon={metric.icon}
					label={metric.label}
					value={metric.value}
					description={metric.description}
					index={index}
				/>
			))}
		</div>
	);
};

export default PerformanceMetrics;
