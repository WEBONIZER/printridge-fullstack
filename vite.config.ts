import { config } from "dotenv";
import { defineConfig } from "vite";

const options = {
  host: "0.0.0.0",
};

export default defineConfig({
  plugins: [(await import("@vitejs/plugin-react")).default()],
  define: {
    "process.env": config({ path: ".env" }).parsed!,
  },
  preview: options,
  server: {
    ...options,
    proxy: {
      "/sitemap.xml": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
