// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["react-icons/lu"],
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
