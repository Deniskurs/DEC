import { motion } from "framer-motion";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { topRowLogos, bottomRowLogos } from "./liquidityPProviders";

const LiquidityProviders = () => {
	const createLogoItems = (providers: { imageUrl: string; name: string }[]) =>
		providers.map((provider) => ({
			logo: (
				<div className="flex items-center justify-center w-full h-full">
					<img
						src={provider.imageUrl}
						alt={provider.name}
						className="w-full h-6 sm:h-8 object-contain object-center mix-blend-multiply opacity-90"
						loading="lazy"
					/>
				</div>
			),
			name: provider.name,
		}));

	const topLogos = createLogoItems(topRowLogos);
	const bottomLogos = createLogoItems(bottomRowLogos);

	return (
		<div className="relative w-full h-full bg-cream-50 ">
			<div className="py-8 sm:pt-32 sm:py-12">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8 sm:mb-12">
						<div className="section-title" data-text="PARTNERS">
							<h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-8">
								<span className="bg-gradient-to-r from-rich-blue-800 to-rich-blue-600 bg-clip-text text-transparent">
									Liquidity Providers
								</span>
							</h2>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 }}
								className="text-base sm:text-lg text-rich-blue-600/90 max-w-3xl mx-auto leading-relaxed px-4"
							>
								Powered by Tier-1 banks and prime brokers, ensuring deep
								liquidity and institutional-grade execution
							</motion.p>
						</div>
					</div>

					<div className="relative">
						{/* <div className="absolute -inset-4 bg-gradient-to-r from-rich-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-3xl blur-2xl" /> */}

						<div className="relative overflow-hidden">
							{/* Scrolling content */}
							<div className="relative">
								<InfiniteMovingCards
									items={topLogos}
									direction="right"
									speed="slow"
									className="pb-1"
								/>
								<InfiniteMovingCards
									items={bottomLogos}
									direction="left"
									speed="slow"
									className="pb-1"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LiquidityProviders;
