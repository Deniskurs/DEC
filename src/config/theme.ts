// Theme configuration
export const theme = {
  colors: {
    richBlue: {
      50: '#E6F0FF',
      100: '#CCE0FF',
      200: '#99C2FF',
      300: '#66A3FF',
      400: '#3385FF',
      500: '#0066FF',
      600: '#0052CC',
      700: '#003D99',
      800: '#002966',
      900: '#001433',
    },
    cream: {
      50: '#fcf9f0',
      100: '#f7f3e3',
      200: '#f2ecd6',
      300: '#ede6c9',
      400: '#e8dfbc',
    },
  },
  fonts: {
    primary: "'Inter', sans-serif",
    secondary: "'SF Pro Display', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    default: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: '0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};

export const chartDefaults = {
  fontFamily: theme.fonts.primary,
  colors: {
    primary: theme.colors.richBlue[500],
    secondary: theme.colors.richBlue[600],
    tertiary: theme.colors.richBlue[700],
  },
};