// Investment calculation utilities
export const calculateCompoundInterest = (
  principal: number,
  monthlyRate: number,
  months: number
): number => {
  return principal * Math.pow(1 + monthlyRate, months);
};

export const calculateTraditionalReturns = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  const monthlyRate = annualRate / 12;
  return principal * (1 + monthlyRate * months);
};

export const calculateOpportunityCost = (
  deltaEdgeReturns: number,
  traditionalReturns: number
): number => {
  return deltaEdgeReturns - traditionalReturns;
};