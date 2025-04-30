import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import TeamHero from "./TeamHero";
import { useState } from "react";
import {
	LuLinkedin,
	LuTwitter,
	LuGithub,
	LuMail,
	LuExternalLink,
	LuChevronDown,
} from "react-icons/lu";
import omar from "../../assets/images/1.png";
import jacob from "../../assets/images/2.png";
import umair from "../../assets/images/3.png";
import denis from "../../assets/images/4.png";

const TEAM_MEMBERS = [
	{
		id: 1,
		name: "Omar Black",
		role: "CEO & Portfolio Manager",
		image: omar, // Using omar variable in actual implementation
		bio: `Omar Black leads investments at Delta Edge Capital with over six years of experience trading and developing quantitative systems. Formerly a Algo Developer at Cherokee Acquisition, his foundation in mechanical engineering has been key to crafting advanced algorithmic strategies. Omar's approach focuses on building resilient, automated investment strategies that leverage both his technical expertise and market insights for consistent performance.`,
		social: {},
	},
	{
		id: 2,
		name: "Jacob Fecunda",
		role: "Chief Technology Officer (CTO)",
		image: jacob, // Using jacob variable in actual implementation
		bio: `Jacob is a seasoned proffesional with a strong background in computer science, machine learning, and data-driven systems. He leads the development of scalable architectures and trading solutions, focusing on optimising system performance and reducing operational risk. Jacob is the architect behind efficient, automated systems that prioritise reliability and stability, driving research and development efforts to improve infrastructure and ensure seamless operations. His work integrates advanced technologies to deliver high-impact, risk-averse solutions across multiple sectors.`,
		social: {},
	},
	{
		id: 3,
		name: "Umair Tariq",
		role: "Managing Director",
		image: umair, // Using umair variable in actual implementation
		bio: `As Managing Director of Delta Edge Capital, Umair recruits and manages a performance-driven team of talent, setting clear targets and risk parameters to ensure consistent excellence. He oversees our client acquisition pipeline, working closely with our BDR team and onboards new investors to maintain high standards of trust, transparency, and compliance. His focus is on building a resilient trading operation backed by institutional-level discipline, while delivering exceptional value to our clients.`,
		social: {},
	},
	{
		id: 4,
		name: "Denis Kursevicius",
		role: "Chief Relationship Officer (CRO)",
		image: denis, // Using denis variable in actual implementation
		bio: `As Chief Relationship Officer at Delta Edge Capital, Denis spearheads our client engagement and relationship management initiatives. With extensive experience in financial services and client relations, he ensures our investors receive personalized attention and strategic guidance. Denis's expertise lies in understanding client needs, building long-term partnerships, and maintaining transparent communication channels. His focus is on delivering exceptional service while aligning client objectives with our investment strategies to drive mutual success.`,
		social: {},
	},
];

// Team filters (commented out if not needed)
const TEAM_FILTERS = [
	{ id: "all", label: "All Team" },
	{ id: "leadership", label: "Leadership" },
	{ id: "engineering", label: "Engineering" },
	{ id: "product", label: "Product" },
	{ id: "operations", label: "Operations" },
];

// Team member card component with smoother animations
const TeamMemberCard = ({ member, index }: any) => {
	const [isExpanded, setIsExpanded] = useState(true);

	// Animation variants for smooth entry
	const cardVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: any) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.15,
				duration: 0.5,
				ease: "easeOut",
			},
		}),
	};

	// Smooth animations for bio expansion
	const bioVariants = {
		closed: {
			height: 0,
			opacity: 0,
			transition: {
				duration: 0.4,
				ease: "easeInOut",
			},
		},
		open: {
			height: "auto",
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: "easeInOut",
			},
		},
	};

	// Rotate chevron when expanded
	const chevronVariants = {
		closed: { rotate: 0 },
		open: { rotate: 180 },
	};

	return (
		<motion.div
			className="relative"
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			custom={index}
		>
			<div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300">
				<div className="p-6">
					<div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
						{/* Circular Image */}
						<div className="flex-shrink-0">
							<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
								<img
									src={member.image}
									alt={member.name}
									className="w-full h-full object-cover object-center"
								/>
							</div>
						</div>

						{/* Basic Info */}
						<div className="flex-grow text-center sm:text-left">
							<h3 className="text-xl font-bold mb-1">{member.name}</h3>
							<p className="text-sm opacity-70 mb-3">{member.role}</p>

							{/* Social Media Icons - Always Visible */}
							<div className="flex justify-center sm:justify-start gap-3 mb-4">
								{member.social.linkedin && (
									<a
										href={member.social.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
										aria-label="LinkedIn Profile"
									>
										<LuLinkedin className="w-4 h-4" />
									</a>
								)}

								{member.social.twitter && (
									<a
										href={member.social.twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
										aria-label="Twitter Profile"
									>
										<LuTwitter className="w-4 h-4" />
									</a>
								)}

								{member.social.github && (
									<a
										href={member.social.github}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
										aria-label="GitHub Profile"
									>
										<LuGithub className="w-4 h-4" />
									</a>
								)}

								{member.social.email && (
									<a
										href={`mailto:${member.social.email}`}
										className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
										aria-label="Email Contact"
									>
										<LuMail className="w-4 h-4" />
									</a>
								)}
							</div>
						</div>
					</div>

					{/* Bio Section - Smoothly Expands */}
					<motion.div
						id={`bio-${member.id}`}
						className="overflow-hidden mt-4"
						variants={bioVariants}
						initial="closed"
						animate={isExpanded ? "open" : "closed"}
					>
						<div className="bg-white/5 rounded-xl p-5 border border-white/5">
							<p className="text-sm leading-relaxed">{member.bio}</p>

							{/* View Full Profile Link */}
							{/* <div className="mt-4 flex justify-end">
								<motion.a
									href={`/team/${member.id}`}
									className="inline-flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
									whileHover={{ x: 3 }}
									transition={{ duration: 0.2 }}
								>
									View Full Profile
									<LuExternalLink className="w-3.5 h-3.5" />
								</motion.a>
							</div> */}
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

const TeamPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activeFilter, setActiveFilter] = useState("all");

	const handleBack = () => {
		if (location.key) {
			navigate(-1);
		} else {
			navigate("/", { replace: true });
		}
	};

	// Animation variants for container
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Background Effects */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(252,249,240,0.15),transparent_60%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(252,249,240,0.1),transparent_60%)]" />

				{/* Subtle Floating Particles */}
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute h-1 w-1 bg-cream-50/20 rounded-full"
						animate={{
							y: [0, -15, 0],
							opacity: [0, 0.7, 0],
						}}
						transition={{
							duration: 5 + Math.random() * 5,
							repeat: Infinity,
							delay: Math.random() * 5,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
					/>
				))}
			</div>

			<div className="relative">
				{/* Back Navigation */}
				<motion.div
					className="fixed top-24 left-8 z-50"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
				>
					<button
						onClick={handleBack}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rich-blue-800/80 backdrop-blur-sm border border-cream-50/10 text-cream-50/80 hover:text-cream-50 hover:bg-rich-blue-700/80 transition-all duration-300 group"
					>
						<LuArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
						<span className="text-sm font-medium">Back</span>
					</button>
				</motion.div>

				{/* Hero Section */}
				<TeamHero />

				{/* Main Content */}
			</div>
			<div className="relative flex-grow py-20">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Team Grid */}
					<motion.div
						className="grid grid-cols-1 gap-6"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{TEAM_MEMBERS.map((member, index) => (
							<TeamMemberCard key={member.id} member={member} index={index} />
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default TeamPage;
