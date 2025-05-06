import React, { useState, useEffect, useCallback } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { calculateMetrics } from "../../utils/calculatorUtils";
import {
	DEFAULT_INVESTMENT,
	DEFAULT_MONTHS,
	getChartData,
} from "../../constants/calculatorConfig";
import CalculatorHeader from "./components/CalculatorHeader";
import CalculatorInputs from "./components/CalculatorInputs";
import PerformanceMetrics from "./components/PerformanceMetrics";
import PerformanceChart from "./components/PerformanceChart";
import OpportunityCostCard from "./components/OpportunityCostCard";
import { TooltipProvider } from "../ui/tooltip";
import { useAccountData } from "../../hooks/useAccountData";
import { CalculatorMetrics } from "../../types/calculator";
import { useDeadStrats } from "../../hooks/useDeadStrats";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const InvestmentCalculator: React.FC = () => {
	const [investment, setInvestment] = useState(DEFAULT_INVESTMENT);
	const [months, setMonths] = useState(DEFAULT_MONTHS);
	const [metrics, setMetrics] = useState<CalculatorMetrics | null>(null);

	//  interface CalculatorMetrics {
	//   monthlyReturn: number;
	//   yearlyReturn: number;
	//   totalReturn: number;
	//   opportunityCost: number;
	// }

	const { accountQuery } = useAccountData();
	const {
		data: accountData,
		isLoading: accountDataLoading,
		isError: isErrorProcessing,
	} = accountQuery;
	const { useMonthlyGainQuery } = useDeadStrats();
	const {
		data: monthlyGainData,
		isLoading: monthlyGainDataLoading,
		isError: monthlyGainDataError,
	} = useMonthlyGainQuery("URTH");

	useEffect(() => {
		if (accountData && monthlyGainData) {
			setMetrics(
				calculateMetrics(
					accountData.monthly,
					monthlyGainData.averageMonthlyGain,
					investment,
					months
				)
			);
		}
	}, [
		accountData,
		investment,
		months,
		accountDataLoading,
		monthlyGainData,
		isErrorProcessing,
	]);

	// Handle window resize for mobile optimization
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const updateMetrics = useCallback(() => {
		if (accountData && monthlyGainData) {
			setMetrics(
				calculateMetrics(
					accountData.monthly,
					monthlyGainData.averageMonthlyGain,
					investment,
					months
				)
			);
		}
	}, [accountData, investment, months, monthlyGainData]);

	useEffect(() => {
		updateMetrics();
	}, [updateMetrics]);

	const dailyOpportunityCost = metrics
		? metrics.opportunityCost / (months * 30)
		: 0;

	return (
		<TooltipProvider>
			<div className="min-h-screen bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50 pb-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Mobile-optimized padding */}
					<div className="py-8 sm:py-12 lg:py-16">
						<CalculatorHeader />

						<div className="max-w-6xl mx-auto">
							{/* Main Calculator Section */}
							<div className="relative bg-gradient-to-br from-cream-50/95 to-white/95 rounded-2xl shadow-xl backdrop-blur-xl p-4 sm:p-6 lg:p-8">
								{/* Mobile-optimized layout */}
								<div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
									<div className="w-full lg:w-1/2">
										<CalculatorInputs
											investment={investment}
											months={months}
											onInvestmentChange={setInvestment}
											onMonthsChange={setMonths}
										/>
									</div>

									<div className="w-full lg:w-1/2">
										{metrics ? (
											<PerformanceMetrics metrics={metrics} />
										) : (
											<div className="flex justify-center items-center h-full">
												<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
											</div>
										)}
									</div>
								</div>

								{/* Chart section with mobile responsiveness */}
								{/* <div className="mt-8 sm:mt-12">
                  {accountData && monthlyGainData ? (
                    <PerformanceChart
                      chartData={getChartData(
                        accountData.monthly,
                        monthlyGainData.averageMonthlyGain,
                        investment,
                        months
                      )}
                      isMobile={isMobile}
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                </div> */}
							</div>

							{/* Opportunity Cost Card with mobile spacing */}
							{/* <div className="mt-6 sm:mt-8 lg:mt-12">
								{metrics ? (
									<OpportunityCostCard
										dailyOpportunityCost={dailyOpportunityCost}
										totalOpportunityCost={metrics.opportunityCost}
										months={months}
										typeformUrl="https://2znr0q4ymmj.typeform.com/to/CA5GAbp9"
									/>
								) : (
									<div className="flex justify-center items-center h-full">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
									</div>
								)}
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default InvestmentCalculator;
