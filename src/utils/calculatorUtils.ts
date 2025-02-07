// calculatorUtils.ts
import { CalculatorMetrics } from "../types/calculator";

export const calculateMetrics = (
  monthlyReturn: number,
  msciMonthlyReturn: number,
  investment: number,
  months: number
): CalculatorMetrics => {
  // Calculate strategy returns with monthly compounding
  let totalValue = investment;
  for (let i = 0; i < months; i++) {
    totalValue *= 1 + monthlyReturn / 100;
  }

  const totalReturn = totalValue - investment;
  const traditionalReturn = investment * ((msciMonthlyReturn / 100) * months);
  const opportunityCost = totalReturn - traditionalReturn;

  return {
    monthlyReturn,
    yearlyReturn: (Math.pow(1 + monthlyReturn / 100, 12) - 1) * 100,
    totalReturn,
    opportunityCost,
  };
};
