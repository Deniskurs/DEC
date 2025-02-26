// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Import imagemin without the optimizer to make deployment more stable
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    // Use more conservative image optimization settings
    imagemin({
      // Use more conservative settings
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.7, 0.9] }
    })
  ],
  optimizeDeps: {
    exclude: ["react-icons/lu"],
  },
  build: {
    // Basic settings for reliable builds
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    // Use esbuild minify instead of terser for better compatibility
    minify: 'esbuild',
    // Simpler chunk strategy for better compatibility
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom',
            'framer-motion',
            'chart.js'
          ]
        }
      }
    }
  },
  // Add base configuration for proper asset paths 
  base: '/',
  server: {
    proxy: {
      // Proxy any request starting with /api to your backend running on localhost:5001
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },
});
