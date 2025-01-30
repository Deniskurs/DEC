// Common interfaces and types used across components
export interface MetricCard {
  label: string;
  value: string | number;
  description: string;
  icon?: React.ComponentType;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string | ((context: any) => string);
  tension?: number;
  fill?: boolean;
  borderDash?: number[];
}

export interface NewsletterFormData {
  email: string;
}

// Theme configuration types
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}