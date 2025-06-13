import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
	LuArrowLeft, 
	LuLinkedin, 
	LuMail, 
	LuQuote,
	LuChevronDown
} from "react-icons/lu";
import TeamHero from "./TeamHero";

// Executive team member interface
interface ExecutiveMember {
	id: number;
	name: string;
	role: string;
	image: string;
	philosophy: string;
	bio: string;
	social: {
		linkedin?: string;
		email?: string;
	};
}

// Distinguished leadership team
const EXECUTIVE_TEAM: ExecutiveMember[] = [
	{
		id: 1,
		name: "Umair Tariq",
		role: "Managing Director",
		image: "/images/team/3.png",
		philosophy: "Building sustainable investment strategies through disciplined risk management and institutional excellence.",
		bio: "As Managing Director, Umair provides strategic oversight of Delta Edge Capital's institutional operations. His leadership philosophy centers on maintaining the highest standards of fiduciary responsibility while delivering consistent value to our clients. He ensures our investment approach remains grounded in quantitative rigor and regulatory excellence.",
		social: {
			linkedin: "https://www.linkedin.com/in/umair-tariq-66621726b/"
		},
	},
	{
		id: 2,
		name: "Omar Black",
		role: "Portfolio Manager",
		image: "/images/team/1.png",
		philosophy: "Systematic approaches to market inefficiencies create sustainable competitive advantages in quantitative investing.",
		bio: "Omar directs our quantitative investment strategies with a focus on systematic approaches to market analysis. His background in mechanical engineering brings mathematical precision to portfolio construction and risk management. Omar's methodology emphasizes data-driven decision making and rigorous backtesting protocols.",
		social: {
			linkedin: "https://www.linkedin.com/in/omarblack/"
		},
	},
	{
		id: 3,
		name: "Jacob Fecunda",
		role: "Chief Technology Officer",
		image: "/images/team/2.png",
		philosophy: "Technology infrastructure is the foundation upon which successful quantitative strategies are built and scaled.",
		bio: "Jacob leads our technology infrastructure with expertise in financial systems architecture and data engineering. He ensures our platforms maintain institutional-grade security, performance, and scalability. Jacob's work encompasses the development of proprietary analytics tools and regulatory technology solutions.",
		social: {
			linkedin: "https://www.linkedin.com/in/jacob-fecunda/"
		},
	},
	{
		id: 4,
		name: "Denis Kursevicius",
		role: "Chief Relationship Officer",
		image: "/images/team/4.png",
		philosophy: "Exceptional client service is built on transparency, clear communication, and unwavering commitment to fiduciary duty.",
		bio: "Denis oversees client relationships and operational excellence, ensuring our service delivery meets institutional standards. His approach emphasizes transparent communication and strategic advisory services. Denis manages client onboarding, portfolio reporting, and maintains our commitment to regulatory compliance.",
		social: {
			linkedin: "https://www.linkedin.com/in/denis-kursevicius-21aba91b7/"
		},
	},
];

// Sophisticated animation configuration
const ANIMATION_CONFIG = {
	stagger: 0.12,
	duration: 0.8,
	ease: [0.25, 0.1, 0.25, 1] as const,
	viewport: { once: true, margin: "-100px" }
};

