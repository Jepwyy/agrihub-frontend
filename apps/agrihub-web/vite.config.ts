import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "public"),
      "@components": path.resolve(__dirname, "src/components"),
      "@router": path.resolve(__dirname, "src/router"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@icons": path.resolve(__dirname, "src/icons"),
      "@providers": path.resolve(__dirname, "src/providers"),
      "@services/": path.resolve(__dirname, "src/services/services")
    }
  },
  envDir: "../../",
  plugins: [react()]
});
