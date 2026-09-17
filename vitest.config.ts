import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
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
