import React from "react";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuHourglass } from "react-icons/lu";
import RangeInput from "./RangeInput";
import { formatCurrency } from "../../../utils/formatters";
import {
	INVESTMENT_RANGE,
	MONTHS_RANGE,
} from "../../../constants/calculatorConfig";

interface CalculatorInputsProps {
	investment: number;
	months: number;
	onInvestmentChange: (value: number) => void;
	onMonthsChange: (value: number) => void;
}

const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
	investment,
	months,
	onInvestmentChange,
	onMonthsChange,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
			className="space-y-8"
		>
			<div className="flex items-center justify-between">
				<h3 className="text-2xl font-bold bg-gradient-to-r from-rich-blue-800 to-rich-blue-600 bg-clip-text text-transparent">
					Hypothetical Potential
				</h3>
				<div className="flex items-center gap-2 text-rich-blue-600">
					<LuArrowUpRight className="h-5 w-5 animate-bounce" />
					<span className="text-sm font-medium">
						Professional Investors Only
					</span>
				</div>
			</div>

			<div className="space-y-10">
				<div className="relative">
					<div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-rich-blue-500 to-rich-blue-600 rounded-full" />
					<RangeInput
						value={investment}
						onChange={onInvestmentChange}
						min={INVESTMENT_RANGE.min}
						max={INVESTMENT_RANGE.max}
						step={INVESTMENT_RANGE.step}
						label="Strategic Capital Deployment"
						formatter={formatCurrency}
					/>
				</div>

				<div className="relative">
					<div className="absolute -left-4 top-1/2 -translate-y-1/2 flex w-1 flex-col items-center gap-2">
						<div className="w-1 h-8 bg-gradient-to-b from-rich-blue-500 to-rich-blue-600 rounded-full" />
						<LuHourglass className="h-5 w-5 text-rich-blue-500 animate-spin" />
						<div className="w-1 h-8 bg-gradient-to-b from-rich-blue-600 to-rich-blue-500 rounded-full" />
					</div>
					<RangeInput
						value={months}
						onChange={onMonthsChange}
						min={MONTHS_RANGE.min}
						max={MONTHS_RANGE.max}
						step={MONTHS_RANGE.step}
						label="Timeline"
						formatter={(value) => `${value} months`}
					/>
				</div>
			</div>

			<div className="text-sm text-rich-blue-600/80 italic border-l-2 border-rich-blue-500/20 pl-4">
				Minimum investment threshold set for optimal algorithmic performance
			</div>
		</motion.div>
	);
};

export default CalculatorInputs;
