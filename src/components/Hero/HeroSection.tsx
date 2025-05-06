import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LuChevronRight } from "react-icons/lu";
import SectionCTA from "../CTA/SectionCTA";
import {
	titleVariants,
	subtitleVariants,
	buttonContainerVariants,
	buttonVariants,
} from "../../constants/heroVariants";

const HeroSection = React.forwardRef<HTMLDivElement>((_, ref) => {
	const { scrollY } = useScroll();
	const backgroundY = useTransform(scrollY, [0, 500], ["0%", "50%"]);
	const opacity = useTransform(scrollY, [0, 300], [1, 0]);
	const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

	return (
		<>
			<div
				ref={ref}
				className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-700 overflow-hidden"
			>
				{/* Luxury Particle Effect Background */}
				<motion.div
					className="absolute inset-0 w-full h-full"
					style={{ y: backgroundY }}
				>
					<motion.div
						className="absolute inset-0"
						animate={{
							background: [
								"radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
								"radial-gradient(circle at 80% 80%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
								"radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
							],
						}}
						transition={{
							duration: 8,
							ease: "linear",
							repeat: Infinity,
						}}
					/>

					{/* Dynamic Light Trails */}
					<motion.div
						className="absolute inset-0"
						animate={{
							background: [
								"linear-gradient(45deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
								"linear-gradient(180deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
								"linear-gradient(45deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
							],
						}}
						transition={{
							duration: 5,
							ease: "easeInOut",
							repeat: Infinity,
						}}
					/>

					{/* Premium Background Image with Parallax */}
					<motion.div className="absolute inset-0" style={{ scale, opacity }}>
						<motion.img
							src="/images/heroright.png"
							alt=""
							className="absolute top-0 right-0 w-full h-full object-cover opacity-20"
							initial={{ scale: 1.2 }}
							animate={{ scale: 1 }}
							transition={{
								duration: 1.5,
								ease: [0.6, 0.01, -0.05, 0.95],
							}}
						/>
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-rich-blue-900/95 via-rich-blue-800/90 to-transparent"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 2 }}
						/>
					</motion.div>
				</motion.div>

				{/* Luxury Ambient Effects */}
				<div className="absolute inset-0 overflow-hidden">
					<motion.div
						className="absolute inset-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: [0.4, 0.6, 0.4] }}
						transition={{
							duration: 4,
							ease: "easeInOut",
							repeat: Infinity,
						}}
					>
						<div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cream-50/10 to-transparent opacity-40" />
						<div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-rich-blue-500/10 to-transparent opacity-30" />
					</motion.div>
				</div>

				{/* Main Content */}
				<div className="relative w-full max-w-7xl mx-auto px-8 lg:px-12 py-24">
					<motion.div
						className="max-w-2xl"
						initial="hidden"
						animate="visible"
						variants={{
							visible: {
								transition: {
									staggerChildren: 0.2,
								},
							},
						}}
					>
						{/* Ultra-Premium Title Animation */}
						<motion.h2
							className="text-lg font-semibold text-center md:text-left text-cream-50/90 mb-8 tracking-[0.2em] uppercase"
							variants={subtitleVariants}
						>
							<span className="relative">
								<span className="relative z-10">
									Precision. Performance. Transparency
								</span>
								<motion.span
									className="absolute bottom-0 left-0 w-full h-[1px] bg-cream-50/30"
									initial={{ scaleX: 0 }}
									animate={{ scaleX: 1 }}
									transition={{ duration: 1.5, delay: 1.2 }}
								/>
							</span>
						</motion.h2>

						<motion.h1
							className="text-4xl sm:text-5xl text-center md:text-left lg:text-6xl font-bold mb-12 text-white leading-[1.2]"
							variants={titleVariants}
						>
							<span className="block overflow-hidden">
								<motion.span
									className="block"
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
								>
									Precision Trading
								</motion.span>
							</span>
							<span className="block overflow-hidden mt-2">
								<motion.span
									className="block bg-gradient-to-r h-[130px]  from-cream-50 via-cream-50/90 to-cream-50 bg-clip-text text-transparent"
									initial={{ y: "100%" }}
									animate={{ y: 0 }}
									transition={{
										duration: 1.2,
										delay: 0.2,
										ease: [0.25, 0.1, 0, 1],
									}}
								>
									Through Advanced Algorithms
								</motion.span>
							</span>
						</motion.h1>

						{/* Elite Call-to-Action Buttons */}
						<motion.div
							className="flex flex-col sm:justify-center md:justify-start sm:flex-row gap-4 sm:gap-6"
							variants={buttonContainerVariants}
						>
							<motion.button
								className="group relative overflow-hidden soft-ui-card bg-cream-50/90 text-rich-blue-800 px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-cream-100 transition-all duration-500"
								variants={buttonVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								onClick={() =>
									window.open(
										"https://2znr0q4ymmj.typeform.com/to/CA5GAbp9",
										"_blank"
									)
								}
							>
								<motion.span
									className="absolute inset-0 bg-gradient-to-r from-cream-50/0 via-cream-50/50 to-cream-50/0"
									animate={{
										x: ["0%", "200%"],
									}}
									transition={{
										duration: 1.5,
										ease: "linear",
										repeat: Infinity,
										repeatDelay: 1,
									}}
								/>
								<span className="relative z-10 flex items-center">
									CLAIM YOUR EDGE
									<LuChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</span>
							</motion.button>

							<motion.button
								className="relative overflow-hidden soft-ui-button text-cream-50 px-8 py-4 rounded-xl font-semibold hover:bg-rich-blue-700/30 transition-all duration-500 border border-cream-50/20"
								variants={buttonVariants}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.98 }}
								onClick={() =>
									window.open(
										"https://calendly.com/deltaedgecapital/30min",
										"_blank"
									)
								}
							>
								<motion.span
									className="absolute inset-0 bg-gradient-to-r from-cream-50/0 via-cream-50/10 to-cream-50/0"
									animate={{
										x: ["0%", "200%"],
									}}
									transition={{
										duration: 2,
										ease: "linear",
										repeat: Infinity,
										repeatDelay: 1,
									}}
								/>
								<span className="relative z-10">TALK TO AN EXPERT</span>
							</motion.button>
						</motion.div>
					</motion.div>
				</div>

				{/* Premium Bottom Fade */}
				<motion.div
					className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-blue-900 to-transparent"
					style={{ opacity }}
				/>
			</div>

			<div className="bg-gradient-to-b from-cream-50/50 to-white">
				<SectionCTA
					title="Algorithmic Precision for Superior Returns"
					description="Our quantitative approach identifies inefficiencies that conventional analysis misses."
					buttonText="LEARN MORE"
					variant="premium"
					urgencyType="exclusive-access"
					useLiveData={true}
				/>
			</div>
		</>
	);
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
