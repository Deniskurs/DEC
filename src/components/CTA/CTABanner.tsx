import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowRight, LuX, LuTrendingUp, LuShield } from "react-icons/lu";
import { useAccountData } from "../../hooks/useAccountData";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface CTABannerProps {
	isVisible: boolean;
	variant?: "standard" | "minimal";
}

const CTABanner: React.FC<CTABannerProps> = ({
	isVisible,
	variant = "standard",
}) => {
	const [dismissed, setDismissed] = useState(false);
	const [animateIn, setAnimateIn] = useState(false);

	// Media query for responsive design
	const isSmallMobile = useMediaQuery("(max-width: 480px)");

	// Get live data from the API
	const { accountQuery } = useAccountData();
	const { data: accountData, isLoading } = accountQuery;

	// Reset dismissed state when visibility changes
	useEffect(() => {
		if (isVisible) {
			// Small delay before animating in for better UX
			const timer = setTimeout(() => {
				setAnimateIn(true);
			}, 500);
			return () => clearTimeout(timer);
		} else {
			setAnimateIn(false);
			// Reset dismissed state when banner is hidden
			setDismissed(false);
		}
	}, [isVisible]);

	if (dismissed || !isVisible) return null;

	// Get performance data
	const getPerformanceValue = () => {
		if (isLoading || !accountData) return "+24%";
		return accountData.monthly
			? `+${(accountData.monthly * 12).toFixed(1)}%`
			: "+24%";
	};

	// Minimal variant (compact design for mobile or less intrusive display)
	if (variant === "minimal" || isSmallMobile) {
		return (
			<AnimatePresence>
				{animateIn && (
					<motion.div
						className="fixed bottom-4 right-4 z-50 pointer-events-none"
						initial={{ y: 20, opacity: 0, scale: 0.9 }}
						animate={{ y: 0, opacity: 1, scale: 1 }}
						exit={{ y: 20, opacity: 0, scale: 0.9 }}
						transition={{ type: "spring", damping: 30, stiffness: 400 }}
					>
						<button
							onClick={() => setDismissed(true)}
							className="absolute -top-2 -right-2 size-6 z-40  flex items-center justify-center text-cream-50/70 hover:text-cream-50 transition-colors duration-200  rounded-full bg-rich-blue-700"
							aria-label="Dismiss banner"
							style={{
								minWidth: "0px",
								minHeight: "0px",
							}}
						>
							<LuX className="size-3" />
						</button>
						<div className="pointer-events-auto">
							<motion.div
								className="relative overflow-hidden rounded-xl shadow-lg"
								whileHover={{ scale: 1.02 }}
								transition={{ duration: 0.2 }}
							>
								{/* Background */}
								<div className="absolute inset-0 bg-gradient-to-r from-rich-blue-900 to-rich-blue-800" />

								{/* Content */}
								<div className="relative p-3 flex items-center gap-3">
									{/* Performance indicator */}
									<div className="flex items-center gap-1 px-2 py-1 bg-rich-blue-700/50 rounded-lg">
										<LuTrendingUp className="h-3 w-3 text-green-400" />
										<span className="font-bold text-xs text-cream-50">
											{getPerformanceValue()}
										</span>
									</div>

									{/* Premium Button with 3D effect */}
									<div className="relative group">
										{/* Outer glow effect */}
										<motion.div
											className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 bg-cream-50/20"
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
											className="relative bg-cream-50 text-rich-blue-800 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-cream-100 flex items-center whitespace-nowrap overflow-hidden
                      shadow-[0_1px_2px_0_rgba(0,0,0,0.05),0_0_0_0_rgba(0,0,0,0.05)]
                      hover:shadow-[0_3px_6px_0_rgba(0,0,0,0.1),0_1px_0_0_rgba(0,0,0,0.05)]
                      active:shadow-[0_0px_0px_0_rgba(0,0,0,0.05),inset_0_1px_1px_0_rgba(0,0,0,0.1)]
                      border border-cream-200/20"
											whileHover={{
												y: -1,
												scale: 1.03,
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 10,
												},
											}}
											whileTap={{
												y: 0,
												scale: 0.97,
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 10,
												},
											}}
										>
											{/* Animated gradient border */}
											<motion.div
												className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
												style={{
													background:
														"linear-gradient(90deg, rgba(0,82,204,0) 0%, rgba(0,82,204,0.1) 50%, rgba(0,82,204,0) 100%)",
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

											<span className="relative z-10 flex items-center">
												INVEST NOW
												<motion.div
													animate={{ x: [0, 2, 0] }}
													transition={{
														duration: 1,
														repeat: Infinity,
														repeatType: "reverse",
														ease: "easeInOut",
													}}
												>
													<LuArrowRight className="ml-1 h-3 w-3" />
												</motion.div>
											</span>
										</motion.button>
									</div>

									{/* Close button */}
								</div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		);
	}

	// Standard variant (default) - completely redesigned for elegance and proper alignment
	return (
		<AnimatePresence>
			{animateIn && (
				<motion.div
					className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none"
					initial={{ y: 60, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 60, opacity: 0 }}
					transition={{ type: "spring", damping: 30, stiffness: 400 }}
				>
					<div className="max-w-3xl mx-auto pointer-events-auto">
						<motion.div
							className="relative  rounded-xl shadow-lg"
							whileHover={{ scale: 1.01 }}
							transition={{ duration: 0.2 }}
						>
							{/* Background with gradient */}
							<div className="absolute inset-0 bg-gradient-to-r rounded-xl from-rich-blue-900 via-rich-blue-800 to-rich-blue-900" />

							{/* Subtle grid pattern */}
							<div
								className="absolute inset-0 opacity-5"
								style={{
									backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                  `,
									backgroundSize: "20px 20px",
								}}
							/>

							{/* Content */}
							<div className="relative flex items-center justify-between p-4">
								{/* Left side with text and performance */}
								<div className="flex items-center gap-4">
									{/* Performance indicator - always visible */}
									<div className="flex items-center gap-2 px-3 py-2 bg-rich-blue-700/50 rounded-lg border border-rich-blue-600/20">
										<div className="flex flex-col">
											<div className="flex items-center gap-1">
												<span className="font-bold text-sm text-cream-50">
													{getPerformanceValue()}
												</span>
												<LuTrendingUp className="h-4 w-4 text-green-400" />
											</div>
											<span className="text-xs text-cream-50/70">
												Annual Return
											</span>
										</div>
									</div>

									{/* Text content - hidden on very small screens */}
									{!isSmallMobile && (
										<div className="hidden md:block">
											<h3 className="text-lg font-bold text-cream-50">
												Superior Returns Await
											</h3>
											<p className=" text-cream-50/80 text-sm">
												Discover our sophisticated investment approach and learn
												how we may help you achieve your financial goals.
											</p>
										</div>
									)}
								</div>

								{/* Right side with CTA button and close */}
								<div className="flex items-center gap-3">
									<button
										onClick={() => setDismissed(true)}
										className="absolute -top-2 -right-2 size-6   flex items-center justify-center text-cream-50/70 hover:text-cream-50 transition-colors duration-200  rounded-full bg-rich-blue-700"
										aria-label="Dismiss banner"
										style={{
											minWidth: "0px",
											minHeight: "0px",
										}}
									>
										<LuX className="size-3" />
									</button>
									{/* Premium CTA Button with advanced effects */}
									<div className="relative group">
										{/* Magnetic hover area - larger than the button itself */}
										<div className="absolute -inset-4 rounded-xl opacity-0" />

										{/* Outer glow effect */}
										<motion.div
											className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 bg-cream-50/20"
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
											className="relative overflow-hidden bg-cream-50 text-rich-blue-800 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-sm hover:bg-cream-100 flex items-center whitespace-nowrap border border-cream-200/20
                      shadow-[0_2px_0_0_rgba(0,0,0,0.05),0_0_0_0_rgba(0,0,0,0.05)]
                      hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.1),0_1px_0_0_rgba(0,0,0,0.05)]
                      active:shadow-[0_0px_0px_0_rgba(0,0,0,0.05),inset_0_1px_2px_0_rgba(0,0,0,0.1)]"
											whileHover={{
												y: -2,
												scale: 1.05,
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 10,
												},
											}}
											whileTap={{
												y: 0,
												scale: 0.98,
												transition: {
													type: "spring",
													stiffness: 400,
													damping: 10,
												},
											}}
										>
											{/* Animated gradient border */}
											<motion.div
												className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
												style={{
													background:
														"linear-gradient(90deg, rgba(0,82,204,0) 0%, rgba(0,82,204,0.1) 50%, rgba(0,82,204,0) 100%)",
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
												className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-rich-blue-600/20 to-transparent -skew-x-12"
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
											<span className="relative z-10 flex items-center ml-2">
												INVEST SMARTER
												<motion.div
													animate={{ x: [0, 4, 0] }}
													transition={{
														duration: 1.5,
														repeat: Infinity,
														repeatType: "reverse",
														ease: "easeInOut",
														repeatDelay: 0.5,
													}}
												>
													<LuArrowRight className="ml-2 h-4 w-4" />
												</motion.div>
											</span>
										</motion.button>
									</div>

									{/* Close button */}
								</div>
							</div>

							{/* Disclaimer */}
							<div className="relative px-4 pb-2 text-[10px] text-cream-50/50 flex items-center gap-1.5">
								<LuShield className="h-3 w-3 text-cream-50/40 flex-shrink-0" />
								<p>Past performance is not indicative of future results</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CTABanner;
