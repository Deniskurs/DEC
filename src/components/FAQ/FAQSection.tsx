import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import {
	LuShield,
	LuChevronDown,
	LuLock,
	LuSparkles,
	LuSearch,
	LuFilter,
	LuX,
} from "react-icons/lu";
import { useInView } from "react-intersection-observer";

const TITLE = "Everything You Need to Know";
const SUBTITLE =
	"Get comprehensive answers to common questions about our elite investment strategies and processes.";

interface FAQItem {
	question: string;
	answer: string;
	category: "investment" | "security" | "process" | "compliance" | "general";
}

const faqs: FAQItem[] = [
	{
		question: "What is the investment philosophy of Delta Edge Capital?",
		answer:
			"We focus on delivering consistent, risk-adjusted returns through innovative trading strategies that leverage AI and algorithmic models. Our philosophy centers on capital preservation, disciplined risk management, and exploitation of market inefficiencies.",
		category: "investment",
	},
	{
		question:
			"How does DEC ensure the security and confidentiality of client information?",
		answer:
			"We have robust security protocols in place, including data encryption, multi-factor authentication, and strict access controls. We comply with GDPR and other relevant data protection regulations to safeguard client information.",
		category: "security",
	},
	{
		question: "Can I customize my investment strategy with DEC?",
		answer:
			"Yes, for larger investments, we offer tailored investment strategies aligned with your specific financial goals and risk appetite. Our team works closely with you to develop and implement a personalized plan.",
		category: "process",
	},
	{
		question: "What reporting and transparency can I expect from DEC?",
		answer:
			"We provide quarterly performance reports, regular market updates, and access to your investment performance via our secure portal. Transparency is a core value, and we ensure you are kept informed about your investments.",
		category: "compliance",
	},
	{
		question: "How does DEC manage risk in its trading strategies?",
		answer:
			"We employ a rigorous risk management framework, including real-time monitoring, automated stop-loss mechanisms, and diversification across currency pairs. Our algorithms are designed to minimize drawdowns and protect capital.",
		category: "investment",
	},
	{
		question: "What are the tax implications of investing with DEC?",
		answer:
			"Tax implications vary based on your jurisdiction and individual circumstances. We recommend consulting with a tax professional. Our wealth management services can also assist in tax planning and optimization strategies.",
		category: "general",
	},
	{
		question: "How do I get started with investing in DEC's fund?",
		answer:
			"You can contact us via email, phone, or through our website to schedule an initial consultation. Our onboarding process includes completing necessary documentation, understanding your investment objectives, and setting up your account.",
		category: "process",
	},
	{
		question: "Does DEC offer educational resources for investors?",
		answer:
			"Yes, we provide educational materials, including webinars, articles, and one-on-one sessions to help you understand our strategies and general market trends.",
		category: "general",
	},
	{
		question: "What happens if I need to withdraw my investment early?",
		answer:
			"While we prefer a month's notice, we understand circumstances may require prompt action. Please contact your relationship manager to discuss your situation, and we will work to accommodate your needs while considering market conditions.",
		category: "process",
	},
	{
		question: "Is there a lock-in period for the investments?",
		answer:
			"Typically, there is no strict lock-in period; however, early withdrawals may affect your performance fee tier and could be subject to certain conditions as outlined in your investment agreement.",
		category: "process",
	},
	{
		question: "How do market conditions affect DEC's strategies?",
		answer:
			"Our strategies are designed to perform in various market conditions. We utilize advanced risk management and diversification to mitigate adverse effects during volatile or downturn periods, aiming for stable returns regardless of market cycles.",
		category: "investment",
	},
	{
		question: "Can non-UK residents invest with DEC?",
		answer:
			"Yes, we accept international investors, subject to compliance with UK regulations and the legal requirements of your home country. Please contact us to discuss the specifics.",
		category: "compliance",
	},
	{
		question: "What are the regulatory compliances that DEC adheres to?",
		answer:
			"DEC complies with all applicable UK financial regulations and is progressing towards additional regulatory approvals. We adhere to AML (Anti-Money Laundering) policies and GDPR for data protection.",
		category: "compliance",
	},
	{
		question: "How does DEC's AI technology enhance trading performance?",
		answer:
			"Our AI algorithms analyze vast amounts of market data in real-time, identifying patterns and opportunities that may not be apparent through traditional analysis. This allows for more precise and timely trading decisions, improving overall performance.",
		category: "investment",
	},
	{
		question: "Are there any hidden charges or fees?",
		answer:
			"No, all fees, including management and performance fees, are transparently outlined in your investment agreement. We believe in full disclosure and have no hidden charges.",
		category: "general",
	},
];

const categories = {
	all: "All Questions",
	investment: "Investment Strategy",
	security: "Security",
	process: "Process",
	compliance: "Compliance",
	general: "General",
};

