import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  // Transforme JSX sans import React explicite, comme le fait Next.js.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
    // Environnement jsdom pour les tests de composants frontend, node pour le backend.
    environmentMatchGlobs: [
      ["src/frontend/**/*.test.{ts,tsx}", "jsdom"],
      ["src/backend/**/*.test.{ts,tsx}", "node"],
    ],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/backend/**/*.ts", "src/shared/**/*.ts"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.d.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/frontend": path.resolve(__dirname, "./src/frontend"),
      "@/backend": path.resolve(__dirname, "./src/backend"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
