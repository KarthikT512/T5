import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    chunkSizeWarningLimit: 2000000, // Set to 2,000,000 KB (approximately 2GB)
    sourcemap: false, // Moved inside build object for consistency
  },
});
