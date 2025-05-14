import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { LuTarget } from "react-icons/lu";
import { useAccountData } from "../../hooks/useAccountData";

const ProblemSection: React.FC = () => {
	const { ref: sectionRef, controls: sectionControls } = useScrollAnimation({
		threshold: 0.2,
	});

	const [activeCard, setActiveCard] = useState<"left" | "right" | null>(null);
	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	const { accountQuery } = useAccountData();
	const {
		data: accountData,
		isLoading: accountDataLoading,
		isError: isErrorProcessing,
	} = accountQuery;

	return (
		<div className="relative overflow-hidden bg-gradient-to-b from-rich-blue-900 to-rich-blue-800">
			{/* Enhanced Background */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 opacity-30">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,249,240,0.1),transparent_70%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(252,249,240,0.1),transparent_70%)]" />
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className="absolute h-2 w-2 bg-cream-50/20 rounded-full animate-pulse"
							style={{
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${3 + Math.random() * 2}s`,
							}}
						/>
					))}
				</div>
			</div>

			<motion.div
				ref={sectionRef}
				initial="hidden"
				animate={sectionControls}
				className="relative py-24 lg:py-32"
			>
				<div className="max-w-7xl mx-auto px-8 lg:px-12">
					{/* Updated Title Section with Background Text */}
					<motion.div
						className="text-center mb-20"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 1 }}
					>
						<div
							className="section-title relative"
							data-text="THE PROBLEM"
							style={
								{
									"--section-title-color": "rgba(252, 249, 240, 0.1)",
								} as React.CSSProperties
							}
						>
							<motion.h2
								className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-50 mb-8"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 1, delay: 0.3 }}
							>
								Capital Deserves <br className="hidden sm:block" />
								<span className="text-rich-blue-400">
									Elite-Level Transparency
								</span>
							</motion.h2>

							<motion.p
								className="text-lg sm:text-xl font-medium text-cream-50/90 mb-6 relative"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 1, delay: 0.2 }}
							>
								While most managers report monthly or quarterly, Delta Edge
								Capital takes a different approach. We provide investors near
								real time updates on our metrics following every trade
								execution. Our approach offers qualified investors a deep
								insight into how their capital is managed.
							</motion.p>
						</div>
					</motion.div>

					{/* Enhanced Card Grid */}
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
						{/* Left Card */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1, delay: 0.3 }}
							onMouseEnter={() => setActiveCard("right")}
							onMouseLeave={() => setActiveCard(null)}
							className="relative group"
						>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-rich-blue-400/20 to-rich-blue-500/20 rounded-2xl blur-xl transition-opacity duration-300"
								animate={{ opacity: activeCard === "right" ? 1 : 0 }}
							/>

							<div className="relative bg-gradient-to-br from-rich-blue-800/50 to-rich-blue-900/50 rounded-2xl backdrop-blur-sm border border-cream-50/10 h-full overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-rich-blue-500/0 via-rich-blue-400/10 to-rich-blue-500/0 animate-shimmer" />

								<div className="relative p-8 lg:p-10 space-y-8">
									<h3 className="text-2xl sm:text-3xl font-bold text-cream-50">
										Detailed Insights
									</h3>

									<div className="space-y-6">
										<p className="text-lg text-cream-100/90">
											Where opacity is still common across the industry we take
											a fundamentally different stance. Our approach offers
											investors a high level of transparency.
										</p>

										<div className="grid gap-6">
											{[
												{
													label: "Monthly Returns",
													value: accountData
														? `+${accountData.monthly}%`
														: "+1.76%",
													desc: "Consistent Growth",
												},
												{
													label: "Success Rate",
													value: accountData
														? `${accountData.successRate}%`
														: "88%",
													desc: "Proven Track Record",
												},
												{
													label: "Maximum Drawdown",
													value: accountData
														? `${accountData.drawdown}%`
														: "2.28%",
													desc: "Minimised Risk",
												},
											].map((stat, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, y: 20 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{
														duration: 0.5,
														delay: 0.7 + index * 0.1,
													}}
													onMouseEnter={() => setHoveredItem(index + 10)}
													onMouseLeave={() => setHoveredItem(null)}
													className="relative overflow-hidden"
												>
													<AnimatePresence>
														{hoveredItem === index + 10 && (
															<motion.div
																initial={{ opacity: 0, x: "-100%" }}
																animate={{ opacity: 1, x: 0 }}
																exit={{ opacity: 0, x: "100%" }}
																transition={{ duration: 0.3 }}
																className="absolute inset-0 bg-rich-blue-400/10"
															/>
														)}
													</AnimatePresence>
													<div className="relative flex items-center gap-4 bg-cream-50/5 rounded-xl p-4 border border-cream-50/10">
														<div className="flex-1">
															<div className="text-sm text-cream-100/80">
																{stat.label}
															</div>
															<div className="text-xs text-cream-100/60 mt-1">
																{stat.desc}
															</div>
														</div>
														<div className="text-2xl font-bold text-cream-50">
															{stat.value}
														</div>
													</div>
												</motion.div>
											))}
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						{/* Right Card */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 1, delay: 0.3 }}
							onMouseEnter={() => setActiveCard("left")}
							onMouseLeave={() => setActiveCard(null)}
							className="relative group"
						>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-rich-blue-400/20 to-rich-blue-500/20 rounded-2xl blur-xl transition-opacity duration-300"
								animate={{ opacity: activeCard === "left" ? 1 : 0 }}
							/>

							<div className="relative bg-gradient-to-br from-cream-50/10 to-cream-50/5 rounded-2xl backdrop-blur-sm border border-cream-50/10 h-full overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-cream-50/0 via-cream-50/10 to-cream-50/0 animate-shimmer" />

								<div className="relative p-8 lg:p-10 space-y-8">
									{/* <LuTarget className="h-12 w-12 text-rich-blue-400 transform group-hover:scale-110 transition-transform duration-300" /> */}

									<h3 className="text-2xl sm:text-3xl font-bold text-cream-50">
										Let's Take It Further
									</h3>

									<div className="space-y-6">
										<p className="text-lg text-cream-100/90">
											Clients receive clear visibility into the management of
											their capital. As we believe transparency means showing
											what's happening as it happens.
										</p>
										<div className="grid gap-6">
											{[
												{
													label: "This Week's Gain",
													value: accountData
														? `${
																accountData.weekGain >= 0 ? "+" : ""
														  }${accountData.weekGain.toFixed(2)}%`
														: "0.8%",
												},
												{
													label: "This Month's Gain",
													value: accountData
														? `${
																accountData.currentMonthGain >= 0 ? "+" : ""
														  }${accountData.currentMonthGain.toFixed(2)}%`
														: "1.28%",
												},
												{
													label: "This Year's Gain",
													value: accountData
														? `${
																accountData.ytdGain >= 0 ? "+" : ""
														  }${accountData.ytdGain.toFixed(2)}%`
														: "10.28%",
												},
											].map((stat, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, y: 20 }}
													whileInView={{ opacity: 1, y: 0 }}
													viewport={{ once: true }}
													transition={{
														duration: 0.5,
														delay: 0.7 + index * 0.1,
													}}
													onMouseEnter={() => setHoveredItem(index)}
													onMouseLeave={() => setHoveredItem(null)}
													className="relative overflow-hidden"
												>
													<AnimatePresence>
														{hoveredItem === index && (
															<motion.div
																initial={{ opacity: 0, x: "-100%" }}
																animate={{ opacity: 1, x: 0 }}
																exit={{ opacity: 0, x: "100%" }}
																transition={{ duration: 0.3 }}
																className="absolute inset-0 bg-rich-blue-400/10"
															/>
														)}
													</AnimatePresence>
													<div className="relative flex items-center gap-4 bg-cream-50/5 rounded-xl p-4 border border-cream-50/10">
														<div className="flex-1">
															<div className="text-sm text-cream-100/80">
																{stat.label}
															</div>
														</div>
														<div className="text-2xl font-bold text-cream-50">
															{stat.value}
														</div>
													</div>
												</motion.div>
											))}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ProblemSection;
