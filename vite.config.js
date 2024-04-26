import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    //host: "77.221.159.161",
    host: "localhost",
    //port: 443,
    port: 3000,
  },
});
