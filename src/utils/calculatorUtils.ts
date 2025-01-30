// calculatorUtils.ts
import { CalculatorMetrics } from '../types/calculator';
import { MONTHLY_GROWTH_RATE, TRADITIONAL_APY } from '../constants/calculatorConfig';

export const calculateMetrics = (investment: number, months: number): CalculatorMetrics => {
  // Calculate strategy returns with monthly compounding
  let totalValue = investment;
  for (let i = 0; i < months; i++) {
    totalValue *= (1 + MONTHLY_GROWTH_RATE);
  }

  const totalReturn = totalValue - investment;
  const traditionalReturn = investment * (TRADITIONAL_APY / 12) * months;
  const opportunityCost = totalReturn - traditionalReturn;

  return {
    monthlyReturn: MONTHLY_GROWTH_RATE * 100,
    yearlyReturn: (Math.pow(1 + MONTHLY_GROWTH_RATE, 12) - 1) * 100,
    totalReturn,
    opportunityCost,
  };
};