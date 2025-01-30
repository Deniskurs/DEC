/// <reference types="vite/client" />
// Add this part - it tells TypeScript how to handle CSV imports
declare module '*.csv?raw' {
  const content: string;
  export default content;
}

interface Window {
  Trustpilot: any;
}