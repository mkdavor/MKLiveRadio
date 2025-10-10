import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "public", // ✅ explicitly ensures Vercel serves /public as root
  server: {
    //https: true,
    host: true, // allow LAN access for testing
  },
});