// Executive profile component
const ExecutiveProfile: React.FC<{ member: ExecutiveMember; index: number }> = ({ member, index }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const profileRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(profileRef, ANIMATION_CONFIG.viewport);

	// Refined animation variants
	const profileVariants = {
		hidden: { 
			opacity: 0, 
			y: 40,
			scale: 0.98
		},
		visible: { 
			opacity: 1, 
			y: 0,
			scale: 1,
			transition: {
				duration: ANIMATION_CONFIG.duration,
				delay: index * ANIMATION_CONFIG.stagger,
				ease: ANIMATION_CONFIG.ease,
			}
		}
	};

	// Biography expansion variants
	const expansionVariants = {
		collapsed: { 
			height: 0,
			opacity: 0,
			transition: { duration: 0.5, ease: "easeInOut" }
		},
		expanded: { 
			height: "auto",
			opacity: 1,
			transition: { duration: 0.5, ease: "easeInOut" }
		}
	};

	return (
		<motion.article
			ref={profileRef}
			className="group relative"
			variants={profileVariants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
		>
			<div className="relative bg-gradient-to-b from-slate-50/[0.03] to-slate-50/[0.01] backdrop-blur-xl border border-slate-200/10 rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-slate-200/20">
				
				{/* Subtle luxury accent */}
				<div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
				
				<div className="relative p-6 sm:p-8 lg:p-12">
					{/* Executive header */}
					<div className="flex flex-col lg:flex-row lg:items-start lg:space-x-10 space-y-6 lg:space-y-0">
						
						{/* Professional portrait */}
						<div className="relative mx-auto lg:mx-0 flex-shrink-0">
							{member.social.linkedin ? (
								<motion.a
									href={member.social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="block relative w-32 h-32 sm:w-36 sm:h-36 lg:w-48 lg:h-48 cursor-pointer group/portrait"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									transition={{ duration: 0.3 }}
								>
									{/* Professional frame */}
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 p-1">
										<div className="w-full h-full rounded-full overflow-hidden border border-slate-700/30 group-hover/portrait:border-amber-400/40 transition-colors duration-500">
											<img
												src={member.image}
												alt={`${member.name}, ${member.role} - View LinkedIn Profile`}
												className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/portrait:scale-110"
												loading="lazy"
											/>
										</div>
									</div>
									
									{/* Enhanced accent ring for clickable state */}
									<div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-500" />
									
									{/* LinkedIn indicator on hover */}
									<div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-full opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-300">
										<LuLinkedin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-400" />
									</div>
								</motion.a>
							) : (
								<div className="relative w-32 h-32 sm:w-36 sm:h-36 lg:w-48 lg:h-48">
									{/* Professional frame */}
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 p-1">
										<div className="w-full h-full rounded-full overflow-hidden border border-slate-700/30">
											<img
												src={member.image}
												alt={`${member.name}, ${member.role}`}
												className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
												loading="lazy"
											/>
										</div>
									</div>
									
									{/* Subtle accent ring */}
									<div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								</div>
							)}
						</div>

						{/* Executive information */}
						<div className="flex-grow text-center lg:text-left">
							
							{/* Name and title */}
							<div className="mb-6">
								<motion.h3 
									className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 tracking-tight"
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: index * ANIMATION_CONFIG.stagger + 0.2 }}
								>
									{member.name}
								</motion.h3>
								
								<motion.p 
									className="text-lg sm:text-xl font-normal text-amber-400"
									initial={{ opacity: 0, y: 20 }}
									animate={isInView ? { opacity: 1, y: 0 } : {}}
									transition={{ delay: index * ANIMATION_CONFIG.stagger + 0.3 }}
								>
									{member.role}
								</motion.p>
							</div>

							{/* Investment philosophy */}
							<motion.div 
								className="mb-6 sm:mb-8"
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: index * ANIMATION_CONFIG.stagger + 0.4 }}
							>
								{/* Desktop: Side quote design */}
								<div className="hidden lg:block relative">
									<LuQuote className="absolute -top-2 -left-1 w-6 h-6 text-amber-400/30" />
									<blockquote className="text-xl text-slate-300 italic leading-relaxed pl-8">
										{member.philosophy}
									</blockquote>
								</div>
								
								{/* Mobile & Tablet: Centered quote design */}
								<div className="lg:hidden">
									<div className="relative bg-gradient-to-br from-slate-800/20 to-slate-900/20 rounded-2xl p-6 border border-slate-700/20">
										{/* Top quote mark */}
										<div className="flex justify-center mb-4">
											<div className="bg-amber-400/10 rounded-full p-3">
												<LuQuote className="w-5 h-5 text-amber-400/60" />
											</div>
										</div>
										
										{/* Centered quote text */}
										<blockquote className="text-base sm:text-lg text-slate-300 italic leading-relaxed text-center">
											{member.philosophy}
										</blockquote>
										
										{/* Bottom decorative line */}
										<div className="mt-4 flex justify-center">
											<div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Professional connections */}
							<motion.div 
								className="flex justify-center lg:justify-start space-x-3 sm:space-x-4 mb-6 sm:mb-8"
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: index * ANIMATION_CONFIG.stagger + 0.5 }}
							>
								{member.social.linkedin && (
									<motion.a
										href={member.social.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-slate-800/30 border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-700/40 transition-all duration-300"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<LuLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
									</motion.a>
								)}
								{member.social.email && (
									<motion.a
										href={`mailto:${member.social.email}`}
										className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-slate-800/30 border border-slate-700/40 text-slate-400 hover:text-white hover:bg-slate-700/40 transition-all duration-300"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<LuMail className="h-4 w-4 sm:h-5 sm:w-5" />
									</motion.a>
								)}
							</motion.div>

							{/* Expandable background */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ delay: index * ANIMATION_CONFIG.stagger + 0.6 }}
							>
								<button
									onClick={() => setIsExpanded(!isExpanded)}
									className="group/btn w-full text-left p-4 sm:p-6 rounded-xl bg-slate-800/20 border border-slate-700/30 hover:bg-slate-800/30 transition-all duration-300"
								>
									<div className="flex items-center justify-between">
										<span className="text-sm sm:text-sm font-medium text-slate-300 group-hover/btn:text-white transition-colors">
											Professional Background
										</span>
										<motion.div
											animate={{ rotate: isExpanded ? 180 : 0 }}
											transition={{ duration: 0.3 }}
										>
											<LuChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0 ml-2" />
										</motion.div>
									</div>
								</button>
								
								<motion.div
									variants={expansionVariants}
									initial="collapsed"
									animate={isExpanded ? "expanded" : "collapsed"}
									className="overflow-hidden"
								>
									<div className="p-4 sm:p-6 pt-3 sm:pt-4">
										<p className="text-sm sm:text-base text-slate-300 leading-relaxed">
											{member.bio}
										</p>
									</div>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</motion.article>
	);
};

