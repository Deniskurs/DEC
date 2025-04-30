// src/components/Enquiry/components/EnquiryHero.tsx
import { motion } from "framer-motion";
import { LuShield, LuChartNoAxesCombined, LuBriefcase } from "react-icons/lu";

const TeamHero = () => {
	return (
		<section className="relative min-h-[20dvh] pt-20 flex items-center bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-700 overflow-hidden">
			{/* Luxury Background Effects */}
			<div className="absolute inset-0">
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
			</div>

			{/* Main Content */}
			<div className="relative w-full max-w-7xl mx-auto px-8 lg:px-12 py-24">
				<div className="max-w-3xl mx-auto text-center">
					{/* Ultra-Premium Title Animation */}

					<motion.h1
						className="text-4xl sm:text-5xl  lg:text-6xl font-bold mb-8 text-white leading-[1.2]"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						Meet The Team
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-white"
					>
						Meet the talented individuals who drive our vision forward with
						expertise and innovation
					</motion.p>
				</div>
			</div>

			{/* Bottom Fade */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-blue-900 to-transparent" />
		</section>
	);
};

export default TeamHero;
