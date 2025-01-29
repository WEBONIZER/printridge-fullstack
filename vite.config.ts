import { config } from "dotenv";
import { defineConfig } from "vite";

const options = {
  host: "0.0.0.0",
};

export default defineConfig({
  plugins: [(await import("@vitejs/plugin-react")).default()],
  define: {
    "process.env": config({ path: ".local/.env" }).parsed!,
  },
  preview: options,
  server: options,
});
