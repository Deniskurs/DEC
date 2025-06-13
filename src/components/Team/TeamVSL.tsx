import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { LuPlay, LuX, LuMaximize2, LuMinimize2 } from "react-icons/lu";

// VSL Component with institutional design
const TeamVSL: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const vslRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(vslRef, { once: true, margin: "-100px" });
	
	// Sophisticated parallax effects
	const { scrollY } = useScroll();
	const backgroundY = useTransform(scrollY, [0, 800], ["0%", "20%"]);
	const backgroundOpacity = useTransform(scrollY, [0, 400], [1, 0.9]);

	// Animation variants
	const containerVariants = {
		hidden: { 
			opacity: 0, 
			y: 40,
			scale: 0.95 
		},
		visible: { 
			opacity: 1, 
			y: 0,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: [0.25, 0.1, 0.25, 1],
			}
		}
	};

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { 
			opacity: 1,
			transition: { duration: 0.4 }
		},
		exit: { 
			opacity: 0,
			transition: { duration: 0.3 }
		}
	};

	const handlePlayClick = () => {
		setIsPlaying(true);
	};

	const handleCloseVideo = () => {
		setIsPlaying(false);
		setIsFullscreen(false);
	};

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<section className="relative min-h-[60vh] lg:min-h-[70vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
			{/* Sophisticated background layers */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Primary gradient with parallax */}
				<motion.div 
					className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
					style={{ opacity: backgroundOpacity }}
				/>
				
				{/* Subtle parallax elements */}
				<motion.div 
					className="absolute inset-0"
					style={{ y: backgroundY }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(251,191,36,0.04),transparent_60%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_center,rgba(59,130,246,0.03),transparent_60%)]" />
				</motion.div>

				{/* Minimal texture overlay */}
				<div className="absolute inset-0 opacity-[0.01]" style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
				}} />

				{/* Institutional accent lines */}
				<motion.div 
					className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
					style={{ y: backgroundY }}
				/>
				<motion.div 
					className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent"
					style={{ y: backgroundY }}
				/>
			</div>

			{/* Main VSL Content */}
			<div className="relative h-full flex items-center">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
					<motion.div
						ref={vslRef}
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
						className="text-center mb-12"
					>
						{/* Section introduction */}
						<div className="mb-8 lg:mb-12">
							<motion.div 
								className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 text-sm font-semibold tracking-wider uppercase mb-6"
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.2 }}
							>
								<LuPlay className="h-4 w-4" />
								<span>Leadership Insights</span>
							</motion.div>
							
							<motion.h2 
								className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 tracking-tight"
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.3 }}
							>
								Meet Our Executive Team
							</motion.h2>
							
							<motion.p 
								className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.4 }}
							>
								Discover the vision and expertise driving Delta Edge Capital's institutional investment approach.
							</motion.p>
						</div>

						{/* Video Container */}
						<motion.div
							className="relative max-w-5xl mx-auto"
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ delay: 0.5 }}
						>
							{!isPlaying ? (
								/* Video Thumbnail/Preview */
								<div className="relative group cursor-pointer" onClick={handlePlayClick}>
									<div className="relative aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/10 group-hover:border-amber-400/30 transition-all duration-500">
										{/* Thumbnail background */}
										<div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5" />
										
										{/* Play button overlay */}
										<div className="absolute inset-0 flex items-center justify-center">
											<motion.div
												className="relative"
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
											>
												{/* Play button background */}
												<div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
												
												{/* Play button */}
												<div className="relative bg-slate-900/90 backdrop-blur-sm border-2 border-amber-400/40 rounded-full p-6 lg:p-8 group-hover:border-amber-400/60 transition-all duration-300">
													<LuPlay className="w-8 h-8 lg:w-12 lg:h-12 text-amber-400 ml-1" />
												</div>
											</motion.div>
										</div>

										{/* Corner indicators */}
										<div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700/50">
											<span className="text-xs font-medium text-slate-300">Executive Overview</span>
										</div>
										
										<div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700/50">
											<span className="text-xs font-medium text-amber-400">Click to Play</span>
										</div>
									</div>
								</div>
							) : (
								/* Active Video Player */
								<div className={`relative ${isFullscreen ? 'fixed inset-0 z-[200] bg-black' : 'aspect-video'}`}>
									<div className={`${isFullscreen ? 'w-full h-full' : 'w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden border border-slate-200/10'}`}>
										<iframe 
											title="Team Leadership Overview"
											marginHeight={0}
											marginWidth={0}
											src="https://embedstreams.top/embed/alpha/uae-warriors-60/1"
											scrolling="no"
											allowFullScreen={true}
											allow="encrypted-media; picture-in-picture;"
											width="100%"
											height="100%"
											frameBorder="0"
											className="w-full h-full"
										/>
									</div>

									{/* Video Controls */}
									<div className="absolute top-4 right-4 flex space-x-2">
										<motion.button
											onClick={toggleFullscreen}
											className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-300"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											{isFullscreen ? (
												<LuMinimize2 className="w-4 h-4" />
											) : (
												<LuMaximize2 className="w-4 h-4" />
											)}
										</motion.button>
										
										<motion.button
											onClick={handleCloseVideo}
											className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-300"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<LuX className="w-4 h-4" />
										</motion.button>
									</div>
								</div>
							)}
						</motion.div>

						{/* Additional context */}
						{!isPlaying && (
							<motion.div
								className="mt-8 lg:mt-12"
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: 0.6 }}
							>
								<p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
									Get an exclusive look at the leadership philosophy and strategic vision 
									that guides our institutional investment approach.
								</p>
							</motion.div>
						)}
					</motion.div>
				</div>
			</div>

			{/* Bottom fade for smooth transition to hero */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent" />
		</section>
	);
};

export default TeamVSL;