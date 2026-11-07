// Import Vite configuration helper
import { defineConfig } from "vite";

// Import the official React plugin
import react from "@vitejs/plugin-react";

// Enable React's automatic JSX transform
export default defineConfig({
  plugins: [react()],
});