const FAQSection: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] =
		useState<keyof typeof categories>("all");
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});

	const fuse = useMemo(
		() =>
			new Fuse(faqs, {
				keys: ["question", "answer"],
				threshold: 0.4,
				shouldSort: true,
				includeScore: true,
			}),
		[]
	);

	const filteredFAQs = useMemo(() => {
		const results = searchQuery
			? fuse.search(searchQuery).map((result) => result.item)
			: faqs;

		return results.filter(
			(faq) => selectedCategory === "all" || faq.category === selectedCategory
		);
	}, [searchQuery, selectedCategory, fuse]);

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case "investment":
				return <LuSparkles className="h-5 w-5" />;
			case "security":
				return <LuLock className="h-5 w-5" />;
			case "process":
				return <LuShield className="h-5 w-5" />;
			case "compliance":
				return <LuLock className="h-5 w-5" />;
			default:
				return <LuShield className="h-5 w-5" />;
		}
	};

	return (
		<section className="relative py-16 lg:py-24 bg-cream-50">
			{/* <div className="absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.03),transparent_70%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,255,0.03),transparent_70%)]" />
			</div> */}

			<div className="relative max-w-4xl mx-auto px-4">
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: 20 }}
					animate={inView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<div className="section-title" data-text="FAQ">
						<div className="flex items-center justify-center gap-2 mb-4">
							<LuShield className="h-5 w-5 text-rich-blue-600" />
							<span className="text-sm font-semibold tracking-wider text-rich-blue-600 uppercase">
								FREQUENTLY ASKED QUESTIONS
							</span>
						</div>
					</div>

					<h2 className="text-4xl font-bold text-rich-blue-900 mb-4">
						{TITLE}
					</h2>

					<p className="text-lg text-rich-blue-600/90 max-w-2xl mx-auto">
						{SUBTITLE}
					</p>
				</motion.div>

				<div className="mb-8 flex flex-col sm:flex-row gap-4">
					<div className="relative flex-1">
						<LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rich-blue-400" />
						<input
							type="text"
							placeholder="Search questions..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow focus:ring-2 focus:ring-rich-blue-400 focus:outline-none"
						/>
						{searchQuery && (
							<button
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-1/2 -translate-y-1/2"
							>
								<LuX className="h-4 w-4 text-rich-blue-400 hover:text-rich-blue-600" />
							</button>
						)}
					</div>
					<div className="relative">
						<LuFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rich-blue-400" />
						<select
							value={selectedCategory}
							onChange={(e) =>
								setSelectedCategory(e.target.value as keyof typeof categories)
							}
							className="pl-10 pr-8 py-2 rounded-lg bg-white shadow focus:ring-2 focus:ring-rich-blue-400 focus:outline-none appearance-none"
						>
							{Object.entries(categories).map(([key, value]) => (
								<option key={key} value={key}>
									{value}
								</option>
							))}
						</select>
						<LuChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-rich-blue-400 pointer-events-none" />
					</div>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={selectedCategory + searchQuery}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{filteredFAQs.length === 0 ? (
							<div className="text-center py-8">
								<p className="text-lg text-rich-blue-600">
									No questions found matching your criteria.
								</p>
							</div>
						) : (
							<div className="space-y-2">
								{filteredFAQs.map((faq, index) => (
									<motion.div
										key={index}
										className="bg-white rounded-lg shadow"
									>
										<button
											onClick={() =>
												setActiveIndex(activeIndex === index ? null : index)
											}
											className="w-full text-left px-4 py-3 flex items-center justify-between gap-4"
										>
											<div className="flex items-center gap-3">
												<div className="text-rich-blue-600 flex-shrink-0">
													{getCategoryIcon(faq.category)}
												</div>
												<span className="font-medium text-gray-900">
													{faq.question}
												</span>
											</div>
											<motion.div
												animate={{ rotate: activeIndex === index ? 180 : 0 }}
												transition={{ duration: 0.2 }}
												className="flex-shrink-0"
											>
												<LuChevronDown className="h-5 w-5 text-rich-blue-400" />
											</motion.div>
										</button>

										<AnimatePresence initial={false}>
											{activeIndex === index && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{
														height: "auto",
														opacity: 1,
														transition: {
															height: { duration: 0.2 },
															opacity: { duration: 0.1, delay: 0.1 },
														},
													}}
													exit={{
														height: 0,
														opacity: 0,
														transition: {
															height: { duration: 0.2 },
															opacity: { duration: 0.1 },
														},
													}}
													className="overflow-hidden will-change-transform"
												>
													<div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
														<p className="text-gray-600 text-sm">
															{faq.answer}
														</p>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								))}
							</div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default FAQSection;
