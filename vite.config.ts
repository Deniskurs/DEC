// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 65 },
      pngquant: { quality: [0.65, 0.9] },
      webp: { quality: 75 }
    })
  ],
  optimizeDeps: {
    exclude: ["react-icons/lu"],
  },
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor_framer-motion';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) {
              return 'vendor_chart';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor_react';
            }
            return 'vendor'; // all other packages
          }
        }
      }
    }
  },
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
