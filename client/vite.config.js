import { defineConfig } from "vite";
import {chunkSplitPlugin} from "vite-plugin-chunk-split";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 10000000,
  },
  plugins: [react(), chunkSplitPlugin()],
});
