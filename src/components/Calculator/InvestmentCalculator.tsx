import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { calculateMetrics } from '../../utils/calculatorUtils';
import {
  DEFAULT_INVESTMENT,
  DEFAULT_MONTHS,
  getChartData,
} from '../../constants/calculatorConfig';
import CalculatorHeader from './components/CalculatorHeader';
import CalculatorInputs from './components/CalculatorInputs';
import PerformanceMetrics from './components/PerformanceMetrics';
import PerformanceChart from './components/PerformanceChart';
import OpportunityCostCard from './components/OpportunityCostCard';
import { TooltipProvider } from '../ui/tooltip';

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
  const [metrics, setMetrics] = useState(calculateMetrics(DEFAULT_INVESTMENT, DEFAULT_MONTHS));
  
  // Handle window resize for mobile optimization
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateMetrics = useCallback(() => {
    setMetrics(calculateMetrics(investment, months));
  }, [investment, months]);

  useEffect(() => {
    updateMetrics();
  }, [updateMetrics]);

  const dailyOpportunityCost = (metrics.opportunityCost / (months * 30));

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-white to-cream-50/50">
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
                    <PerformanceMetrics metrics={metrics} />
                  </div>
                </div>

                {/* Chart section with mobile responsiveness */}
                <div className="mt-8 sm:mt-12">
                  <PerformanceChart 
                    chartData={getChartData(investment, months)} 
                    isMobile={isMobile}
                  />
                </div>
              </div>

              {/* Opportunity Cost Card with mobile spacing */}
              <div className="mt-6 sm:mt-8 lg:mt-12">
                <OpportunityCostCard
                  dailyOpportunityCost={dailyOpportunityCost}
                  totalOpportunityCost={metrics.opportunityCost}
                  months={months}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InvestmentCalculator;