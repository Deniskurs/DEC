import { motion } from "framer-motion";
import { LuArrowDown } from "react-icons/lu";

const CalculatorHeader = () => {
	return (
		<div className="section-title relative" data-text="CALCULATOR">
			{/* Critical: Section title restored */}
			<motion.div
				className="relative text-center mb-20 px-4"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
			>
				{/* Abstract Background Elements */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-0 left-1/4 w-64 h-64 bg-rich-blue-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
				</div>

				{/* Main Title with Enhanced Animation */}
				<motion.h2
					className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8 tracking-tight"
					variants={{
						hidden: { opacity: 0, y: 20 },
						visible: { opacity: 1, y: 0 },
					}}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.8, delay: 0.3 }}
				>
					<span className="inline-block bg-gradient-to-r from-rich-blue-800 via-rich-blue-600 to-rich-blue-800 bg-clip-text text-transparent pb-2">
						Return
					</span>
					<motion.span
						className="block mt-2 text-green-500"
						variants={{
							hidden: { opacity: 0, x: -20 },
							visible: { opacity: 1, x: 0 },
						}}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						Illustration Tool
					</motion.span>
				</motion.h2>

				{/* Enhanced Description Section */}
				<motion.div
					className="max-w-3xl mx-auto space-y-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1 }}
				>
					<p className="text-xl sm:text-2xl text-rich-blue-600/90 leading-relaxed font-light">
						This tool provides a hypothetical example of how returns might
						evolve based on consistent input assumptions. It is for illustrative
						purposes only and does not represent actual or projected fund
						performance. Past performance is not a reliable indicator of future
						results. Assumptions may not reflect actual conditions. This content
						is intended only for professional investors
					</p>

					{/* Scroll Indicator */}
					<motion.div
						className="pt-8 opacity-60"
						animate={{
							y: [0, 10, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<LuArrowDown className="mx-auto h-6 w-6 text-rich-blue-500" />
					</motion.div>
				</motion.div>

				{/* Background Grid Effect */}
				<div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(0,82,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,82,204,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
			</motion.div>
		</div>
	);
};

export default CalculatorHeader;
