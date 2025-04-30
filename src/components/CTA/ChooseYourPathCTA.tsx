import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
	LuShield,
	LuZap,
	LuCheck,
	LuChevronRight,
	LuUser,
	LuInfo,
	LuBell,
} from "react-icons/lu";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const ChooseYourPathCTA: React.FC = () => {
	// For responsive design
	const isMobileView = useMediaQuery("(max-width: 768px)");

	// For parallax effect
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// Transform values for parallax
	const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
		},
	};

	const statsVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	return (
		<section
			ref={ref}
			className="relative overflow-hidden bg-gradient-to-b from-rich-blue-900 to-black text-cream-50 py-20 md:py-32"
		>
			{/* Premium background effects */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Dark luxury gradient */}
				<div className="absolute inset-0 bg-gradient-to-tr from-black via-rich-blue-900 to-black opacity-90" />

				{/* Subtle gold accent */}
				<motion.div
					className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"
					style={{ y: y1 }}
				/>

				{/* Animated background elements */}
				<motion.div
					className="absolute inset-0"
					animate={{
						background: [
							"radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.05) 0%, transparent 50%)",
							"radial-gradient(circle at 80% 80%, rgba(252, 249, 240, 0.05) 0%, transparent 50%)",
							"radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.05) 0%, transparent 50%)",
						],
					}}
					transition={{
						duration: 8,
						ease: "linear",
						repeat: Infinity,
					}}
				/>

				{/* Premium particles - very subtle */}
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={`luxury-particle-${i}`}
						className="absolute h-1 w-1 rounded-full bg-amber-300/20"
						style={{
							left: `${10 + i * 6}%`,
							top: `${Math.floor(Math.random() * 100)}%`,
						}}
						animate={{
							y: [0, -30, 0],
							opacity: [0, 0.4, 0],
							scale: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 4 + (i % 4),
							repeat: Infinity,
							delay: i * 0.3,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			{/* FCA Risk Warning - Prominent at the top */}
			{/* <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mb-8">
				<div className="bg-rich-blue-800/70 border border-cream-50/10 rounded-lg p-4 text-center">
					<div className="flex items-center justify-center gap-2 mb-1">
						<LuBell className="h-4 w-4 text-amber-300" />
						<p className="text-sm text-amber-300 font-medium">
							INVESTMENT RISK WARNING
						</p>
					</div>
					<p className="text-sm text-cream-50/90 leading-relaxed max-w-3xl mx-auto">
						The value of investments can go down as well as up. Past performance
						is not a reliable indicator of future results. Investment strategies
						involve risks and may not be suitable for all investors. Please seek
						independent financial advice if you are unsure about the suitability
						of this investment.
					</p>
				</div>
			</div> */}

			{/* Main content container */}
			<div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.1 }}
				>
					{/* Upper eyebrow text */}
					<motion.div
						className="flex justify-center mb-5"
						variants={itemVariants}
					>
						<div className="inline-flex items-center py-1 px-3 rounded-full bg-cream-50/10 text-cream-50 text-xs font-semibold tracking-wider">
							<LuInfo className="mr-1.5 h-3.5 w-3.5 text-amber-300" />
							<span>INVESTMENT APPROACHES</span>
						</div>
					</motion.div>

					{/* Main heading - bold and direct */}
					<motion.h2
						className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
						variants={itemVariants}
					>
						<span className="block">Two Investment Philosophies:</span>
						<span className="block mt-3 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent pb-2">
							Conventional vs Strategic
						</span>
					</motion.h2>

					{/* Subheading - direct and provocative */}
					<motion.p
						className="text-center text-lg md:text-xl text-cream-50/90 max-w-3xl mx-auto mb-10 md:mb-16"
						variants={itemVariants}
					>
						Different investment approaches result in different investor
						experiences.
						<span className="block mt-3 font-medium">Compare the options:</span>
					</motion.p>

					{/* Key principles instead of specific stats */}
					<motion.div
						className="flex flex-wrap justify-center gap-6 md:gap-14 my-12 md:my-20"
						variants={statsVariants}
					>
						<div className="text-center">
							<div className="flex items-center justify-center mb-2 text-amber-300">
								<LuShield className="w-5 h-5 mr-2" />
								<span className="font-bold text-xl">Personalized Strategy</span>
							</div>
							<p className="text-sm text-cream-50/80 uppercase tracking-wide">
								Tailored Approach
							</p>
						</div>

						<div className="text-center">
							<div className="flex items-center justify-center mb-2 text-amber-300">
								<LuZap className="w-5 h-5 mr-2" />
								<span className="font-bold text-xl">Algorithmic Analysis</span>
							</div>
							<p className="text-sm text-cream-50/80 uppercase tracking-wide">
								Data-Driven Decisions
							</p>
						</div>

						<div className="text-center">
							<div className="flex items-center justify-center mb-2 text-amber-300">
								<LuCheck className="w-5 h-5 mr-2" />
								<span className="font-bold text-xl">Rigorous Process</span>
							</div>
							<p className="text-sm text-cream-50/80 uppercase tracking-wide">
								Quality Control
							</p>
						</div>
					</motion.div>

					{/* Main content - two approaches with no cards */}
					<div
						className={`grid ${
							isMobileView ? "grid-cols-1" : "md:grid-cols-2"
						} gap-10 md:gap-16 my-12`}
					>
						{/* The Conventional Approach */}
						<motion.div variants={itemVariants} className="relative">
							<h3 className="text-2xl md:text-3xl font-bold mb-6 opacity-60">
								Conventional Approach
							</h3>

							<ul className="space-y-5 opacity-70">
								<li className="flex">
									<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
									<div className="ml-2">
										<p className="text-lg font-medium">
											Traditional investment vehicles
										</p>
										<p className="text-sm text-cream-50/70">
											Potentially vulnerable to inflation over time
										</p>
									</div>
								</li>
								<li className="flex">
									<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
									<div className="ml-2">
										<p className="text-lg font-medium">
											Fee structures that may compound
										</p>
										<p className="text-sm text-cream-50/70">
											Potential impact on long-term growth
										</p>
									</div>
								</li>
								<li className="flex">
									<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									</div>
									<div className="ml-2">
										<p className="text-lg font-medium">
											Slower capital appreciation
										</p>
										<p className="text-sm text-cream-50/70">
											Extended timeframes for wealth accumulation
										</p>
									</div>
								</li>
							</ul>

							<div className="mt-8 opacity-50">
								<button
									className="w-full py-4 px-8 rounded-lg bg-gray-700 text-cream-50/80 text-center font-medium hover:bg-gray-600 transition-colors duration-300"
									onClick={() => {}}
									disabled
								>
									<span>Continue With Conventional Approach</span>
								</button>
							</div>
						</motion.div>

						{/* The Strategic Approach */}
						<motion.div variants={itemVariants} className="relative">
							<h3 className="text-2xl md:text-3xl font-bold mb-6 text-amber-300">
								Strategic Approach
							</h3>

							<ul className="space-y-5">
								<li className="flex">
									<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									</div>
									<div className="ml-2">
										<p className="text-lg font-medium">
											Algorithmic trading strategies
										</p>
										<p className="text-sm text-cream-50/70">
											Designed to seek opportunities in various market
											conditions
										</p>
									</div>
								</li>
								<li className="flex">
									<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									</div>
									<div className="ml-2">
										<p className="text-lg font-medium">
											Quantitative analysis approach
										</p>
										<p className="text-sm text-cream-50/70">
											Removing emotional bias from investment decisions
										</p>
									</div>
								</li>
								<li className="flex">
									<div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
										<div className="w-2 h-2 bg-green-400 rounded-full"></div>
									</div>
									<div className="ml-2">
										<p className="text-lg font-medium">
											Selective client model
										</p>
										<p className="text-sm text-cream-50/70">
											Personalized service and investment strategy
										</p>
									</div>
								</li>
							</ul>

							{/* Application button */}
							<div className="mt-8">
								<motion.div
									className="relative group"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									{/* Animated border */}
									<div className="absolute -inset-0.5 bg-gradient-to-r from-amber-300 to-amber-400 rounded-lg opacity-75 group-hover:opacity-100 blur-sm transition duration-1000 group-hover:duration-200"></div>

									<button
										onClick={() =>
											window.open(
												"https://2znr0q4ymmj.typeform.com/to/CA5GAbp9",
												"_blank"
											)
										}
										className="relative w-full py-4 px-8 bg-rich-blue-900 rounded-lg flex items-center justify-between"
									>
										<span className="font-bold text-lg text-cream-50">
											REQUEST INFORMATION
										</span>

										<div className="flex items-center">
											<span className="mr-2 text-sm bg-amber-300/20 px-2 py-0.5 rounded text-amber-300">
												Consultation
											</span>
											<LuChevronRight className="h-5 w-5 text-amber-300 transition-transform group-hover:translate-x-1" />
										</div>

										{/* Motion effect on hover */}
										<motion.div
											className="absolute inset-0 rounded-lg bg-gradient-to-r from-rich-blue-900/0 via-rich-blue-800/10 to-rich-blue-900/0 opacity-0 group-hover:opacity-100"
											animate={{
												x: ["-100%", "100%"],
											}}
											transition={{
												duration: 1.5,
												ease: "linear",
												repeat: Infinity,
												repeatDelay: 0.5,
											}}
										/>
									</button>
								</motion.div>
							</div>
						</motion.div>
					</div>

					{/* Testimonial - modified to be FCA compliant */}
					{/* <motion.div
            className="mt-16 mb-10 max-w-3xl mx-auto bg-rich-blue-800/30 border border-cream-50/10 rounded-lg p-6 relative"
            variants={itemVariants}
          >
            <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-6">
              <div className="w-12 h-12 rounded-full bg-rich-blue-800 border-2 border-amber-300/30 flex items-center justify-center">
                <LuUser className="h-6 w-6 text-amber-300" />
              </div>
            </div>
            <div className="pl-4">
              <p className="italic text-cream-50/80 mb-4">
                "I found the algorithmic approach at DEC refreshing after years
                with traditional advisors. Their systematic strategy provides a
                disciplined framework that helps me feel more confident about my
                investment decisions."
              </p>
              <p className="font-medium text-amber-300">
                — Michael R., Managing Director
              </p>
              <p className="text-sm text-cream-50/60">Client since 2024</p>
              <p className="text-xs text-cream-50/40 mt-2">
                Testimonials reflect individual experiences and are not
                necessarily representative of all client experiences. Results
                may vary.
              </p>
            </div>
          </motion.div> */}

					{/* Expanded Disclaimer - FCA compliant */}
					<motion.div
						className="text-center mt-16 max-w-3xl mx-auto"
						variants={itemVariants}
					>
						<div className="relative py-4 px-5 bg-rich-blue-800/30 border border-cream-50/10 rounded-lg">
							<div className="flex items-center justify-center gap-2 mb-2">
								<LuShield className="h-3 w-3 text-cream-50/80" />
								<p className="text-xs text-cream-50/80 font-medium">
									IMPORTANT INFORMATION
								</p>
							</div>
							<p className="text-xs text-cream-50/80 leading-relaxed">
								Past performance is not a reliable indicator of future results.
								The value of investments and the income from them can go down as
								well as up and investors may not get back the amount originally
								invested. Investment strategies involve risk and may not be
								suitable for all investors. DEC does not guarantee any
								particular rate of return or the success of any investment
								strategy. Financial services are offered by Delta Edge Capital
								Ltd, which may be authorized and regulated by the Financial
								Conduct Authority. Please read all offering documents carefully
								before investing.
							</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default ChooseYourPathCTA;
