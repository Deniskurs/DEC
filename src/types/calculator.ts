export interface CalculatorMetrics {
  monthlyReturn: number;
  yearlyReturn: number;
  totalReturn: number;
  opportunityCost: number;
}

export interface RangeInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label: string;
  formatter: (value: number) => string;
}