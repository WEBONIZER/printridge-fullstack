import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    //host: "31.129.97.82",
    host: "localhost",
    //port: 443,
    port: 3000,
  },
});