// Main team page component
const TeamPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const containerRef = useRef<HTMLDivElement>(null);
	
	// Sophisticated parallax effects
	const { scrollY } = useScroll();
	const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "10%"]);
	const backgroundOpacity = useTransform(scrollY, [0, 400], [1, 0.9]);

	// Navigation handler
	const handleBack = () => {
		if (location.key) {
			navigate(-1);
		} else {
			navigate("/", { replace: true });
		}
	};

	// Container animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: ANIMATION_CONFIG.stagger,
				delayChildren: 0.2,
			},
		},
	};

	return (
		<div ref={containerRef} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
			
			{/* Refined background layers */}
			<div className="fixed inset-0 overflow-hidden -z-10">
				{/* Primary gradient */}
				<motion.div 
					className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
					style={{ opacity: backgroundOpacity }}
				/>
				
				{/* Subtle parallax elements */}
				<motion.div 
					className="absolute inset-0"
					style={{ y: backgroundY }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.03),transparent_60%)]" />
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.02),transparent_60%)]" />
				</motion.div>

				{/* Minimal texture */}
				<div className="absolute inset-0 opacity-[0.008]" style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
				}} />
			</div>

			{/* Refined navigation */}
			<motion.div
				className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-[100]"
				initial={{ opacity: 0, x: -20, y: 20 }}
				animate={{ opacity: 1, x: 0, y: 0 }}
				transition={{ delay: 0.6, duration: 0.4 }}
			>
				<motion.button
					onClick={handleBack}
					className="group relative inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/90 transition-all duration-300 cursor-pointer shadow-lg"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					style={{ pointerEvents: 'auto' }}
				>
					<LuArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1" />
					<span className="text-xs sm:text-sm font-medium">Back</span>
				</motion.button>
			</motion.div>

			{/* Hero section */}
			<TeamHero />

			{/* Leadership presentation */}
			<div className="relative">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
					
					{/* Section introduction */}
					<motion.header
						className="text-center mb-16 sm:mb-20 lg:mb-32"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="max-w-4xl mx-auto">
							<h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 tracking-tight">
								Leadership Philosophy
							</h2>
							<p className="text-lg sm:text-xl lg:text-2xl text-slate-400 leading-relaxed font-light px-4 sm:px-0">
								Our leadership team brings together decades of institutional finance experience, 
								united by a shared commitment to quantitative excellence and fiduciary responsibility.
							</p>
						</div>
					</motion.header>

					{/* Executive profiles */}
					<motion.section
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						className="space-y-12 sm:space-y-16 lg:space-y-20"
					>
						{EXECUTIVE_TEAM.map((member, index) => (
							<ExecutiveProfile 
								key={member.id} 
								member={member} 
								index={index} 
							/>
						))}
					</motion.section>
				</div>
			</div>
		</div>
	);
};

export default TeamPage;