import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "app": path.resolve(__dirname, "./src/app")
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true
  },
  server: {
    port: 5173,
    open: true
  }
})
