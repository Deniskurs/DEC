import React from "react";
import { motion } from "framer-motion";
import { LuBuilding2, LuCode, LuTrendingUp } from "react-icons/lu";
import SEO from "../SEO/SEO";

const HoldingsSection: React.FC = () => {
	return (
		<>
			<SEO 
				title="Delta Edge Capital | SaaS Holdings Company - Building Digital Futures"
				description="Delta Edge Capital acquires, develops, and scales innovative SaaS companies driving digital transformation. Strategic acquisitions, product development, and sustainable growth focus."
				keywords="SaaS holdings, software acquisition, digital transformation, SaaS portfolio, tech investments, software development, business growth, delta edge capital"
			/>
			<div className="relative min-h-screen flex items-center bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-700 overflow-hidden">
			{/* Enhanced Background Effects */}
			<motion.div className="absolute inset-0 w-full h-full">
				{/* Animated radial gradients */}
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
				
				{/* Additional depth layers */}
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rich-blue-500/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream-50/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				
				{/* Geometric patterns */}
				<div className="absolute inset-0 opacity-5">
					<div className="absolute top-20 left-20 w-2 h-2 bg-cream-50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
					<div className="absolute top-40 right-32 w-1 h-1 bg-cream-50 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
					<div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cream-50 rounded-full animate-ping" style={{ animationDelay: '5s' }} />
				</div>
			</motion.div>

			{/* Main Content */}
			<div className="relative w-full max-w-7xl mx-auto px-8 lg:px-12 py-32 pt-40">
				<motion.div
					className="max-w-4xl mx-auto text-center"
					initial="hidden"
					animate="visible"
					variants={{
						visible: {
							transition: {
								staggerChildren: 0.3,
							},
						},
					}}
				>
					{/* Main Title */}
					<motion.div
						className="mb-8"
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
						}}
					>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
							<span className="bg-gradient-to-r from-cream-50 via-cream-50/90 to-cream-50 bg-clip-text text-transparent">
								Building Digital Futures
							</span>
						</h1>
						<div className="w-32 h-1 bg-gradient-to-r from-cream-50 to-cream-100 mx-auto rounded-full" />
					</motion.div>

					{/* Company Identity & Description */}
					<motion.div
						className="mb-16"
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
						}}
					>
						<div className="mb-6">
							<span className="text-cream-100/60 text-lg font-medium tracking-wider uppercase">Delta Edge Capital</span>
						</div>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cream-50 mb-8 leading-relaxed">
							Holdings Company for Digital SaaS Products
						</h2>
						<p className="text-lg sm:text-xl text-cream-100/80 max-w-3xl mx-auto leading-relaxed">
							We acquire, develop, and scale innovative software-as-a-service companies that drive digital transformation across industries.
						</p>
					</motion.div>

					{/* Key Points */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
						}}
					>
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-cream-50/10 rounded-2xl flex items-center justify-center">
								<LuBuilding2 className="w-8 h-8 text-cream-50" />
							</div>
							<h3 className="text-xl font-semibold text-cream-50 mb-2">Strategic Acquisitions</h3>
							<p className="text-cream-100/70">Identifying and acquiring high-potential SaaS businesses</p>
						</div>
						
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-cream-50/10 rounded-2xl flex items-center justify-center">
								<LuCode className="w-8 h-8 text-cream-50" />
							</div>
							<h3 className="text-xl font-semibold text-cream-50 mb-2">Product Development</h3>
							<p className="text-cream-100/70">Enhancing and scaling digital solutions for maximum impact</p>
						</div>
						
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-cream-50/10 rounded-2xl flex items-center justify-center">
								<LuTrendingUp className="w-8 h-8 text-cream-50" />
							</div>
							<h3 className="text-xl font-semibold text-cream-50 mb-2">Growth Focus</h3>
							<p className="text-cream-100/70">Driving sustainable growth and market expansion</p>
						</div>
					</motion.div>

					{/* Contact Button */}
					<motion.div
						variants={{
							hidden: { opacity: 0, y: 30 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
						}}
					>
						<motion.a
							href="mailto:info@deltaedgecapital.co.uk"
							className="relative inline-flex items-center px-10 py-5 bg-cream-50 text-rich-blue-900 font-bold text-lg rounded-2xl hover:bg-cream-100 transition-all duration-300 shadow-xl hover:shadow-2xl group overflow-hidden"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.98 }}
						>
							<span className="relative z-10">Get in Touch</span>
							<motion.div
								className="absolute inset-0 bg-gradient-to-r from-cream-100/50 to-cream-50/50"
								initial={{ x: "-100%" }}
								whileHover={{ x: "100%" }}
								transition={{ duration: 0.6, ease: "easeInOut" }}
							/>
						</motion.a>
					</motion.div>
				</motion.div>
			</div>

			{/* Bottom Gradient */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-blue-900 to-transparent" />
		</div>
		</>
	);
};

export default HoldingsSection;