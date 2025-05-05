import React from "react";
import { motion } from "framer-motion";
import { LuCheck, LuTrendingUp, LuArrowUpRight, LuZap } from "react-icons/lu";
import MetricCard from "./MetricCard";
import { formatCurrency } from "../../../utils/formatters";
import { CalculatorMetrics } from "../../../types/calculator";

interface PerformanceMetricsProps {
	metrics: CalculatorMetrics;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ metrics }) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
			className="flex flex-col"
		>
			<div className="flex items-center justify-between mb-8">
				<h3 className="text-2xl font-bold bg-gradient-to-r from-rich-blue-800 to-rich-blue-600 bg-clip-text text-transparent">
					Elite Performance Matrix
				</h3>
				<div className="flex items-center gap-2">
					<LuZap className="h-5 w-5 text-rich-blue-500 animate-pulse" />
					<span className="text-sm font-medium text-rich-blue-600">
						Live Metrics
					</span>
				</div>
			</div>

			<div className="grid gap-4 flex-grow">
				<MetricCard
					icon={LuCheck}
					label="Monthly Average Gain"
					value={`+${metrics.monthlyReturn.toFixed(2)}%`}
					description="Algorithmic Precision Trading"
					tooltip="Our proprietary algorithms deliver steady monthly returns through advanced quantitative strategies."
				/>
				<MetricCard
					icon={LuTrendingUp}
					label="Annualised Projected Growth"
					value={`+${metrics.yearlyReturn.toFixed(2)}%`}
					description="Compound Acceleration Protocol"
					tooltip="Experience exponential wealth growth through our compound acceleration protocol, maximizing your returns year over year."
				/>
				<MetricCard
					icon={LuArrowUpRight}
					label="Total Wealth Amplification"
					value={formatCurrency(metrics.totalReturn)}
					description="Your Market Profit Advantage"
					tooltip="This represents your total wealth creation potential - the additional capital you'll generate above traditional investment methods."
					highlight
				/>
			</div>

			<div className="mt-6 p-4 bg-gradient-to-r from-rich-blue-50 to-transparent border-l-4 border-rich-blue-500 rounded-r-lg">
				<p className="text-sm text-rich-blue-600/90 font-medium">
					These projections are purely hypothetical and assume consistent
					performance. Past performance is not indicative of future results. All
					investments carry risk, including the potential loss of capital.
				</p>
			</div>
		</motion.div>
	);
};

export default PerformanceMetrics;
